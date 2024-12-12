import Express from "express";
import cors from "cors";

const app = Express();

// Configure CORS
app.use(cors());
app.use(Express.json());

// Simple in-memory storage
const messages: { message: string, createdAt: string }[] = [];

app.get("/api/hello", (req, res) => {
  const newMessage = {
    message: "Hello from Express!",
    createdAt: new Date().toISOString()
  };
  messages.push(newMessage);
  res.json(newMessage);
});

app.get("/api/messages", (req, res) => {
  res.json(messages);
});

app.get("/api/date", (req, res) => {
  res.json({ message: new Date().toISOString() });
});

// Error handling middleware
app.use((err: Error, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});