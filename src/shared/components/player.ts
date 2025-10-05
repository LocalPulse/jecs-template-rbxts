import { Name } from "@rbxts/jecs";
import { world } from "shared/world";

const component = <T = true>(name: string, defaultValue?: T) => {
	const theComponent = world.component<T>();

	world.set(theComponent, Name, name);
	if (defaultValue !== undefined) world.set(theComponent, theComponent, defaultValue);

	return theComponent;
};

export const Player = component<Player>("Player")