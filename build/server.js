"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const main_1 = require("./main");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.post('/github-webhook', (req, res) => {
    const payload = req.body;
    (0, main_1.handleGitHubWebhook)(payload);
    res.sendStatus(200);
});
app.listen(port, () => {
    console.log(`Servidor ouvindo na porta ${port}`);
});
