import express from "express";
import { join, dirname } from "path";
import amqp from 'amqplib';
import initDb from './Db';
import logger from "./utils/logger";

// Routes
import indexRoutes from "./routes";

export var channel, connection;

amqpConnection()
async function amqpConnection(){
  try {
    const amqpServer = "amqp://rabbitmq1:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("onramp");

    // channel.consume("onramp", data=>{
    //   const thedata = Buffer.from(data.content)
    //   console.log(JSON.parse(data.content.toString()), ' -- the data')
    //   console.log(`${Buffer.from(data.content)} data here`)
    //   channel.ack(data)
    // })
} catch (ex) {
    console.error(ex);
}
}

// Initialize express
const app = express();

// settings
app.set("port", process.env.PORT || 3002);

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