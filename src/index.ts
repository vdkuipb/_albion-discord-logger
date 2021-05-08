import { config } from "dotenv";
import { Discord, DiscordClientWrapper } from "./DiscordClientWrapper";
import { PingPongCommand, TestImageEmbedCommand } from "./commands";
import { EquipmentData, getAlbionEventsData, KillData, PlayerData } from "./AlbionAPIWrapper";
import path from "path";
import { createImageFromTemplate } from "./PuppeteerImageCreator";

config();

async function createKillDataEmbed(kill: KillData): Promise<Discord.MessageEmbed> {
    await createImageFromTemplate(path.join(__dirname, "../templates/killevent.html"), (data: KillData) => {
        console.log(data);
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
        });
        function querySelectorSetInnerHTML(query: string, innerHTML: string): void {
            const element = document.querySelector(query);
            if (element) element.innerHTML = innerHTML;
        }
        querySelectorSetInnerHTML(`#Killer [data-type=KillerGuild]`, data.Killer.GuildName);
        querySelectorSetInnerHTML(`#Killer [data-type=KillerName]`, data.Killer.Name); 
        querySelectorSetInnerHTML(`#Killer [data-type=KillerIP]`, Math.round(data.Killer.AverageItemPower).toString() + " IP");

        querySelectorSetInnerHTML(`#Victim [data-type=VictimGuild]`, data.Victim.GuildName);
        querySelectorSetInnerHTML(`#Victim [data-type=VictimName]`, data.Victim.Name);
        querySelectorSetInnerHTML(`#Victim [data-type=VictimIP]`, Math.round(data.Victim.AverageItemPower).toString() + " IP");

        querySelectorSetInnerHTML(`#Stats [data-type=Timestamp]`, data.TimeStamp.toString());
        querySelectorSetInnerHTML(`#Stats [data-type=TotalVictimKillFame]`, data.TotalVictimKillFame.toString());
    }, kill as any, path.join(__dirname, "../build/temp.png"));

    const attachment = new Discord.MessageAttachment("./build/temp.png", "temp.png")
    const embed: Discord.MessageEmbed = new Discord.MessageEmbed({
        title: kill.Killer.Name + " killed " + kill.Victim.Name,
        description: "",
        color: 0x000000
    });
    embed.attachFiles([ attachment ]);
    embed.setImage("attachment://temp.png");
    return embed;
}

const discord: DiscordClientWrapper = new DiscordClientWrapper({
    prefix: process.env.PREFIX || ".",
    token: process.env.TOKEN || "undefined",
});

discord.setCommands([ 
    new PingPongCommand(),
    // new TestImageEmbedCommand()
]);

discord.on(Discord.Constants.Events.CLIENT_READY, async () => {
    let previousEventId: number = -1;

    async function sendLatestsKillsEventEmbeds() {
        const data = await getAlbionEventsData("pBFwis3sRISF7qkNIYgyjg");
        if (previousEventId === -1) previousEventId = data[0].EventId;
        for (let i: number = data.length - 1, l = 0; i >= l; i--) {
            if (data[i].EventId <= previousEventId) {
                continue;
            }
            const embed: Discord.MessageEmbed = await createKillDataEmbed(data[i]);
            await discord.send("839496429482410044", { embed})
            //test:839832861406396426
        }
        previousEventId = data[0].EventId;
    }

    sendLatestsKillsEventEmbeds();
    setInterval(sendLatestsKillsEventEmbeds, 60000*5);
});

discord.login();