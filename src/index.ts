import express from "express";

const app = express();
const PORT = 5000;

app.get("/", async (_req, res) => res.send("Hello"));

app.listen(PORT, () => console.log(`Server started on 127.0.0.1:${PORT}`));
