import { Express } from "express"

import auth from "../routes/auth"
import profile, { profilePrefix } from "../routes/profile"

/**
 * adds route files and route file configurations
 *
 * @param {Express} app
 */
const routeConfig = (app: Express) => {

    const appV1RoutePrefix: string = "/api/v1"

    app.use(appV1RoutePrefix, auth)

    app.use(`${appV1RoutePrefix}/${profilePrefix}`, profile)

}

export default routeConfig