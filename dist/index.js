"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const GITHUB_SECRET = process.env.GITHUB_SECRET;
const app = express_1.default();
app.use(body_parser_1.default.json());
app.post("/", (req, res) => {
    console.log(req.body);
    res.send("Hi");
});
app.listen(8080);
//# sourceMappingURL=index.js.map