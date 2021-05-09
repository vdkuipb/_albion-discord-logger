
import { config } from "dotenv";
import { Discord, DiscordClientWrapper } from "./DiscordClientWrapper";
import { PingPongCommand } from "./commands";
import { EquipmentData, getAlbionEventsData, KillData, PlayerData } from "./AlbionAPIWrapper";
import path from "path";
import { createImageFromTemplate } from "./PuppeteerImageCreator";

const fileName: string = "kill.png";

config();

if (!process.env.TOKEN || !process.env.GUILDID || !process.env.CHANNELID) throw new Error("Please set dotenv file variables");

async function createKillDataEmbed(kill: KillData): Promise<Discord.MessageEmbed> {
    await createImageFromTemplate(path.join(__dirname, "../templates/killevent.html"), (data: KillData) => {
        function querySelectorSetInnerHTML(query: string, innerHTML: string): void {
            const element = document.querySelector(query);
            if (element) element.innerHTML = innerHTML;
        }

        const players: string[] = [ "Killer", "Victim" ];
        players.forEach((p: string) => {
            const player: PlayerData = (data[p as keyof KillData] as PlayerData);
            let has2H: boolean = player.Equipment["MainHand"].Type.includes("2H");
            Object.keys(player.Equipment).forEach((item: string) => {
                const element: HTMLImageElement | null = document.querySelector(`#${p} [data-type=${item}]`);
                if (!element) return;

                if (item === "OffHand" && has2H) {
                    element.src = `https://render.albiononline.com/v1/item/${player.Equipment["MainHand"].Type}`;
                    element.classList.add("TwoH")
                    return;
                }
                if (!player.Equipment[item as keyof EquipmentData]) return;
                element.src = `https://render.albiononline.com/v1/item/${player.Equipment[item as keyof EquipmentData].Type}`;
            });

            const playerData: PlayerData = data[p as keyof KillData] as PlayerData;

            querySelectorSetInnerHTML(`#${p} [data-type=${p}Guild]`, playerData.AllianceName === "" ? playerData.GuildName : `[${playerData.AllianceName}]${playerData.GuildName}`);
            querySelectorSetInnerHTML(`#${p} [data-type=${p}Name]`, playerData.Name); 
            querySelectorSetInnerHTML(`#${p} [data-type=${p}IP]`, Math.round(playerData.AverageItemPower).toString() + " IP");
        });

        querySelectorSetInnerHTML(`#Stats [data-type=Timestamp]`, data.TimeStamp.toString());
        querySelectorSetInnerHTML(`#Stats [data-type=TotalVictimKillFame]`, data.TotalVictimKillFame.toString());
    }, kill as any, path.join(__dirname, "../build/" + fileName));

    const attachment = new Discord.MessageAttachment("./build/" + fileName, fileName)
    const embed: Discord.MessageEmbed = new Discord.MessageEmbed({
        title: kill.Killer.Name + " killed " + kill.Victim.Name,
        description: "",
        color: 0x000000
    });
    embed.attachFiles([ attachment ]);
    embed.setImage("attachment://" + fileName);
    return embed;
}

const discord: DiscordClientWrapper = new DiscordClientWrapper({
    prefix: process.env.PREFIX || ".",
    token: process.env.TOKEN || "undefined",
});

discord.setCommands([ 
    new PingPongCommand()
]);

discord.on(Discord.Constants.Events.CLIENT_READY, async () => {
    let previousEventId: number = -1;
    // let previousEventId: number = 234690478;

    async function sendLatestsKillsEventEmbeds() {
        const data = await getAlbionEventsData(process.env.GUILDID || "");
        if (previousEventId === -1) previousEventId = data[0].EventId;
        for (let i: number = data.length - 1, l = 0; i >= l; i--) {
            if (data[i].EventId <= previousEventId) {
                continue;
            }
            const embed: Discord.MessageEmbed = await createKillDataEmbed(data[i]);
            await discord.send(process.env.CHANNELID || "", { embed})
            //test:839832861406396426
        }
        previousEventId = data[0].EventId;
    }

    sendLatestsKillsEventEmbeds();
    setInterval(sendLatestsKillsEventEmbeds, 60000*5);

    async function testLatestKillEmbed() {
        const data = await getAlbionEventsData(process.env.GUILDID || "");
        const embed = await createKillDataEmbed(data[0]);
        await discord.send("839832861406396426" || "", { embed})
    }

    // testLatestKillEmbed();
});

discord.login();