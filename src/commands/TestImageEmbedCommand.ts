import { Discord, IDiscordClientCommand, DiscordCommandCallback } from "../DiscordClientWrapper";
import { createImageFromTemplate } from "../PuppeteerImageCreator";
import path from "path";
import { getAlbionEventsData, EquipmentData, KillData, PlayerData } from "../AlbionAPIWrapper";

function createEmbed(): Discord.MessageEmbed {
    const attachment = new Discord.MessageAttachment("./build/temp.png", "temp.png")
    const embed: Discord.MessageEmbed = new Discord.MessageEmbed({
        title: "test",
        description: "test",
        color: 0x000000
    });
    embed.attachFiles([ attachment ]);
    embed.setImage("attachment://temp.png");
    return embed;
}

export class TestImageEmbedCommand implements IDiscordClientCommand {
    public command: string = "test";
    public onCommand: DiscordCommandCallback = async (message: Discord.Message, params: string[]) => {
        const data: KillData[] = await getAlbionEventsData("pBFwis3sRISF7qkNIYgyjg");

        await createImageFromTemplate(path.join(__dirname, "../../templates/killevent.html"), (data: KillData) => {
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

                    element.src = `https://render.albiononline.com/v1/item/${player.Equipment[item as keyof EquipmentData].Type}`;
                });
            })
        }, data[0] as any, path.join(__dirname, "../../build/temp.png"));
        message.channel.send({ embed: createEmbed() });
    }
} 
