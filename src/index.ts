
import { config } from "dotenv";
import { Discord, DiscordClientWrapper } from "./DiscordClientWrapper";
import { getAlbionEventsData, KillData } from "./AlbionAPIWrapper";
import { createEquipmentAndStatsImage } from "./imageCreators";

config();
if (!process.env.TOKEN || !process.env.GUILDID) throw new Error("Please set dotenv file variables");

class AlbionDiscordLogger extends DiscordClientWrapper {
    private previousTimeStamp: string;
    private outputChannels: string[];

    public constructor() {
        super({
            prefix: process.env.PREFIX || ".",
            token: process.env.TOKEN || "undefined",
        });
        this.previousTimeStamp = "";
        this.outputChannels = process.env.CHANNELID ? [ process.env.CHANNELID ] : [];
        this.login();
    }

    private async createKillEmbed(kill: KillData): Promise<Discord.MessageEmbed> {
        await createEquipmentAndStatsImage(kill);
        const attachment = new Discord.MessageAttachment("./build/equipment-and-stats.png", "equipment-and-stats.png")
        const embed: Discord.MessageEmbed = new Discord.MessageEmbed({
            title: kill.Killer.Name + " killed " + kill.Victim.Name,
            description: "",
            color: 0x000000,
            timestamp: new Date(kill.TimeStamp)
        });
        embed.attachFiles([ attachment ]);
        embed.setImage("attachment://equipment-and-stats.png");
        return embed;
    }

    private async sendLatestsKillsEventEmbeds() {
        const data = await getAlbionEventsData(process.env.GUILDID || "");
        if (this.previousTimeStamp === "") this.previousTimeStamp = data[0].TimeStamp;
        data.forEach(async (kill: KillData) => {
            if (new Date(kill.TimeStamp) <= new Date(this.previousTimeStamp)) return;
            this.outputChannels.forEach(async (channel: string) => {
                const embed: Discord.MessageEmbed = await this.createKillEmbed(kill);
                await this.send(channel, { embed});
            });
        });
        this.previousTimeStamp = data[0].TimeStamp;
    }

    private async testLatestKillEmbed() {
        const data = await getAlbionEventsData(process.env.GUILDID || "");
        const embed = await this.createKillEmbed(data[0]);
        await this.send(this.outputChannels[0] || "", { embed})
    }

    protected onReady(): void {
        super.onReady();
        this.setCommands([]);
        this.client.user!.setActivity('for kills', { type: 'WATCHING' })
        
        this.sendLatestsKillsEventEmbeds();
        setInterval(this.sendLatestsKillsEventEmbeds.bind(this), 60000*5); // 5mins

        // this.testLatestKillEmbed();
    }
}

const albionDiscordLogger: AlbionDiscordLogger = new AlbionDiscordLogger();