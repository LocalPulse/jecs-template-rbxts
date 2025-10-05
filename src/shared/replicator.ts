import Replecs from "@rbxts/replecs";
import { AllComponents } from "./components";
import { world } from "./world";

export = Replecs.create(world)

for (const componet of AllComponents ) {
    world.add(componet, Replecs.shared)
}