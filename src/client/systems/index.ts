import { World } from "@rbxts/jecs";
import { SystemTable } from "@rbxts/planck";

import replicationSetup from "./replication-setup";

const systems: Array<SystemTable<[World]>> = [replicationSetup];

export default systems;
