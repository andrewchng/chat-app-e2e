import express from 'express';
import path from 'path';
import cors from 'cors';

import userRoutes from './routes/user.routes'

const app = express();

// Use CORS middleware
app.use(cors({
  origin: '*', // You can specify origins here, or use '*' for all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true // If you need to send cookies with the request
}));

app.use(express.static(path.join(__dirname, "public")));

app.get("/hello", (req, res) => {
  res.send("Hello World");
});

app.use('/api/users', userRoutes)
export default app;