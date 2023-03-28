import { Sequelize } from "sequelize";
import { Profil } from "../entities/Profil";
import { User } from "../entities/User";

class Database {
  
  public sequelize: Sequelize | undefined;

  private postgres_db = process.env.POSTGRES_DB as string;
  private postgres_host = process.env.POSTGRES_HOST as string;
  private postgres_port = process.env.POSTGRES_PORT as unknown as number;
  private postgres_user = process.env.POSTGRES_USER as string;
  private postgres_password = process.env.POSTGRES_PASSWORD as string;

  constructor() {
    this.connectToPostgreSQL()
  }

  private async connectToPostgreSQL(){
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
          "Connection to PostgreSQL has been etablished successfully."
        );
      })
      .catch((error) => {
        console.error(
          "Une erreur est survenue lors de la connection à la base de donnée PostgreSQL : => " +
            error
        );
      });
  }
}

export default Database;