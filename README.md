# Health Tracking

This repository is now prepared as a small monorepo with separate frontend and backend apps.

## Structure

```text
health-tracking/
|- frontend/   # Existing React + Vite application
|- backend/    # Node.js + Express + MongoDB skeleton
```

## Frontend

The existing React application was moved into `frontend/`.

Run it with:

```bash
npm run dev:frontend
```

or:

```bash
cd frontend
npm run dev
```

## Backend

The backend is only prepared as a starting structure for future development.

Included:

- Express app setup
- MongoDB connection helper with Mongoose
- Base API route
- `.env.example` for local configuration

Run it with:

```bash
npm run dev:backend
```

or:

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## Notes

- Backend dependencies have not been installed yet.
- The frontend remains functionally the same as before, only moved into `frontend/`.
