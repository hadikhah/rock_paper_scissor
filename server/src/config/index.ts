import express, { Express } from "express"
import morgan from "morgan"
import { existsSync, writeFileSync } from "fs";
import path from "path";

import connect from "./db"
import { LoggerStream } from "./winston"
import routeConfig from "./route"

const config = async (app: Express) => {

    // -------- connecting to DB --------
    const dbAddress = process.env.MONGO_URI || "http://localhost:27017/example_db"

    connect(dbAddress)

    // encode url and buffers
    app.use(express.urlencoded({ extended: false }))

    // accept json requests
    app.use(express.json())

    // initialize logging using morgan and winston fonfigs

    if (! await existsSync(path.join(__dirname, "../../logs/app.log")))
        await writeFileSync(path.join(__dirname, "../../logs/app.log"), "")

    app.use(morgan("combined", { stream: new LoggerStream() }))

    // routes configuration
    routeConfig(app)

}


export default config