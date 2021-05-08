import { Discord, IDiscordClientCommand, DiscordCommandCallback } from "../DiscordClientWrapper";
import { createImageFromTemplate } from "../PuppeteerImageCreator";
import path from "path";
import { EquipmentData, KillData, PlayerData } from "../AlbionAPIWrapper";

const dump: object = {
    "numberOfParticipants": 1,
    "groupMemberCount": 1,
    "EventId": 233405281,
    "TimeStamp": "2021-05-06T08:58:35.262273900Z",
    "Version": 4,
    "Killer": {
        "AverageItemPower": 972.281,
        "Equipment": {
            "MainHand": {
                "Type": "T6_2H_SPEAR",
                "Count": 1,
                "Quality": 2,
                "ActiveSpells": [],
                "PassiveSpells": []
            },
            "OffHand": null,
            "Head": {
                "Type": "T6_HEAD_PLATE_HELL",
                "Count": 1,
                "Quality": 1,
                "ActiveSpells": [],
                "PassiveSpells": []
            },
            "Armor": {
                "Type": "T6_ARMOR_CLOTH_SET2",
                "Count": 1,
                "Quality": 1,
                "ActiveSpells": [],
                "PassiveSpells": []
            },
            "Shoes": {
                "Type": "T4_SHOES_CLOTH_ROYAL@2",
                "Count": 1,
                "Quality": 3,
                "ActiveSpells": [],
                "PassiveSpells": []
            },
            "Bag": {
                "Type": "T5_BAG_INSIGHT@1",
                "Count": 1,
                "Quality": 3,
                "ActiveSpells": [],
                "PassiveSpells": []
            },
            "Cape": {
                "Type": "T4_CAPEITEM_DEMON@2",
                "Count": 1,
                "Quality": 3,
                "ActiveSpells": [],
                "PassiveSpells": []
            },
            "Mount": {
                "Type": "T3_MOUNT_HORSE",
                "Count": 1,
                "Quality": 1,
                "ActiveSpells": [],
                "PassiveSpells": []
            },
            "Potion": {
                "Type": "T6_POTION_COOLDOWN",
                "Count": 8,
                "Quality": 0,
                "ActiveSpells": [],
                "PassiveSpells": []
            },
            "Food": {
                "Type": "T7_FISH_SALTWATER_ALL_COMMON",
                "Count": 10,
                "Quality": 0,
                "ActiveSpells": [],
                "PassiveSpells": []
            }
        },
        "Inventory": [],
        "Name": "Alaudes",
        "Id": "pNXG8qsLRjGS4tRz13pP4w",
        "GuildName": "Quinx Squad",
        "GuildId": "pBFwis3sRISF7qkNIYgyjg",
        "AllianceName": "",
        "AllianceId": "",
        "AllianceTag": "",
        "Avatar": "AVATAR_MORGANA_01",
        "AvatarRing": "AVATARRING_VANITY_BARBARIAN",
        "DeathFame": 0,
        "KillFame": 29412,
        "FameRatio": 294120,
        "LifetimeStatistics": {
            "PvE": {
                "Total": 0,
                "Royal": 0,
                "Outlands": 0,
                "Avalon": 0,
                "Hellgate": 0,
                "CorruptedDungeon": 0
            },
            "Gathering": {
                "Fiber": {
                    "Total": 0,
                    "Royal": 0,
                    "Outlands": 0,
                    "Avalon": 0
                },
                "Hide": {
                    "Total": 0,
                    "Royal": 0,
                    "Outlands": 0,
                    "Avalon": 0
                },
                "Ore": {
                    "Total": 0,
                    "Royal": 0,
                    "Outlands": 0,
                    "Avalon": 0
                },
                "Rock": {
                    "Total": 0,
                    "Royal": 0,
                    "Outlands": 0,
                    "Avalon": 0
                },
                "Wood": {
                    "Total": 0,
                    "Royal": 0,
                    "Outlands": 0,
                    "Avalon": 0
                },
                "All": {
                    "Total": 0,
                    "Royal": 0,
                    "Outlands": 0,
                    "Avalon": 0
                }
            },
            "Crafting": {
                "Total": 0,
                "Royal": 0,
                "Outlands": 0,
                "Avalon": 0
            },
            "CrystalLeague": 0,
            "FishingFame": 0,
            "FarmingFame": 0,
            "Timestamp": null
        }
    },
    "Victim": {
        "AverageItemPower": 927.9817,
        "Equipment": {
            "MainHand": {
                "Type": "T5_2H_BOW@1",
                "Count": 1,
                "Quality": 1,
                "ActiveSpells": [],
                "PassiveSpells": []
            },
            "OffHand": null,
            "Head": {
                "Type": "T5_HEAD_LEATHER_SET2@1",
                "Count": 1,
                "Quality": 2,
                "ActiveSpells": [],
                "PassiveSpells": []
            },
            "Armor": {
                "Type": "T5_ARMOR_LEATHER_SET1@1",
                "Count": 1,
                "Quality": 2,
                "ActiveSpells": [],
                "PassiveSpells": []
            },
            "Shoes": {
                "Type": "T5_SHOES_LEATHER_SET2@1",
                "Count": 1,
                "Quality": 2,
                "ActiveSpells": [],
                "PassiveSpells": []
            },
            "Bag": {
                "Type": "T4_BAG@1",
                "Count": 1,
                "Quality": 1,
                "ActiveSpells": [],
                "PassiveSpells": []
            },
            "Cape": {
                "Type": "T5_CAPE@1",
                "Count": 1,
                "Quality": 2,
                "ActiveSpells": [],
                "PassiveSpells": []
            },
            "Mount": {
                "Type": "T3_MOUNT_HORSE",
                "Count": 1,
                "Quality": 1,
                "ActiveSpells": [],
                "PassiveSpells": []
            },
            "Potion": {
                "Type": "T6_POTION_COOLDOWN",
                "Count": 6,
                "Quality": 0,
                "ActiveSpells": [],
                "PassiveSpells": []
            },
            "Food": {
                "Type": "T8_MEAL_STEW",
                "Count": 1,
                "Quality": 0,
                "ActiveSpells": [],
                "PassiveSpells": []
            }
        },
        "Inventory": [
            {
                "Type": "TREASURE_TRIBAL_RARITY1",
                "Count": 1,
                "Quality": 0,
                "ActiveSpells": [],
                "PassiveSpells": []
            },
            {
                "Type": "T5_ARMOR_CLOTH_SET2@1",
                "Count": 1,
                "Quality": 2,
                "ActiveSpells": [],
                "PassiveSpells": []
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        "Name": "novieishi",
        "Id": "_8jwI2Z6RnqYr2mKGj2vZw",
        "GuildName": "",
        "GuildId": "",
        "AllianceName": "",
        "AllianceId": "",
        "AllianceTag": "",
        "Avatar": "AVATAR_FAMERANK_04",
        "AvatarRing": "RING1",
        "DeathFame": 29412,
        "KillFame": 0,
        "FameRatio": 0,
        "LifetimeStatistics": {
            "PvE": {
                "Total": 0,
                "Royal": 0,
                "Outlands": 0,
                "Avalon": 0,
                "Hellgate": 0,
                "CorruptedDungeon": 0
            },
            "Gathering": {
                "Fiber": {
                    "Total": 0,
                    "Royal": 0,
                    "Outlands": 0,
                    "Avalon": 0
                },
                "Hide": {
                    "Total": 0,
                    "Royal": 0,
                    "Outlands": 0,
                    "Avalon": 0
                },
                "Ore": {
                    "Total": 0,
                    "Royal": 0,
                    "Outlands": 0,
                    "Avalon": 0
                },
                "Rock": {
                    "Total": 0,
                    "Royal": 0,
                    "Outlands": 0,
                    "Avalon": 0
                },
                "Wood": {
                    "Total": 0,
                    "Royal": 0,
                    "Outlands": 0,
                    "Avalon": 0
                },
                "All": {
                    "Total": 0,
                    "Royal": 0,
                    "Outlands": 0,
                    "Avalon": 0
                }
            },
            "Crafting": {
                "Total": 0,
                "Royal": 0,
                "Outlands": 0,
                "Avalon": 0
            },
            "CrystalLeague": 0,
            "FishingFame": 0,
            "FarmingFame": 0,
            "Timestamp": null
        }
    },
    "TotalVictimKillFame": 29412,
    "Location": null,
    "Participants": [
        {
            "AverageItemPower": 972.281,
            "Equipment": {
                "MainHand": {
                    "Type": "T6_2H_SPEAR",
                    "Count": 1,
                    "Quality": 2,
                    "ActiveSpells": [],
                    "PassiveSpells": []
                },
                "OffHand": null,
                "Head": {
                    "Type": "T6_HEAD_PLATE_HELL",
                    "Count": 1,
                    "Quality": 1,
                    "ActiveSpells": [],
                    "PassiveSpells": []
                },
                "Armor": {
                    "Type": "T6_ARMOR_CLOTH_SET2",
                    "Count": 1,
                    "Quality": 1,
                    "ActiveSpells": [],
                    "PassiveSpells": []
                },
                "Shoes": {
                    "Type": "T4_SHOES_CLOTH_ROYAL@2",
                    "Count": 1,
                    "Quality": 3,
                    "ActiveSpells": [],
                    "PassiveSpells": []
                },
                "Bag": {
                    "Type": "T5_BAG_INSIGHT@1",
                    "Count": 1,
                    "Quality": 3,
                    "ActiveSpells": [],
                    "PassiveSpells": []
                },
                "Cape": {
                    "Type": "T4_CAPEITEM_DEMON@2",
                    "Count": 1,
                    "Quality": 3,
                    "ActiveSpells": [],
                    "PassiveSpells": []
                },
                "Mount": {
                    "Type": "T3_MOUNT_HORSE",
                    "Count": 1,
                    "Quality": 1,
                    "ActiveSpells": [],
                    "PassiveSpells": []
                },
                "Potion": {
                    "Type": "T6_POTION_COOLDOWN",
                    "Count": 8,
                    "Quality": 0,
                    "ActiveSpells": [],
                    "PassiveSpells": []
                },
                "Food": {
                    "Type": "T7_FISH_SALTWATER_ALL_COMMON",
                    "Count": 10,
                    "Quality": 0,
                    "ActiveSpells": [],
                    "PassiveSpells": []
                }
            },
            "Inventory": [],
            "Name": "Alaudes",
            "Id": "pNXG8qsLRjGS4tRz13pP4w",
            "GuildName": "Quinx Squad",
            "GuildId": "pBFwis3sRISF7qkNIYgyjg",
            "AllianceName": "",
            "AllianceId": "",
            "AllianceTag": "",
            "Avatar": "AVATAR_MORGANA_01",
            "AvatarRing": "AVATARRING_VANITY_BARBARIAN",
            "DeathFame": 0,
            "KillFame": 0,
            "FameRatio": 0,
            "LifetimeStatistics": {
                "PvE": {
                    "Total": 0,
                    "Royal": 0,
                    "Outlands": 0,
                    "Avalon": 0,
                    "Hellgate": 0,
                    "CorruptedDungeon": 0
                },
                "Gathering": {
                    "Fiber": {
                        "Total": 0,
                        "Royal": 0,
                        "Outlands": 0,
                        "Avalon": 0
                    },
                    "Hide": {
                        "Total": 0,
                        "Royal": 0,
                        "Outlands": 0,
                        "Avalon": 0
                    },
                    "Ore": {
                        "Total": 0,
                        "Royal": 0,
                        "Outlands": 0,
                        "Avalon": 0
                    },
                    "Rock": {
                        "Total": 0,
                        "Royal": 0,
                        "Outlands": 0,
                        "Avalon": 0
                    },
                    "Wood": {
                        "Total": 0,
                        "Royal": 0,
                        "Outlands": 0,
                        "Avalon": 0
                    },
                    "All": {
                        "Total": 0,
                        "Royal": 0,
                        "Outlands": 0,
                        "Avalon": 0
                    }
                },
                "Crafting": {
                    "Total": 0,
                    "Royal": 0,
                    "Outlands": 0,
                    "Avalon": 0
                },
                "CrystalLeague": 0,
                "FishingFame": 0,
                "FarmingFame": 0,
                "Timestamp": null
            },
            "DamageDone": 2634,
            "SupportHealingDone": 0
        }
    ],
    "GroupMembers": [
        {
            "AverageItemPower": 0,
            "Equipment": {
                "MainHand": {
                    "Type": "T6_2H_SPEAR",
                    "Count": 1,
                    "Quality": 2,
                    "ActiveSpells": [],
                    "PassiveSpells": []
                },
                "OffHand": null,
                "Head": null,
                "Armor": null,
                "Shoes": null,
                "Bag": null,
                "Cape": null,
                "Mount": null,
                "Potion": null,
                "Food": null
            },
            "Inventory": [],
            "Name": "Alaudes",
            "Id": "pNXG8qsLRjGS4tRz13pP4w",
            "GuildName": "Quinx Squad",
            "GuildId": "pBFwis3sRISF7qkNIYgyjg",
            "AllianceName": "",
            "AllianceId": "",
            "AllianceTag": "",
            "Avatar": "AVATAR_MORGANA_01",
            "AvatarRing": "AVATARRING_VANITY_BARBARIAN",
            "DeathFame": 0,
            "KillFame": 29412,
            "FameRatio": 294120,
            "LifetimeStatistics": {
                "PvE": {
                    "Total": 0,
                    "Royal": 0,
                    "Outlands": 0,
                    "Avalon": 0,
                    "Hellgate": 0,
                    "CorruptedDungeon": 0
                },
                "Gathering": {
                    "Fiber": {
                        "Total": 0,
                        "Royal": 0,
                        "Outlands": 0,
                        "Avalon": 0
                    },
                    "Hide": {
                        "Total": 0,
                        "Royal": 0,
                        "Outlands": 0,
                        "Avalon": 0
                    },
                    "Ore": {
                        "Total": 0,
                        "Royal": 0,
                        "Outlands": 0,
                        "Avalon": 0
                    },
                    "Rock": {
                        "Total": 0,
                        "Royal": 0,
                        "Outlands": 0,
                        "Avalon": 0
                    },
                    "Wood": {
                        "Total": 0,
                        "Royal": 0,
                        "Outlands": 0,
                        "Avalon": 0
                    },
                    "All": {
                        "Total": 0,
                        "Royal": 0,
                        "Outlands": 0,
                        "Avalon": 0
                    }
                },
                "Crafting": {
                    "Total": 0,
                    "Royal": 0,
                    "Outlands": 0,
                    "Avalon": 0
                },
                "CrystalLeague": 0,
                "FishingFame": 0,
                "FarmingFame": 0,
                "Timestamp": null
            }
        }
    ],
    "GvGMatch": null,
    "BattleId": 233405281,
    "KillArea": "OPEN_WORLD",
    "Type": "KILL"
}

function createEmbed(): Discord.MessageEmbed {
    const attachment = new Discord.MessageAttachment("./build/example.png", "example.png")
    const embed: Discord.MessageEmbed = new Discord.MessageEmbed({
        title: "test",
        description: "test",
        color: 0x000000
    });
    embed.attachFiles([ attachment ]);
    embed.setImage("attachment://example.png");
    return embed;
}

export class TestImageEmbedCommand implements IDiscordClientCommand {
    public command: string = "test";
    public onCommand: DiscordCommandCallback = async (message: Discord.Message, params: string[]) => {
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
        }, dump as any, path.join(__dirname, "../../build/example.png"));
        message.channel.send({ embed: createEmbed() });
    }
} 
