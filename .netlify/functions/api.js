import serverless from "serverless-http"
import app from "../../backend"

export const handler = serverless(app)
