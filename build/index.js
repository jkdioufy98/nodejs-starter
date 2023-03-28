"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
dotenv_1.default.config({});
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.databaseSync();
        this.routes();
    }
    routes() {
        this.app.route('/').get((request, response) => {
            response.send("NodeJS Starter !");
        });
    }
    //Database synchronisation
    databaseSync() {
        var _a;
        const database = new database_1.default();
        (_a = database.sequelize) === null || _a === void 0 ? void 0 : _a.sync();
    }
}
const app = new App().app;
const port = process.env.SERVER_PORT || 8181;
app.listen(port, () => {
    console.log(`Server started successfully on port ${port}...`);
});
