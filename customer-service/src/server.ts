import express from "express";
import { join, dirname } from "path";
import amqp from 'amqplib'
import initDb from './Db';
import logger from "./utils/logger";

// Routes
import indexRoutes from "./routes";
import { createTestUser } from "./models/User";

// Initialize express
const app = express();

// settings
app.set("port", process.env.PORT || 3001);

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10mb' }));

// routes
app.use(indexRoutes);


// listening the Server
let PORT = app.get("port")

app.listen(PORT, async () => {
  try {
    // initialize db
    await initDb();
    createTestUser();
    logger.info(`Server started listening on port ${PORT}`);
  } catch (e) {
    logger.error(`Error starting server ${e}`);
  }
});
console.log("Server on port", PORT);
