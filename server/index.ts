import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv"

dotenv.config()

const app: Express = express();

app.use(express.json())

const httpServer = createServer(app)

const ioOptions = {}

const io = new Server(httpServer, ioOptions)

app.get("/", (req: Request, res: Response) => {

    res.json({ search: `${req.query?.search}` })

})

io.on("connection", (Socket) => {

    console.log(Socket.id)

})

httpServer.listen(3000, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${3000}`);
});

console.log("yay its working ")