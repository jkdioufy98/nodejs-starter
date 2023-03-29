import dotenv from "dotenv"
import App from "./app"

dotenv.config({})

const app = new App().app

const port = process.env.SERVER_PORT || 8181

app.listen(port,() => {
     console.log(`Server started successfully on port ${port}...`);
})