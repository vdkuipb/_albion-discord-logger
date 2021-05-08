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
    TimeStamp: Date;
    Killer: PlayerData;
    Victim: PlayerData;
    TotalVictimKillFame: number;
    Participants: PlayerData[];
}