import { config } from "dotenv";
import { Discord, DiscordClientWrapper } from "./DiscordClientWrapper";
import { PingPongCommand } from "./commands";

config();

const discord: DiscordClientWrapper = new DiscordClientWrapper({
    prefix: process.env.PREFIX || ".",
    token: process.env.TOKEN || "undefined",
});

discord.setCommands([ new PingPongCommand() ]);

discord.on(Discord.Constants.Events.CLIENT_READY, () => {
    console.log('Discord client is ready');
});

discord.login();