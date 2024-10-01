import express from "express";

const app = express();

app.get("/api/v1/visitor-wss", (req, res) => {
  res.send({
    success: true,
  });
});

export default app;
