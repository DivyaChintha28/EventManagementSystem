Event Management System (MERN) - Generated scaffold
-----------------------------------------------
Structure:
  /backend - Express + MongoDB API
  /frontend - React (Vite) SPA

Quick start (local):
1. Install MongoDB locally or use a cloud MongoDB URI.
2. Backend:
   cd backend
   npm install
   copy .env.example to .env and set MONGO_URI and JWT_SECRET
   npm run dev
3. (optional) Seed sample events:
   node seed.js
4. Frontend:
   cd frontend
   npm install
   npm run start
5. Open http://localhost:5173 (vite) and backend should run on http://localhost:5000

Notes:
- Admin users can be created by selecting 'Admin' role on signup.
- Add Event button is available to admins on the Home page.
- The Add Event form uses poster URL; file upload can be added later.
- This scaffold is minimal and intended for demonstration and further extension.
