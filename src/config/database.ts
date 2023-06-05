import mongoose from "mongoose";
import { Sequelize } from "sequelize";

class Database {
  
  //For SQL Database(PostgreSQL)
  public sequelize: Sequelize | undefined;

  private postgres_db = process.env.POSTGRES_DB as string;
  private postgres_host = process.env.POSTGRES_HOST as string;
  private postgres_port = process.env.POSTGRES_PORT as unknown as number;
  private postgres_user = process.env.POSTGRES_USER as string;
  private postgres_password = process.env.POSTGRES_PASSWORD as string;

  constructor() {}
  
  public async connectToPostgreSQL(){
    this.sequelize = new Sequelize({
      database: this.postgres_db,
      username: this.postgres_user,
      password: this.postgres_password,
      host: this.postgres_host,
      port: this.postgres_port,
      dialect: "postgres"
    });
    
    this.sequelize
      .authenticate()
      .then(() => {
        console.log(
          "Connection à la base de donnée PostgreSQL établie avec succes."
        );
      })
      .catch((error) => {
        console.error(
          "Une erreur est survenue lors de la connection à la base de donnée PostgreSQL : => " +
            error
        );
      });
  }

  public async connectToMongoDB(){

    const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_PATH, MONGODB_PORT, MONGODB_DBNAME } = process.env;

    // console.log(`mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_PATH}:${MONGODB_PORT}/${MONGODB_DBNAME}`);
    
    mongoose.connect(`mongodb://${MONGODB_PATH}:${MONGODB_PORT}/${MONGODB_DBNAME}`)
      .then(() => {
        console.log(
          "Connection à la base de donnée MongoDB établie avec succes."
        );
      })
      .catch((error) => {
        console.error(
          "Une erreur est survenue lors de la connection à la base de donnée MongoDB : => " +
            error
        );
      });
  }
}

export default Database;