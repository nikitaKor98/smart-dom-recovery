from pydantic import BaseModel


class RecoveryRequest(BaseModel):
    old_html: str
    new_html: str
    selector: str


class RecoveryResponse(BaseModel):
    found: bool
    matched_tag: str | None = None
    matched_text: str | None = None
    score: float | None = None
    reason: str | None = None