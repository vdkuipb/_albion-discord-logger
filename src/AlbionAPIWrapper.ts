import fetch from "node-fetch";

export interface EquipmentData {
    MainHand: { [Type: string]: string } 
}   

export interface PlayerData {
    Name: string;
    Inventory: object[];
    AllianceName: string;
    GuildName: string;
    AverageItemPower: number;
    Equipment: EquipmentData;
}

export interface KillData {
    numberOfParticipants: number;
    EventId: number;
    TimeStamp: string;
    Killer: PlayerData;
    Victim: PlayerData;
    TotalVictimKillFame: number;
    Participants: PlayerData[];
}

const API_URL: string = "https://gameinfo.albiononline.com/api/gameinfo";

export async function getAlbionEventsData(guildId: string): Promise<KillData[]> {
    const endpoint: string = "/events";
    const response = await fetch(`${API_URL}${endpoint}?guildId=${guildId}`)
    return await response.json();
}