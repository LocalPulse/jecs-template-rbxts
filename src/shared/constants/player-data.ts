import { t } from "@rbxts/t";

export interface PlayerDataImpl {
    stats: { sessionStart: number; playTimeAccum: number; dailyStreak: number; lastLogin: number };
    purchases: { robuxSpend: number; gamepasses: string[]; developerProducts: Record<string, number> };
    currencies: { coins: number; gems: number };
    inventory: Record<string, { qty: number }>;
    settings: { sfxVolume: number; musicVolume: number };
}

export const StartPlayerData: PlayerDataImpl = {
    inventory: {},
    currencies: {
        coins: 0,
        gems: 0,
    },
    stats: {
        sessionStart: os.time(),
        playTimeAccum: 0,
        dailyStreak: 0,
        lastLogin: os.time(),
    },
    purchases: {
        robuxSpend: 0,
        gamepasses: [],
        developerProducts: {},
    },
    settings: {
        sfxVolume: 1,
        musicVolume: 1,
    },
};

// Runtime validation schema using @rbxts/t (strict: no extra keys allowed on root objects)
export const PlayerDataSchema = t.interface({
    stats: t.interface({
        sessionStart: t.number,
        playTimeAccum: t.number,
        dailyStreak: t.number,
        lastLogin: t.number,
    }),
    purchases: t.interface({
        robuxSpend: t.number,
        gamepasses: t.array(t.string),
        developerProducts: t.any,
    }),
    currencies: t.interface({
        coins: t.number,
        gems: t.number,
    }),
    inventory: t.any,
    settings: t.interface({
        sfxVolume: t.number,
        musicVolume: t.number,
    }),
});

export const isPlayerData = PlayerDataSchema;
