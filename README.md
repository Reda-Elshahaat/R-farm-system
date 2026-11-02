Rabbit Farm Management System

A full-stack web application designed to help rabbit farm owners manage rabbit records, monitor breeding activities, and track important farm data.

Tech Stack

Frontend

- Next.js
- React
- JavaScript
- Tailwind CSS

Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- RESTful APIs

Features

- Rabbit Management: Add and view rabbit records, including code, gender, breed, birth date, and status.
- Rabbit Profiles: View individual rabbit details, including parents and offspring.
- Breeding Management: Record and track mating activities.
- Kindling Records: Track birth records, including total kits born, alive kits, and dead kits.
- Weight History: Record and monitor rabbit weight changes over time.
- Breeding Status: Track breeding readiness and activity.

Project Structure

R-farm-system/
│
├── farm-client/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── farm-server/
│   ├── src/
│   └── package.json
│
├── .gitignore
└── README.md

Getting Started

Prerequisites

- Node.js
- npm
- MongoDB database

1. Clone the Repository

git clone https://github.com/Reda-Elshahaat/R-farm-system.git
cd R-farm-system

2. Setup the Backend

cd farm-server
npm install

Create a ".env" file inside the "farm-server" directory:

PORT=your_port
MONGO_URI=your_mongodb_connection_string

Start the backend development server:

npm run dev

3. Setup the Frontend

Open another terminal in the project root directory:

cd farm-client
npm install

Create a ".env.local" file inside the "farm-client" directory:

NEXT_PUBLIC_API_URL=your_backend_url

Start the frontend development server:

npm run dev

Open your browser at:

http://localhost:3000

Environment Variables

Variable| Description
"PORT"| Backend server port
"MONGO_URI"| MongoDB connection string
"NEXT_PUBLIC_API_URL"| Backend API base URL used by the frontend

Author

Reda Elshahaat

- GitHub: "Reda-Elshahaat" (https://github.com/Reda-Elshahaat)
- LinkedIn: "Reda Elshahaat" (https://www.linkedin.com/in/reda-elshahat)