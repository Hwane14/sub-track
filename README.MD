# User Guide - Sub-Track

## What the Software Does
Sub-Track helps users manage their paid subscriptions by allowing them to add, view, edit, and delete subscriptions, track upcoming renewal dates, and see their monthly spending. The system also automatically updates renewal dates so users don't need to manually maintain them.

## Who the Software is For
Sub-Track is designed for anyone who wants a simple way to keep track of recurring subscription payments and understand their monthly financial commitments.

## Core Features Implemented
- User registration and login
- Add a new subscription
- View all subscriptions in a dashboard
- Filter subscriptions by category
- Edit an existing subscription
- Delete a subscription
- View upcoming renewal notifications (7-day reminders)
- Automatic renewal-date updating via a daily cron job
- Monthly expenditure summary (overall or filtered by category)
- Logout

## Setup and Run Instructions
1. Clone the Repository
```bash
git clone https://github.com/Hwane14/sub-track.git
```
Then navigate into the project folder:
```bash
cd sub-track
```

2. Install Dependencies
Install dependencies in both the backend and frontend:
Backend:
```bash
cd server
npm install
```
Frontend:
```bash
cd ../frontend
npm install
```

3. Setup the Database
Open MySQL and run:
```sql
SOURCE create_db.sql;
```
This creates the database along with the tables.

4. Create Your `.env` File 
Copy the `.env.example` file
Rename it to .env
Fill in the values as instructed inside the file (these must match the credentials used in `create_db.sql`).

5. Start the Backend and Frontend
Open two terminals:
**Terminal 1 - Backend**
```bash
cd server
node index.js
```
**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
```

6. Access the Application
Open you browser and go to:
http://localhost:5173

## How to Use the Software
1. Open the application in your browser (using link above)
2. Register a new account or login with your existing details.
3. Navigate to **Add Subscription** to create a new subscription.
4. Enter:
    - Name
    - Cost
    - Renewal date 
    - Category
    - Status
5. Save the subscription.
6. View all subscriptions on the Dashboard.
7. Filter by category if needed.
8. Edit any subscription by pressing on it on the Dashboard, changing the required details, and pressing **Save Changes**.
9. Delete a subscription by pressing on it on the Dashboard, and then press the delete button.
10. Check the Notifications page (by pressing the bell) to see which subscriptions renew in the next 7 days.
11. Logout when finished.

## Sample Subscription Input
You can test the system using any subscription details. For example:
Name: Netflix
Cost (£): 9.99
Renewal Date: 01/05/2026
Category: Entertainment
Status: Essential

## Dependencies and Install Steps
This project uses:

**Backend**
- Node.js
- Express
- MySQL2
- express-session
- cors
- dotenv
- node-cron

**Frontend**
- React
- Vite
- Axios

These are automatically installed when running `npm install`.

## Known Limitations / What is not Implemented yet
- Renewal reminders appear only inside the app (not via email or push notifications).
- All subscriptions are treated as monthly so billing cycles other than this are not supported.
- Categories are fixed so users cannot create custom categories (to reduce complexity and improve usability).
- The cron job updates renewal dates but is not used to generate in app notifications as stated in the project build document.
- There is no password reset functionality so users must remember their login details.