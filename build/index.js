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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
let app = (0, express_1.default)();
const cors = require("cors");
require("dotenv").config();
const middleware = [
    express_1.default.json(),
    express_1.default.urlencoded({ limit: "30mb", extended: true }),
    cors(),
];
app.use(middleware);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    app.use("/", (req, res) => {
        res.send(`Other request:\n${req.method} at \n` + new Date());
    });
    // start the express server
    yield app.listen(config_1.PORT, () => {
        // tslint:disable-next-line:no-console
        console.log(`server started at http://localhost:${config_1.PORT}`);
    });
});
start();
//# sourceMappingURL=index.js.map