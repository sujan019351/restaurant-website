# Fullstack React + Express Authentication App

## Database Configuration

The MongoDB database connection is located in [`server/config/db.js`](file:///Users/sujankhadka/Downloads/react%20lab/server/config/db.js).
You can configure the database name in [`server/.env`](file:///Users/sujankhadka/Downloads/react%20lab/server/.env):

```env
MONGO_URI=mongodb://127.0.0.1:27017
DB_NAME=auth_db
PORT=5001
JWT_SECRET=your_secret_key
```

Whenever you want to use a separate database, simply change `DB_NAME` to your preferred database name (e.g. `DB_NAME=my_custom_db`). MongoDB will automatically create and use that separate database.

---

## How to Run

### 1. Start MongoDB
Ensure MongoDB is running locally:
```bash
brew services start mongodb-community
# or run directly:
mongod --dbpath /path/to/data
```

### 2. Start Backend Server
Open a terminal and navigate to `server`:
```bash
cd server
npm run dev
# or: npm start
```
The server will start on `http://localhost:5001` and connect to the database specified by `DB_NAME`.

*Note: Port 5001 is used because on macOS, port 5000 is occupied by AirPlay Receiver (ControlCenter).*

### 3. Start Frontend App
Open a second terminal and navigate to `suraj-app`:
```bash
cd suraj-app
npm run dev
```
The app will run at `http://localhost:5173`.
