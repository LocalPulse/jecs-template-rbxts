import { World } from "@rbxts/jecs";
import { Phase } from "@rbxts/planck";
import { Players } from "@rbxts/services";
import { Player } from "shared/components/player";

function setupSystem(world: World) {
    Players.PlayerAdded.Connect((player) => {
        const e = world.entity()
        world.set(e, Player, player)
    })
}

export = {
    system: setupSystem,
    phase: Phase.Startup
}