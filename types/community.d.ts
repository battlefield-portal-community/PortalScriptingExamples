declare global {

        export function OngoingGlobal(): void;

        export function OngoingAreaTrigger(eventAreaTrigger: mod.AreaTrigger): void;

        export function OngoingCapturePoint(eventCapturePoint: mod.CapturePoint): void;

        export function OngoingEmplacementSpawner(eventEmplacementSpawner: mod.EmplacementSpawner): void;

        export function OngoingHQ(eventHQ: mod.HQ): void;

        export function OngoingInteractPoint(eventInteractPoint: mod.InteractPoint): void;

        export function OngoingMCOM(eventMCOM: mod.MCOM): void;

        export function OngoingPlayer(eventPlayer: mod.Player): void;

        export function OngoingScreenEffect(eventScreenEffect: mod.ScreenEffect): void;

        export function OngoingSector(eventSector: mod.Sector): void;

        export function OngoingSpawner(eventSpawner: mod.Spawner): void;

        export function OngoingSpawnPoint(eventSpawnPoint: mod.SpawnPoint): void;

        export function OngoingTeam(eventTeam: mod.Team): void;

        export function OngoingVehicle(eventVehicle: mod.Vehicle): void;

        export function OngoingVehicleSpawner(eventVehicleSpawner: mod.VehicleSpawner): void;

        export function OngoingWaypointPath(eventWaypointPath: mod.WaypointPath): void;

        export function OngoingWorldIcon(eventWorldIcon: mod.WorldIcon): void;

        // This will trigger when an AI Soldier stops trying to reach a destination.
        export function OnAIMoveToFailed(eventPlayer: mod.Player): void;

        // This will trigger when an AI Soldier starts moving to a target location.
        export function OnAIMoveToRunning(eventPlayer: mod.Player): void;

        // This will trigger when an AI Soldier reaches target location.
        export function OnAIMoveToSucceeded(eventPlayer: mod.Player): void;

        // This will trigger when an AI Soldier parachute action is running.
        export function OnAIParachuteRunning(eventPlayer: mod.Player): void;

        // This will trigger when an AI Soldier parachute action has succeeded.
        export function OnAIParachuteSucceeded(eventPlayer: mod.Player): void;

        // This will trigger when an AI Soldier stops following a waypoint.
        export function OnAIWaypointIdleFailed(eventPlayer: mod.Player): void;

        // This will trigger when an AI Soldier starts following a waypoint.
        export function OnAIWaypointIdleRunning(eventPlayer: mod.Player): void;

        // This will trigger when an AI Soldier finishes following a waypoint.
        export function OnAIWaypointIdleSucceeded(eventPlayer: mod.Player): void;

        // This will trigger when a team takes control of a CapturePoint.
        export function OnCapturePointCaptured(eventCapturePoint: mod.CapturePoint): void;

        // This will trigger when a team begins capturing a CapturePoint.
        export function OnCapturePointCapturing(eventCapturePoint: mod.CapturePoint): void;

        // This will trigger when a team loses control of a CapturePoint.
        export function OnCapturePointLost(eventCapturePoint: mod.CapturePoint): void;

        // This will trigger when the gamemode ends.
        export function OnGameModeEnding(): void;

        // This will trigger at the start of the gamemode.
        export function OnGameModeStarted(): void;

        // This will trigger when a Player is forced into the mandown state.
        export function OnMandown(eventPlayer: mod.Player, eventOtherPlayer: mod.Player): void;

        // This will trigger when a MCOM is armed.
        export function OnMCOMArmed(eventMCOM: mod.MCOM): void;

        // This will trigger when a MCOM is defused.
        export function OnMCOMDefused(eventMCOM: mod.MCOM): void;

        // This will trigger when a MCOM detonates.
        export function OnMCOMDestroyed(eventMCOM: mod.MCOM): void;

        // This will trigger when a Player takes damage.
        export function OnPlayerDamaged(
            eventPlayer: mod.Player,
            eventOtherPlayer: mod.Player,
            eventDamageType: mod.DamageType,
            eventWeaponUnlock: mod.WeaponUnlock
        ): void;

        // This will trigger whenever a Player deploys.
        export function OnPlayerDeployed(eventPlayer: mod.Player): void;

        // This will trigger whenever a Player dies.
        export function OnPlayerDied(
            eventPlayer: mod.Player,
            eventOtherPlayer: mod.Player,
            eventDeathType: mod.DeathType,
            eventWeaponUnlock: mod.WeaponUnlock
        ): void;

        // This will trigger when a Player earns a kill against another Player.
        export function OnPlayerEarnedKill(
            eventPlayer: mod.Player,
            eventOtherPlayer: mod.Player,
            eventDeathType: mod.DeathType,
            eventWeaponUnlock: mod.WeaponUnlock
        ): void;

        // This will trigger when a Player earns a kill assist.
        export function OnPlayerEarnedKillAssist(eventPlayer: mod.Player, eventOtherPlayer: mod.Player): void;

        // This will trigger when a Player enters an AreaTrigger.
        export function OnPlayerEnterAreaTrigger(eventPlayer: mod.Player, eventAreaTrigger: mod.AreaTrigger): void;

        // This will trigger when a Player enters a CapturePoint capturing area.
        export function OnPlayerEnterCapturePoint(eventPlayer: mod.Player, eventCapturePoint: mod.CapturePoint): void;

        // This will trigger when a Player enters a Vehicle seat.
        export function OnPlayerEnterVehicle(eventPlayer: mod.Player, eventVehicle: mod.Vehicle): void;

        // This will trigger when a Player enters a Vehicle seat.
        export function OnPlayerEnterVehicleSeat(
            eventPlayer: mod.Player,
            eventVehicle: mod.Vehicle,
            eventSeat: mod.Object
        ): void;

        // This will trigger when a Player exits an AreaTrigger.
        export function OnPlayerExitAreaTrigger(eventPlayer: mod.Player, eventAreaTrigger: mod.AreaTrigger): void;

        // This will trigger when a Player exits a CapturePoint capturing area.
        export function OnPlayerExitCapturePoint(eventPlayer: mod.Player, eventCapturePoint: mod.CapturePoint): void;

        // This will trigger when a Player exits a Vehicle.
        export function OnPlayerExitVehicle(eventPlayer: mod.Player, eventVehicle: mod.Vehicle): void;

        // This will trigger when a Player exits a Vehicle seat.
        export function OnPlayerExitVehicleSeat(
            eventPlayer: mod.Player,
            eventVehicle: mod.Vehicle,
            eventSeat: mod.Object
        ): void;

        // This will trigger when a Player interacts with InteractPoint.
        export function OnPlayerInteract(eventPlayer: mod.Player, eventInteractPoint: mod.InteractPoint): void;

        // This will trigger when a Player joins the game.
        export function OnPlayerJoinGame(eventPlayer: mod.Player): void;

        // This will trigger when any player leaves the game.
        export function OnPlayerLeaveGame(eventNumber: number): void;

        // This will trigger when a Player changes team.
        export function OnPlayerSwitchTeam(eventPlayer: mod.Player, eventTeam: mod.Team): void;

        // This will trigger when a Player interacts with an UI button.
        export function OnPlayerUIButtonEvent(
            eventPlayer: mod.Player,
            eventUIWidget: mod.UIWidget,
            eventUIButtonEvent: mod.UIButtonEvent
        ): void;

        // This will trigger when the Player dies and returns to the deploy screen.
        export function OnPlayerUndeploy(eventPlayer: mod.Player): void;

        // This will trigger when a Raycast hits a target.
        export function OnRayCastHit(eventPlayer: mod.Player, eventPoint: mod.Vector, eventNormal: mod.Vector): void;

        // This will trigger when a Raycast is called and doesn't hit any target.
        export function OnRayCastMissed(eventPlayer: mod.Player): void;

        // This will trigger when a Player is revived by another Player.
        export function OnRevived(eventPlayer: mod.Player, eventOtherPlayer: mod.Player): void;

        // This will trigger when an AISpawner spawns an AI Soldier.
        export function OnSpawnerSpawned(eventPlayer: mod.Player, eventSpawner: mod.Spawner): void;

        // This will trigger when the gamemode time limit has been reached.
        export function OnTimeLimitReached(): void;

        // This will trigger when a Vehicle is destroyed.
        export function OnVehicleDestroyed(eventVehicle: mod.Vehicle): void;

        // This will trigger when a Vehicle is called into the map.
        export function OnVehicleSpawned(eventVehicle: mod.Vehicle): void;
}

export { };