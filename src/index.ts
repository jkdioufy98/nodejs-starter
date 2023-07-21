import dotenv from "dotenv"
import App from "./app"
import UserController from "./endpoints/user/user.controller"
import RoleController from "./endpoints/role/role.controller"

dotenv.config({})

const app = new App([
     new UserController(),
     new RoleController()
]).app

const port = process.env.SERVER_PORT || 8181

app.listen(port,() => {
     console.log(`Server started successfully on port ${port}...`);
})