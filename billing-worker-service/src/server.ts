import express from "express";
import { join, dirname } from "path";
import amqp from 'amqplib';
import initDb from './Db';
import logger from "./utils/logger";

// Routes
import indexRoutes from "./routes";
import { StartProcess } from "./controllers/Worker";

export var channel, connection;

amqpConnection()
async function amqpConnection(){
  try {
    const amqpServer = "amqp://rabbitmq1:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("deposit");

    // channel.consume("deposit", data=>{
    //   console.log(JSON.parse(data.content.toString()), ' -- the data')
    //   channel.ack(data)
    // })
    StartProcess()
} catch (ex) {
    console.error(ex);
}
}

// Initialize express
const app = express();

// settings
app.set("port", process.env.PORT || 3003);

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
    logger.info(`Server started listening on port ${PORT}`);
  } catch (e) {
    logger.error(`Error starting server ${e}`);
  }
});
console.log("Server on port", PORT);