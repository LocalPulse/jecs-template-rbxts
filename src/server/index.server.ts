import Log from "@rbxts/log";

import { start } from "shared/startup";
import { replicator_server } from "./replicator";
import serverSystems from "./systems";

task.defer(() => {
	Log.Info("Start");

	const systemsToRegister = [...serverSystems];
	if (!systemsToRegister[0]) {
		warn("No server systems configured; Planck scheduler will run without systems.");
	}

	replicator_server.init()
	Log.Debug("Registering server systems:", systemsToRegister);
	start(systemsToRegister);
});