# ChatApp

Welcome to ChatApp! This is a messaging application similar to WhatsApp, designed to provide secure and seamless communication between users. The goal of this project is to build an end-to-end chatting app with features like real-time messaging, user authentication, and more.

## Technologies Used

### Frontend
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Redux](https://redux.js.org/) - State management
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library

### Backend
- [Node.js](https://nodejs.org/) - JavaScript runtime for server-side applications
- [Express](https://expressjs.com/) - Web framework for Node.js
- [Socket.io](https://socket.io/) - Real-time bidirectional event-based communication
- [Prisma](https://www.prisma.io/) - ORM for database management
- [MongoDB](https://www.mongodb.com/) - NoSQL database

## Getting Started

To run ChatApp locally, follow these steps:

### Frontend Setup
```sh
cd ChatApp-Front
npm install
npm run dev
```
This will start the frontend development server.

### Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd ChatApp-Server
   ```
2. Create a `.env` file and configure the following environment variables:
   ```sh
   PORT=8080
   DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.pdmf2.mongodb.net"
   ```
3. Generate Prisma client:
   ```sh
   npx prisma generate
   ```
4. Install dependencies and start the backend server:
   ```sh
   npm install
   npm run dev
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---


