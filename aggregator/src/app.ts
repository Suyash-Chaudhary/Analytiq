import express from "express";

const app = express();

app.get("/api/v1/aggregator", (req, res) => {
  res.send({
    success: true,
  });
});

export default app;
