import EventEmitter from "events";
import Discord from "discord.js";
export * as Discord from "discord.js";

export type DiscordCommandCallback = (client: DiscordClientWrapper, message: Discord.Message, params: string[]) => void;

export interface IDiscordClientConfig {
    token: string;
    prefix: string;
}

export interface IDiscordClientCommand {
    command: string;
    onCommand: DiscordCommandCallback;
}

export class DiscordClientWrapper extends EventEmitter {
    private config: IDiscordClientConfig;
    protected client: Discord.Client;
    private commands: { [command: string]: DiscordCommandCallback };

    public constructor(config: IDiscordClientConfig) {
        super();
        this.config = config;
        this.client = new Discord.Client();
        this.client.on(Discord.Constants.Events.CLIENT_READY, this.onReady.bind(this));
        this.client.on(Discord.Constants.Events.MESSAGE_CREATE, this.onMessage.bind(this));
        this.commands = {};
    }

    public login(): void {
        this.client.login(this.config.token);
    }

    protected onReady(): void {
        this.emit(Discord.Constants.Events.CLIENT_READY);
    }

    public setCommands(commands: IDiscordClientCommand[]): void {
        for (let i = 0, l = commands.length; i < l; i++) {
            const command: IDiscordClientCommand = commands[i];
            this.commands[command.command] = command.onCommand;
        }
    }

    protected onMessage(message: Discord.Message): void {
        this.emit(Discord.Constants.Events.MESSAGE_CREATE, message);

        if (message.author.bot ||
            message.content.startsWith(this.config.prefix) === false) return;
        
        const contentWithoutPrefix: string = message.content.substring(1, message.content.length);
        const split: string[] = contentWithoutPrefix.split(' ');

        const command: DiscordCommandCallback = this.commands[split[0]];
        if (!command) return;

        command(this, message, split.splice(1, split.length));
    }

    public async send(channelId: string, message: string | { [ embed: string ]: Discord.MessageEmbed }): Promise<void> {
        const channel: Discord.Channel = await this.client.channels.fetch(channelId);
        if (channel.isText()) channel.send(message); 
    }
}
