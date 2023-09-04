import axios from "axios";
import * as dotenv from 'dotenv';

dotenv.config();

const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

export interface GitHubPayload {
    action: string;
    pull_request: {
        title: string;
    };
    sender: {
        login: string;
    };
}

export const sendDiscordMessage = async (message:string) => {
    if(!discordWebhookUrl) return null;
    try {
        await axios.post(discordWebhookUrl, {content: message});
        console.log("Message send");
    } catch(error) {
        //@ts-ignore
        console.error("Failed to send message: ", error.message);
    }
};

export const handleGitHubWebhook = (payload: any) => {
    
    if(payload.action === 'opened') {
        const { title } = payload.pull_request;
        const senderName = payload.sender.login;
        const message = `New pull request of ${senderName}: ${title}`;
        sendDiscordMessage(message);
    }
}