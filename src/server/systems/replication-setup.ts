import { World } from "@rbxts/jecs";
import { Phases } from "@rbxts/planck-runservice";
import { replicator_server } from "server/replicator";
import interval from "shared/interval";
import { RequestInitialPackets, SendInitialPackets, SendReliablePacket, SendUnreliablePacket } from "../../../network/server";

const updates_interval = interval(1 / 20)
const unreliable_interval = interval(1 / 30)


function dataSystem(world: World) {
    if (updates_interval()) {
        for (const [player, buf, variants] of replicator_server.collect_updates()) {
            SendReliablePacket.Fire(player, buf, variants)
        }
        for (const [_, plr] of RequestInitialPackets.Iter()) {
            if (replicator_server.is_player_ready(plr)) continue;
            replicator_server.mark_player_ready(plr);

            const [buff, variants] = replicator_server.get_full(plr);
            SendInitialPackets.Fire(plr, buff, variants);
        }
    }
    if (unreliable_interval()) {
        for (const [player, buf, variants] of replicator_server.collect_unreliable()) {
            SendUnreliablePacket.Fire(player, buf, variants)
        }
    }
}

export = {
    system: dataSystem,
    phase: Phases.Update
}