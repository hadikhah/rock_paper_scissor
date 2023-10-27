import winston from "winston";
import path from "path";

/** 
 * logging options
 * 
 * @type {*} */
const options = {

    File: { //save logs in log file
        filename: path.join(__dirname, "../../logs/app.log"),
        handleExceptions: true,
        format: winston.format.json(),
        maxsize: 5 * 1024 * 1024,
        maxFile: 5
    },

    console: { //show loggs in con
        level: "debug",
        handleExceptions: true,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }
}

/** 
 * create winston logging instance
 * @type {*} */
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(options.console),
        new winston.transports.File(options.File)
    ]
})

export class LoggerStream {

    write(message: string) {

        logger.info(message)

    }

}


export default logger