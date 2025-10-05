import Log from "@rbxts/log";

import { start } from "shared/startup";
import { RequestInitialPackets } from "../../network/client";
import { replicator_client } from "./replicator";
import clientSystems from "./systems";

task.defer(() => {
	Log.Info("Start");

	const systemsToRegister = [...clientSystems];
	if (!systemsToRegister[0]) {
		warn("No client systems configured; Planck scheduler will run without systems.");
	}

		replicator_client.init()
	RequestInitialPackets.Fire()

	Log.Debug("Registering client systems:", systemsToRegister);
	start(systemsToRegister);
});