import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
export const sendDiscordMessage = async (message: string) => {
  if (!discordWebhookUrl) return null;
  try {
    await axios.post(discordWebhookUrl, { content: message });
    console.log("Message send");
  } catch (error) {
    //@ts-ignore
    console.error("Failed to send message: ", error.message);
  }
};

export const handleGitHubWebhookPr = (payload: any) => {
  const senderName = payload.sender.login;
  const action = payload.action;
  const repository = payload.repository.html_url;
  const repoName = payload.repository.name;
  const message = `[${senderName}](https://github.com/${senderName}) ${action} a pull-request in [${repoName}](${repository})`;
  sendDiscordMessage(message);
};
