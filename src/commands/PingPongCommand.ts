import { Discord, IDiscordClientCommand, DiscordCommandCallback } from "../DiscordClientWrapper";

export class PingPongCommand implements IDiscordClientCommand {
    public command: string = "ping";
    public onCommand: DiscordCommandCallback = (message: Discord.Message, params: string[]) => {
        if (params.length > 0 && params[0] === "false") return;
        message.reply("pong");
    }
} 
