import cors from "cors";
import express from "express";
import { pool } from "./config/db.js";
import classesRouter from "./routes/classesRoutes.js";
import usersRouter from "./routes/usersRoutes.js";
import instructorRouter from "./routes/instructorRoutes.js";
import locationRouter from "./routes/locationRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

console.log("NYYYYYY");
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors({ origin: "http://localhost:3001" }));
app.use(express.json());

app.use("/api/classes", classesRouter);

app.use("/api/users", usersRouter);

app.use("/api/instructors", instructorRouter);

app.use("/api/location", locationRouter);

app.use("/api/booking", bookingRouter);

app.get("/test", (req, res) => {
  res.json({ ok: true });
});

app.use((req, res) => {
  res.status(404).json({ error: "Sidan hittades inte." });
});

try {
  await pool.getConnection();
  console.log("Ansluten till MySQL");
  app.listen(PORT, () => {
    console.log(`Servern körs på http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("Kunde inte ansluta till MySQL: ", (err as Error).message);
  process.exit(1);
}
