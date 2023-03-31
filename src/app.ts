import express, { Application} from "express";
import Database from "./config/database";
import cors from 'cors';
import Controller from "./utils/interfaces/controller.interface";
import ErrorMiddleware from "./middlewares/error.middleware";


class App {

    public app: Application

    constructor(controllers: Controller[]) {
        //Initialisation de l'application express
        this.app = express();

        this.databaseMongoDBSync();
        this.initialiseMiddlewares();
        this.initialiseErrorHandling();
        this.initialiseControllers(controllers);
    }


    //Initialisation des Middlewares
    protected initialiseMiddlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}))
    }

    //Initialisation des controlleurs
    protected initialiseControllers(controllers: Controller[]){
        controllers.forEach((controller: Controller) => {
            this.app.use('/nodejs-starter-v1', controller.router)
        })
    }

    //Initialisation des erreurs
    protected initialiseErrorHandling(){
        this.app.use(ErrorMiddleware)
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