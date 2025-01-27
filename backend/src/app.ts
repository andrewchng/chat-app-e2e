import express from 'express';
import path from 'path'
import userRoutes from './routes/user.routes'

const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.get("/hello", (req, res) => {
  res.send("Hello World");
});

app.use('/api/users', userRoutes)
export default app;