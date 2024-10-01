import express from "express";

const app = express();

app.get("/api/v1/dashboard-wss", (req, res) => {
  res.send({
    success: true,
  });
});

export default app;
