import cors from "cors";
import express from "express";
import { pool } from "./config/db.js";
import classesRouter from "./routes/classesRoutes.js";
import usersRouter from "./routes/usersRoutes.js";
import instructorRouter from "./routes/instructorRoutes.js";
import locationRouter from "./routes/locationRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

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

app.use(errorHandler);

try {
  await pool.getConnection();
  console.log("Ansluten till MySQL");
  const server = app.listen(PORT, () => {
    console.log(`Servern körs på http://localhost:${PORT}`);
  });

  //graceful shutdown
  process.on("SIGINT", async () => {
    console.log("\nStänger ner servern gracefully...");

    try {
      await pool.end();
      server.close(() => {
        console.log("Server och databas stängdes ner korrekt.");
        process.exit(0);
      });
    } catch (err) {
      console.error("Fel vid shutdown: ", err);
      process.exit(1);
    }
  });
} catch (err) {
  console.error("Kunde inte ansluta till MySQL: ", (err as Error).message);
  process.exit(1);
}
