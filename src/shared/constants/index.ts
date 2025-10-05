import { RunService } from "@rbxts/services";

export const constants = table.freeze({
    IS_SERVER: RunService.IsServer(),
});