import express from 'express';
import { handleGitHubWebhookPr } from './main';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/github-webhook/pull-request', (req, res) => {
    const payload: any = req.body;
    handleGitHubWebhookPr(payload);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Servidor ouvindo na porta ${port}`);
})