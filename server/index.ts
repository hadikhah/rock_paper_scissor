import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv"
import config from "./src/config";

dotenv.config()

const app: Express = express();

config(app)




// const ioOptions = {}

// const io: Server = new Server(httpServer, ioOptions)

const httpServer = createServer(app)

httpServer.listen(process.env.PORT || 5000, () => {

    console.log(`\n ⚡️[server]: Server is running at http://localhost:${process.env.PORT || 5000} \n`);

});

// console.log("yay its working ")
// app.get("/", (req: Request, res: Response) => {

//     res.json({ search: `${req.query?.search}` })

// })

// io.on("connection", (Socket) => {

//     console.log(Socket.id)

//     Socket.emit("send", "Hi you connected to socket.io")

//     Socket.on("message", (message: String) => {
//         console.log(message)

//         Socket.emit("send", ` you sent the message : ${message}`)
//     })

// })