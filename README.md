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