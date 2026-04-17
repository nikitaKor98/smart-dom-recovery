from pydantic import BaseModel

class Candidate(BaseModel):
    tag: str
    text: str | None = None
    score: float
    reason: str

class RecoveryRequest(BaseModel):
    old_html: str
    new_html: str
    selector: str
    
class RecoveryResponse(BaseModel):
    found: bool
    matched_tag: str | None = None
    matched_text: str | None = None
    matched_html: str | None = None
    score: float | None = None
    reason: str | None = None
    candidates: list[Candidate] = []