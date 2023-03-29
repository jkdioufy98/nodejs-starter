import express, { Application, Request, Response} from "express";
import Database from "./config/database";
import cors from 'cors';


class App {

    public app: Application

    constructor() {
        this.app = express();
        this.databaseMongoDBSync();
        this.routes();
    }


    //Initialisation des Middlewares
    protected initialiseMiddlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }

    //Initialisation des controlleurs
    protected initialiseControllers(controllers: []){
        controllers.forEach((controller) => {
            this.app.use('/api')
        })
    }

    //Initialisation des erreurs
    protected initialiseErrors(){
        // this.app.use(ErrorMiddleware())
    }

    protected routes(): void {
        this.app.route('/').get((request: Request, response: Response) => {
            response.send("NodeJS Starter !")
        })
    }

    //Database synchronisation PostgreSQL
    protected databasePostgreSQLSync(): void {
        const database = new Database();
        database.sequelize?.sync()
    }

    //Database synchronisation MongoDB
    protected databaseMongoDBSync(): void {
        const database = new Database();
        database.connectToMongoDB()
    }
}

export default App