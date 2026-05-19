# Smart DOM Recovery Tool

Tool for recovering broken CSS selectors after DOM changes.

## 🚀 Live Demo

Frontend:
https://smart-dom-recovery.vercel.app/

Backend API:
https://smart-dom-recovery-api.onrender.com/docs

## 💡 Idea

Given:

- old HTML
- new HTML
- old CSS selector

The tool tries to find the corresponding element in the new DOM.

## ❗ Problem

E2E tests and scrapers often break when the DOM structure changes:

- class names change
- elements are wrapped differently
- attributes are modified

As a result, selectors become invalid.

## 👍 Solution

This tool finds the most similar element in the updated DOM using a scoring-based approach.

Instead of exact matching, it compares elements by:

- tag name
- text content
- class similarity
- attribute similarity

And returns:

- best match
- top candidates
- explanation of the match

## ⚙️ Features

- DOM parsing using BeautifulSoup
- Similarity scoring engine
- Candidate ranking system
- Explainable matching (reason field)
- Interactive UI (React)
- Demo examples (one-click testing)
- Highlighted matched element

## 🧠 How it works

1. Parse old and new HTML
2. Locate original element using selector
3. Iterate over all elements in new DOM
4. Compute similarity score for each candidate
5. Rank candidates
6. Return best match + top candidates

## Tech stack

Frontend:

- React
- TypeScript
- Vite

Backend:

- Python
- FastAPI
- BeautifulSoup (lxml)

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
