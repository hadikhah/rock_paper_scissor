import { Express } from "express"

import auth from "../routes/auth"
import profile, { profilePrefix } from "../routes/profile"

const routeConfig = (app: Express) => {

    const appV1RoutePrifix: string = "/api/v1"

    app.use(appV1RoutePrifix, auth)

    app.use(`${appV1RoutePrifix}/${profilePrefix}`, profile)

}

export default routeConfig