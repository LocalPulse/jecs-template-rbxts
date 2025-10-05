import { pair, World } from "@rbxts/jecs";
import { createCollection, Document } from "@rbxts/lapis";
import { Phases } from "@rbxts/planck-runservice";
import { Networked, reliable } from "@rbxts/replecs";
import { Players } from "@rbxts/services";
import { PlayerData } from "shared/components";
import { Player } from "shared/components/player";
import { PlayerDataImpl, PlayerDataSchema, StartPlayerData } from "shared/constants/player-data";
import { world } from "shared/world";

const playerData = createCollection<PlayerDataImpl>("PlayerData", {
	defaultData: StartPlayerData,
	validate: PlayerDataSchema,
});
const documents = new Map<number, Document<PlayerDataImpl>>();
const playersWithoutData = world.query(Player).without(PlayerData);

let initialized = false;

function initData(world: World) {
	world.changed(PlayerData, (entity, _comp, value) => {
		const player = world.get(entity, Player);
		if (!player) return;

		if (!PlayerDataSchema(value)) {
			warn(`Invalid PlayerData detected for player ${player.Name}`);
			player.Kick("Data failed to save, please reconnect");
			return;
		}

		const document = documents.get(player.UserId);
		if (!document) return;

		try {
			const currentData = document.read();
			document.write({
				...currentData,
				...value,
			});
		} catch (error) {
			warn(`Failed to write data for ${player.Name}: ${error}`);
			return;
		}
	});

	initialized = true;
}

async function dataSystem(world: World) {
	for (const [entity, player] of playersWithoutData) {
		world.set(entity, Networked, undefined);
		world.set(entity, pair(reliable, PlayerData), undefined);
		world.set(entity, PlayerData, StartPlayerData);
		print("Attached PlayerData to", player.Name);

		try {
			const document = await playerData.load(tostring(player.UserId), [player.UserId]);
			if (!player.IsDescendantOf(Players)) {
				await document.close().catch((err) => warn(`Failed: ${err}`));
				return;
			}

			documents.set(player.UserId, document);
			print(document.read());
		} catch (error) {
			warn(`Player ${player.Name}'s data failed to load ${error}`);
			player.Kick("Data failed to load");
			return;
		}
	}

	if (!initialized) await initData(world);
}

export = {
	system: dataSystem,
	phase: Phases.Update,
};
