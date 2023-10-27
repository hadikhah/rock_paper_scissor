import mongoose from 'mongoose'
import logger from './winston';
// import process from 'process'

/**
 * connecting to mongodb database using mongoose odm
 */
const connect = async (mongodb_address: string) => {

    try {
        // try to connect to db
        const conn = await mongoose.connect(mongodb_address)

        console.log(`------- mongo connected to: ${conn.connection.host} ---------`)

    } catch (err) {

        console.log(err);

        logger.error(err)

        process.exit(1)

    }
}

export default connect