import { World } from "@rbxts/jecs";
import { SystemTable } from "@rbxts/planck";

import data from "./data";
import replicationSetup from "./replication-setup";
import setup from "./setup";

const systems: Array<SystemTable<[World]>> = [replicationSetup, data, setup];

export default systems;
