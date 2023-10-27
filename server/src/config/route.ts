import { Express } from "express"

import auth from "../routes/auth"

const routeConfig = (app: Express) => {

    app.use("/api/v1", auth)

}

export default routeConfig