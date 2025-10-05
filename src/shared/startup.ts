import jabby, { obtain_client } from "@rbxts/jabby";
import { Entity, World } from "@rbxts/jecs";
import { ContextActionService } from "@rbxts/services";

import { SystemTable } from "@rbxts/planck";
import { ModelDebugger } from "./components";
import { constants } from "./constants";
import { scheduler } from "./scheduler";
import { world as world_ } from "./world";

export function start(systems: Array<SystemTable<[World]>>): void {
	if (systems[0] !== undefined) {
		scheduler.addSystems(systems);
	} else {
		warn("Planck scheduler received no systems to register; skipping addSystems call.");
	}

	jabby.register({
		name: `World ${constants.IS_SERVER? "Server" : "Client"}`,
		applet: jabby.applets.world,
		configuration: {
			world: world_,
			get_entity_from_part: (part) => {
				for (const [entity, model] of world_.query(ModelDebugger)) {
					if (!(part.IsDescendantOf(model) || part === model)) continue;
					return [
						entity,
						(model.IsA("Model") && model.PrimaryPart) || part,
					] as LuaTuple<[Entity, Part]>;
				}
				return [undefined, part] as unknown as LuaTuple<[Entity, Part]>;
			},
		},
	});

	if (constants.IS_SERVER) {
		jabby.broadcast_server();
		return;
	}

	const client = obtain_client();

	ContextActionService.BindAction(
		"Open Jabby Home",
		(_, state) => {
			if (state !== Enum.UserInputState.Begin) return;
			client.spawn_app(client.apps.home);
		},
		false,
		Enum.KeyCode.F4,
	);
}