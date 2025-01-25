import express from 'express';
import path from 'path'

const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.get("/hello", (req, res) => {
  res.send("Hello World");
});

export default app;