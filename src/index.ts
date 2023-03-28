import express, { Application, Request, Response} from "express";
import dotenv from "dotenv"
import Database from "./config/database";
dotenv.config({})

class App {

    public app: Application

    constructor() {
        this.app = express();
        this.databaseSync();
        this.routes();
    }

    protected routes(): void {
        this.app.route('/').get((request: Request, response: Response) => {
            response.send("NodeJS Starter !")
        })
    }

    //Database synchronisation
    protected databaseSync(): void {
        const database = new Database();
        database.sequelize?.sync()
    }
}

const app = new App().app

const port = process.env.SERVER_PORT || 8181

app.listen(port,() => {
     console.log(`Server started successfully on port ${port}...`);
})