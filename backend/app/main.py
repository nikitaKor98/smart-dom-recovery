from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .schemas import RecoveryRequest, RecoveryResponse
from .recovery import recover_element

app = FastAPI(title="Smart DOM Recovery Tool")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
