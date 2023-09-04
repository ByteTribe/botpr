import express from 'express';
import { GitHubPayload, handleGitHubWebhook } from './main';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/github-webhook', (req, res) => {
    const payload: any = req.body;
    console.log(payload);
    handleGitHubWebhook(payload);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Servidor ouvindo na porta ${port}`);
})