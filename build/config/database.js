"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Database {
    constructor() {
        this.postgres_db = process.env.POSTGRES_DB;
        this.postgres_host = process.env.POSTGRES_HOST;
        this.postgres_port = process.env.POSTGRES_PORT;
        this.postgres_user = process.env.POSTGRES_USER;
        this.postgres_password = process.env.POSTGRES_PASSWORD;
        this.connectToPostgreSQL();
    }
    connectToPostgreSQL() {
        return __awaiter(this, void 0, void 0, function* () {
            this.sequelize = new sequelize_1.Sequelize({
                database: this.postgres_db,
                username: this.postgres_user,
                password: this.postgres_password,
                host: this.postgres_host,
                port: this.postgres_port,
                dialect: "postgres",
            });
            this.sequelize
                .authenticate()
                .then(() => {
                console.log("Connection to PostgreSQL has been etablished successfully.");
            })
                .catch((error) => {
                console.error("Une erreur est survenue lors de la connection à la base de donnée PostgreSQL : => " +
                    error);
            });
        });
    }
}
exports.default = Database;
