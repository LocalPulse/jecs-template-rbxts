import { World } from "@rbxts/jecs";
import { Phases } from "@rbxts/planck-runservice";
import { replicator_client } from "client/replicator";
import { SendInitialPackets, SendReliablePacket, SendUnreliablePacket } from "../../../network/client";

function helloWorldSystem(world: World): void {
    for (const [_, buff, variants] of SendInitialPackets.Iter()) {
            replicator_client.apply_full(buff as never, variants as never);
        }
   for (const [_, buf, variants] of SendReliablePacket.Iter()) {
        replicator_client.apply_updates(buf as buffer, variants as undefined)
   } 
   for (const [_, buf, variants] of SendUnreliablePacket.Iter()) {
        replicator_client.apply_updates(buf as buffer, variants as undefined)
   }
}

export = {
    system: helloWorldSystem,
    phase: Phases.Update,
}