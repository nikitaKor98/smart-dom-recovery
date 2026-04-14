from __future__ import annotations

from bs4 import BeautifulSoup, Tag
from .schemas import RecoveryRequest, RecoveryResponse


def _normalize_text(text: str | None) -> str:
    if not text:
        return ""
    return " ".join(text.split()).strip().lower()


def _get_classes(element: Tag) -> set[str]:
    classes = element.get("class", [])
    if isinstance(classes, list):
        return {cls.strip().lower() for cls in classes if cls.strip()}
    return set()


def _get_attributes(element: Tag) -> dict[str, str]:
    attrs: dict[str, str] = {}

    for key, value in element.attrs.items():
        if key == "class":
            continue
        if isinstance(value, list):
            attrs[key] = " ".join(str(v) for v in value).strip().lower()
        else:
            attrs[key] = str(value).strip().lower()

    return attrs


def _jaccard_similarity(left: set[str], right: set[str]) -> float:
    if not left and not right:
        return 0.0

    union = left | right
    if not union:
        return 0.0

    intersection = left & right
    return len(intersection) / len(union)


def _attribute_similarity(old_attrs: dict[str, str], new_attrs: dict[str, str]) -> float:
    if not old_attrs or not new_attrs:
        return 0.0

    matched = 0
    total = len(old_attrs)

    for key, value in old_attrs.items():
        if new_attrs.get(key) == value:
            matched += 1

    return matched / total if total else 0.0


def _text_similarity(old_text: str, new_text: str) -> float:
    if not old_text or not new_text:
        return 0.0

    if old_text == new_text:
        return 1.0

    if old_text in new_text or new_text in old_text:
        return 0.6

    old_words = set(old_text.split())
    new_words = set(new_text.split())

    return _jaccard_similarity(old_words, new_words)


def _score_candidate(old_element: Tag, candidate: Tag) -> tuple[float, str]:
    score = 0.0
    reasons: list[str] = []

    old_tag = old_element.name
    candidate_tag = candidate.name

    if old_tag == candidate_tag:
        score += 0.3
        reasons.append("tag matched")

    old_text = _normalize_text(old_element.get_text(" ", strip=True))
    candidate_text = _normalize_text(candidate.get_text(" ", strip=True))
    text_score = _text_similarity(old_text, candidate_text)
    if text_score > 0:
        weighted_text_score = text_score * 0.4
        score += weighted_text_score
        reasons.append(f"text similarity={text_score:.2f}")

    old_classes = _get_classes(old_element)
    candidate_classes = _get_classes(candidate)
    class_score = _jaccard_similarity(old_classes, candidate_classes)
    if class_score > 0:
        weighted_class_score = class_score * 0.2
        score += weighted_class_score
        reasons.append(f"class similarity={class_score:.2f}")

    old_attrs = _get_attributes(old_element)
    candidate_attrs = _get_attributes(candidate)
    attr_score = _attribute_similarity(old_attrs, candidate_attrs)
    if attr_score > 0:
        weighted_attr_score = attr_score * 0.1
        score += weighted_attr_score
        reasons.append(f"attribute similarity={attr_score:.2f}")

    reason = ", ".join(reasons) if reasons else "no strong similarity signals"
    return score, reason


def recover_element(request: RecoveryRequest) -> RecoveryResponse:
    old_soup = BeautifulSoup(request.old_html, "lxml")
    new_soup = BeautifulSoup(request.new_html, "lxml")

    old_element = old_soup.select_one(request.selector)

    if old_element is None:
        return RecoveryResponse(
            found=False,
            reason="Old element not found by selector in old HTML."
        )

    candidates = new_soup.find_all(True)

    if not candidates:
        return RecoveryResponse(
            found=False,
            reason="No elements found in new HTML."
        )

    best_candidate: Tag | None = None
    best_score = -1.0
    best_reason = "No candidate scored."

    for candidate in candidates:
        score, reason = _score_candidate(old_element, candidate)
        if score > best_score:
            best_score = score
            best_candidate = candidate
            best_reason = reason

    if best_candidate is None or best_score <= 0:
        return RecoveryResponse(
            found=False,
            reason="No suitable candidate found in new HTML."
        )

    return RecoveryResponse(
        found=True,
        matched_tag=best_candidate.name,
        matched_text=best_candidate.get_text(" ", strip=True) or None,
        score=round(best_score, 3),
        reason=best_reason
    )
