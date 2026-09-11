# Lumen Roofing — Frontend / Backend Separated

The supplied Lumen Roofing HTML design has been preserved. Only the code structure was separated and the contact/inspection form was connected to a real backend endpoint.

## Frontend
- `frontend/index.html` — page markup and existing content
- `frontend/css/style.css` — original inline CSS extracted
- `frontend/js/tailwind-config.js` — original Tailwind configuration extracted
- `frontend/js/main.js` — original page JavaScript extracted + API form handling
- `frontend/assets/lumen-logo.jpg` — logo cropped from the supplied Lumen reference image

## Backend
- `backend/server.js` — Express server and `/api/inspection` endpoint
- `backend/package.json` — Node dependencies/scripts
- `backend/data/leads.json` — local lead storage for development

## Run locally
1. Install Node.js 18+
2. `cd backend`
3. `npm install`
4. `npm start`
5. Open `http://localhost:3001`

The backend serves the separated frontend, so navigation, phone links, Instagram, FAQ, Privacy Policy, Terms of Service and other existing links continue to work.

## Form
The inspection form POSTs to `/api/inspection`. The backend validates the required fields and stores each lead in `backend/data/leads.json`. For production, replace local JSON storage with a database/CRM and connect email/SMS notifications.
