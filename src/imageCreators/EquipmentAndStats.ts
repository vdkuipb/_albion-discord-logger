import { EquipmentData, KillData, PlayerData } from "../AlbionAPIWrapper";
import { createImageFromTemplate } from "../PuppeteerImageCreator";
import path from "path";

function evaluate(data: KillData) {
    const { TimeStamp, TotalVictimKillFame } = data;
    [ "Killer", "Victim" ].forEach((p: string) => {
        const { AllianceName, GuildName, Name, AverageItemPower, Equipment } = data[p as keyof KillData] as PlayerData;

        let hasTwoHandedWeapon: boolean = Equipment["MainHand"] ? Equipment["MainHand"].Type.includes("2H") : false;
        Object.keys(Equipment).forEach((item: string) => {
            const element: HTMLImageElement | null = document.querySelector(`#${p} [data-type=${item}]`);
            if (!element) return;

            if (item === "OffHand" && hasTwoHandedWeapon) {
                element.src = `https://render.albiononline.com/v1/item/${Equipment["MainHand"].Type}`;
                element.classList.add("TwoH")
                return;
            }
            
            if (!Equipment[item as keyof EquipmentData]) return;
            element.src = `https://render.albiononline.com/v1/item/${Equipment[item as keyof EquipmentData].Type}`;
        });

        document.querySelector(`#${p} [data-type=${p}Guild]`)!.innerHTML = AllianceName === "" ? GuildName : `[${AllianceName}] ${GuildName}`;
        document.querySelector(`#${p} [data-type=${p}Name]`)!.innerHTML = Name; 
        document.querySelector(`#${p} [data-type=${p}IP]`)!.innerHTML = Math.round(AverageItemPower).toString() + " IP";
    });

    document.querySelector(`#Stats [data-type=TotalVictimKillFame]`)!.innerHTML = TotalVictimKillFame.toString();
}


export async function createEquipmentAndStatsImage(kill: KillData): Promise<void> {
    const template: string = path.join(__dirname, "../../templates/equipment-and-stats.html");
    const output: string = path.join(__dirname, "../../build/" + "equipment-and-stats.png");
    return await createImageFromTemplate(template, evaluate, kill as any, output);
}