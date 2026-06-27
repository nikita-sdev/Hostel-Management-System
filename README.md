# Event Accommodation Management Portal

A full-stack web application designed to simplify hostel accommodation management for college events, hackathons, workshops, and conferences.

The platform allows students to submit accommodation requests while administrators can review requests, manage hostel rooms, and allocate rooms efficiently.

## Features

### Student Features

- User authentication and authorization
- Submit accommodation requests
- View request status
- Track assigned room details
- View hostel/warden information after approval
- Cancel submitted requests
- Receive email notifications for request updates


### Admin Features

- Admin dashboard with request statistics
- View and manage student requests
- Approve or reject accommodation requests
- Add and manage hostel rooms
- Manual room assignment
- Automatic room allocation based on:
  - Room availability
  - Capacity
  - Student gender
- View room occupancy details


## Tech Stack

### Frontend

- React.js
- Tailwind CSS
- Framer Motion
- React Router
- React Hot Toast


### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Nodemailer


## Project Workflow

1. Student creates an account and logs in.
2. Student submits an accommodation request.
3. Admin reviews the request.
4. Admin approves or rejects the request.
5. Approved students are assigned rooms manually or automatically.
6. Student can view room and warden details.
7. Email notification is sent for request updates.




## Environment Variables

Create a `.env` file in the backend folder.
PORT=your_port

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

EMAIL=your_email

EMAIL_PASS=your_email_app_password