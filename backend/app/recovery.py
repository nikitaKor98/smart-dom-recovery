from bs4 import BeautifulSoup
from app.schemas import RecoveryRequest, RecoveryResponse


def recover_element(request: RecoveryRequest) -> RecoveryResponse:
    old_soup = BeautifulSoup(request.old_html, "lxml")
    new_soup = BeautifulSoup(request.new_html, "lxml")

    old_element = old_soup.select_one(request.selector)

    if old_element is None:
        return RecoveryResponse(
            found=False,
            reason="Old element not found by selector in old HTML."
        )

    candidate = new_soup.find(old_element.name)

    if candidate is None:
        return RecoveryResponse(
            found=False,
            reason="No candidate with matching tag found in new HTML."
        )

    return RecoveryResponse(
        found=True,
        matched_tag=candidate.name,
        matched_text=candidate.get_text(strip=True) or None,
        score=0.3,
        reason="Temporary MVP match by tag name only."
    )