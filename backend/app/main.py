from fastapi import FastAPI
from .schemas import RecoveryRequest, RecoveryResponse
from .recovery import recover_element

app = FastAPI(title="Smart DOM Recovery Tool")


@app.get("/")
def root() -> dict[str, object]:
    return {
        "message": "API is running",
        "routes": {
            "health": "/health",
            "recover": "/recover",
            "docs": "/docs",
        },
    }


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/recover", response_model=RecoveryResponse)
def recover(request: RecoveryRequest) -> RecoveryResponse:
    return recover_element(request)
