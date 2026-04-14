# Smart DOM Recovery Tool

Tool for recovering broken CSS selectors after DOM changes.

## Idea
Given:
- old HTML
- new HTML
- old CSS selector

The tool tries to find the corresponding element in the new DOM.

## Planned features
- selector recovery
- DOM similarity scoring
- candidate ranking
- frontend visualization

## Tech stack
- Frontend: React + TypeScript
- Backend: FastAPI + Python

## Run Locally

### Requirements
- Node.js 20.18+
- Python 3.14

### Backend
From the project root:

```powershell
backend\.venv\Scripts\python.exe -m pip install -r backend\requirements.txt
backend\.venv\Scripts\python.exe -m uvicorn backend.app.main:app --reload
```

Backend will be available at `http://127.0.0.1:8000`.
API docs will be available at `http://127.0.0.1:8000/docs`.

### Frontend
From the `frontend` directory:

```powershell
npm install
npm run dev
```

Frontend will be available at the local Vite URL shown in the terminal, usually `http://localhost:5173`.
