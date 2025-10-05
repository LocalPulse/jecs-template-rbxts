import { Scheduler } from "@rbxts/planck";
import PlankJabbyPlugin from "@rbxts/planck-jabby";
import { Plugin as PlanckRunservice } from "@rbxts/planck-runservice";
import { world } from "./world";

export const scheduler = new Scheduler(world)

scheduler.addPlugin(new PlankJabbyPlugin());
scheduler.addPlugin(new PlanckRunservice());