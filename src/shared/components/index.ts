import { Entity, Name } from "@rbxts/jecs";
import { PlayerDataImpl } from "shared/constants/player-data";
import { world } from "shared/world";

const registry = new Array<Entity<unknown>>();
const component = <T = true>(name: string, defaultValue?: T) => {
	const theComponent = world.component<T>();

	world.set(theComponent, Name, name);
	if (defaultValue !== undefined) world.set(theComponent, theComponent, defaultValue);

	registry.push(theComponent);
	return theComponent;
};

//TODO: make list of replication components and defaults
export const ModelDebugger = component<Model | BasePart>("ModelDebugger");
export const Unix = component<number>("Unix")

export const PlayerData = component<PlayerDataImpl>("PlayerData")

export const AllComponents = registry