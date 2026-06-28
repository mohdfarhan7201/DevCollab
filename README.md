Step 0: Required Software

Check karo ki ye sab installed hai:

Node.js (LTS)
Git
VS Code
MongoDB Compass (abhi install kar lo, database baad me use karenge)
Postman ya Bruno (API testing ke liye)

Terminal me ye commands chalao:

node -v
npm -v
git --version

Agar versions aa rahe hain to sab sahi hai.

Step 1: Create Project Folder
mkdir devcollab
cd devcollab

Ab Git initialize karo:

git init
Step 2: Folder Structure

Abhi sirf ye structure banao:

devcollab/

│
├── client/
│
├── server/
│
├── docs/
│
├── .gitignore
│
└── README.md
🤔 Why separate client and server?

Industry me frontend aur backend alag hote hain.

Iske benefits:

Independent deployment
Better scalability
Clean architecture
Easier teamwork

Agar 5 frontend developers aur 5 backend developers hain, to dono independently kaam kar sakte hain.

Step 3: React Setup

Terminal:

cd client

npm create vite@latest .

Select:

React

JavaScript

Phir:

npm install

Ab React run karo:

npm run dev

Browser me Vite ka default page dikhna chahiye.

Step 4: Backend Setup

New terminal kholo.

cd server

npm init -y

Install dependencies:

npm install express cors dotenv

Development dependency:

npm install -D nodemon
Step 5: Backend Folder Structure

Ab server ke andar ye folders banao:

server/

src/

controllers/

routes/

models/

middlewares/

config/

utils/

app.js

server.js

.env

package.json

Ye structure future me bahut useful hoga.

Folder ka purpose:
controllers/

Business Logic

routes/

API Routes

models/

MongoDB Schemas

middlewares/

JWT, Auth, Error Handling

config/

Database Config

utils/

Helper Functions

Step 6: Create app.js

server/src/app.js

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "DevCollab API Running"
    });
});

module.exports = app;
Step 7: Create server.js

server/src/server.js

require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
Step 8: Create .env
PORT=5000
Step 9: Update package.json
"scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
}

Run:

npm run dev

Browser me open karo:

http://localhost:5000

Expected output:

{
  "success": true,
  "message": "DevCollab API Running"
}
Step 10: First Git Commit

.gitignore me ye add karo:

node_modules
.env
dist

Ab:

git add .

git commit -m "Initial project setup"
🧠 Concept of the Day: Why app.js and server.js are separate?

Ye interview me bahut poocha jata hai.

Agar hum sab kuch server.js me likh den, to project bada hote hi file 1000+ lines ki ho sakti hai.

Isliye responsibilities alag karte hain:

app.js → Express app banata hai, middleware aur routes register karta hai.
server.js → Server start karta hai aur environment configuration load karta hai.

Is separation ke fayde:

Better maintainability
Easier testing (app ko bina server start kiye test kar sakte ho)
Clean architecture
Industry standard