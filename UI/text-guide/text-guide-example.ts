// text-guide-example.ts
// Demonstrates proper text usage with strings.json

//-----------------------------------------------------------------------------------------------//
// ParseUI Helper Functions - Makes UI creation much easier (not required, but saves a lot of code)
//-----------------------------------------------------------------------------------------------//

type UIVector = mod.Vector | number[];

interface UIParams {
    name: string;
    type: string;
    position: any;
    size: any;
    anchor: mod.UIAnchor;
    parent: mod.UIWidget;
    visible: boolean;
    textLabel: string;
    textColor: UIVector;
    textAlpha: number;
    textSize: number;
    textAnchor: mod.UIAnchor;
    padding: number;
    bgColor: UIVector;
    bgAlpha: number;
    bgFill: mod.UIBgFill;
    imageType: mod.UIImageType;
    imageColor: UIVector;
    imageAlpha: number;
    teamId?: mod.Team;
    playerId?: mod.Player;
    children?: any[];
    buttonEnabled: boolean;
}

function __asModVector(param: number[]|mod.Vector) {
    if (Array.isArray(param))
        return mod.CreateVector(param[0], param[1], param.length == 2 ? 0 : param[2]);
    else
        return param;
}

function __asModMessage(param: string|mod.Message) {
    if (typeof (param) === "string")
        return mod.Message(param);
    return param;
}

function __fillInDefaultArgs(params: UIParams) {
    if (!params.hasOwnProperty('name'))
        params.name = "";
    if (!params.hasOwnProperty('position'))
        params.position = mod.CreateVector(0, 0, 0);
    if (!params.hasOwnProperty('size'))
        params.size = mod.CreateVector(100, 100, 0);
    if (!params.hasOwnProperty('anchor'))
        params.anchor = mod.UIAnchor.TopLeft;
    if (!params.hasOwnProperty('parent'))
        params.parent = mod.GetUIRoot();
    if (!params.hasOwnProperty('visible'))
        params.visible = true;
    if (!params.hasOwnProperty('padding'))
        params.padding = (params.type == "Container") ? 0 : 8;
    if (!params.hasOwnProperty('bgColor'))
        params.bgColor = mod.CreateVector(0.25, 0.25, 0.25);
    if (!params.hasOwnProperty('bgAlpha'))
        params.bgAlpha = 0.5;
    if (!params.hasOwnProperty('bgFill'))
        params.bgFill = mod.UIBgFill.Solid;
}

function __setNameAndGetWidget(uniqueName: any, params: any) {
    let widget = mod.FindUIWidgetWithName(uniqueName) as mod.UIWidget;
    mod.SetUIWidgetName(widget, params.name);
    return widget;
}

const __cUniqueName = "----uniquename----";

function __addUIContainer(params: UIParams) {
    __fillInDefaultArgs(params);
    let restrict = params.teamId ?? params.playerId;
    if (restrict) {
        mod.AddUIContainer(__cUniqueName,
            __asModVector(params.position),
            __asModVector(params.size),
            params.anchor,
            params.parent,
            params.visible,
            params.padding,
            __asModVector(params.bgColor),
            params.bgAlpha,
            params.bgFill,
            restrict);
    } else {
        mod.AddUIContainer(__cUniqueName,
            __asModVector(params.position),
            __asModVector(params.size),
            params.anchor,
            params.parent,
            params.visible,
            params.padding,
            __asModVector(params.bgColor),
            params.bgAlpha,
            params.bgFill);
    }
    let widget = __setNameAndGetWidget(__cUniqueName, params);
    if (params.children) {
        params.children.forEach((childParams: any) => {
            childParams.parent = widget;
            __addUIWidget(childParams);
        });
    }
    return widget;
}

function __fillInDefaultTextArgs(params: UIParams) {
    if (!params.hasOwnProperty('textLabel'))
        params.textLabel = "";
    if (!params.hasOwnProperty('textSize'))
        params.textSize = 0;
    if (!params.hasOwnProperty('textColor'))
        params.textColor = mod.CreateVector(1, 1, 1);
    if (!params.hasOwnProperty('textAlpha'))
        params.textAlpha = 1;
    if (!params.hasOwnProperty('textAnchor'))
        params.textAnchor = mod.UIAnchor.CenterLeft;
}

function __addUIText(params: UIParams) {
    __fillInDefaultArgs(params);
    __fillInDefaultTextArgs(params);
    let restrict = params.teamId ?? params.playerId;
    if (restrict) {
        mod.AddUIText(__cUniqueName,
            __asModVector(params.position),
            __asModVector(params.size),
            params.anchor,
            params.parent,
            params.visible,
            params.padding,
            __asModVector(params.bgColor),
            params.bgAlpha,
            params.bgFill,
            __asModMessage(params.textLabel),
            params.textSize,
            __asModVector(params.textColor),
            params.textAlpha,
            params.textAnchor,
            restrict);
    } else {
        mod.AddUIText(__cUniqueName,
            __asModVector(params.position),
            __asModVector(params.size),
            params.anchor,
            params.parent,
            params.visible,
            params.padding,
            __asModVector(params.bgColor),
            params.bgAlpha,
            params.bgFill,
            __asModMessage(params.textLabel),
            params.textSize,
            __asModVector(params.textColor),
            params.textAlpha,
            params.textAnchor);
    }
    return __setNameAndGetWidget(__cUniqueName, params);
}

function __addUIWidget(params: UIParams) {
    if (params == null)
        return undefined;
    if (params.type == "Container")
        return __addUIContainer(params);
    else if (params.type == "Text")
        return __addUIText(params);
    return undefined;
}

function ParseUI(...params: any[]) {
    let widget: mod.UIWidget|undefined;
    for (let a = 0; a < params.length; a++) {
        widget = __addUIWidget(params[a] as UIParams);
    }
    return widget;
}

//-----------------------------------------------------------------------------------------------//
// END ParseUI Helper Functions
//-----------------------------------------------------------------------------------------------//

// Helper function to handle variable arguments
function MakeMessage(message: string, ...args: any[]) {
    switch (args.length) {
        case 0:
            return mod.Message(message);
        case 1:
            return mod.Message(message, args[0]);
        case 2:
            return mod.Message(message, args[0], args[1]);
        case 3:
            return mod.Message(message, args[0], args[1], args[2]);
        default:
            return mod.Message(message);
    }
}

class TextExampleUI {
    rootWidget: mod.UIWidget | undefined;
    simpleTextWidget: mod.UIWidget | undefined;
    dynamicTextWidget: mod.UIWidget | undefined;
    multiVarWidget: mod.UIWidget | undefined;
    
    player: mod.Player;
    score: number = 0;
    level: number = 1;
    
    constructor(player: mod.Player) {
        this.player = player;
    }
    
    show() {
        if (!this.rootWidget) {
            this.create();
        }
        if (!this.rootWidget) return;
        
        mod.SetUIWidgetVisible(this.rootWidget, true);
    }
    
    hide() {
        if (this.rootWidget) {
            mod.SetUIWidgetVisible(this.rootWidget, false);
        }
    }
    
    create() {
        // Main container
        this.rootWidget = ParseUI({
            type: "Container",
            size: [400, 300],
            position: [0, 100],
            anchor: mod.UIAnchor.TopCenter,
            bgFill: mod.UIBgFill.Blur,
            bgColor: [0, 0, 0],
            bgAlpha: 0.8
        });
        
        if (!this.rootWidget) return;
        
        // Example 1: Simple static text (no variables)
        this.simpleTextWidget = ParseUI({
            type: "Text",
            parent: this.rootWidget,
            textSize: 24,
            position: [10, 10, 0],
            size: [380, 40],
            anchor: mod.UIAnchor.TopLeft,
            textAnchor: mod.UIAnchor.CenterLeft,
            bgAlpha: 0,
            // Uses: "title": "Text Examples Demo" from strings.json
            textLabel: mod.Message(mod.stringkeys.title)
        });
        
        // Example 2: Text with ONE variable
        this.dynamicTextWidget = ParseUI({
            type: "Text",
            parent: this.rootWidget,
            textSize: 20,
            position: [10, 60, 0],
            size: [380, 40],
            anchor: mod.UIAnchor.TopLeft,
            textAnchor: mod.UIAnchor.CenterLeft,
            bgAlpha: 0,
            textColor: [1, 1, 0],
            // Uses: "score_display": "Score: {}" from strings.json
            textLabel: mod.Message(mod.stringkeys.score_display, this.score)
        });
        
        // Example 3: Text with MULTIPLE variables
        this.multiVarWidget = ParseUI({
            type: "Text",
            parent: this.rootWidget,
            textSize: 20,
            position: [10, 110, 0],
            size: [380, 40],
            anchor: mod.UIAnchor.TopLeft,
            textAnchor: mod.UIAnchor.CenterLeft,
            bgAlpha: 0,
            textColor: [0, 1, 1],
            // Uses: "level_and_score": "Level {} - Score: {}" from strings.json
            textLabel: mod.Message(mod.stringkeys.level_and_score, this.level, this.score)
        });
    }
    
    // Update dynamic text
    updateScore(newScore: number) {
        this.score = newScore;
        
        if (this.dynamicTextWidget) {
            mod.SetUITextLabel(
                this.dynamicTextWidget,
                mod.Message(mod.stringkeys.score_display, this.score)
            );
        }
        
        if (this.multiVarWidget) {
            mod.SetUITextLabel(
                this.multiVarWidget,
                mod.Message(mod.stringkeys.level_and_score, this.level, this.score)
            );
        }
    }
    
    levelUp() {
        this.level++;
        
        if (this.multiVarWidget) {
            mod.SetUITextLabel(
                this.multiVarWidget,
                mod.Message(mod.stringkeys.level_and_score, this.level, this.score)
            );
        }
        
        // Show notification using MakeMessage helper
        mod.DisplayNotificationMessage(
            MakeMessage(mod.stringkeys.level_up, this.level),
            this.player
        );
    }
}

// Example: World Icon text
function setupWorldIcon() {
    let icon = mod.GetWorldIcon(100);
    
    // Simple text on world icon
    mod.SetWorldIconText(
        icon,
        mod.Message(mod.stringkeys.pickup_here)
    );
    
    // Text with variable (cost)
    let cost = 1000;
    mod.SetWorldIconText(
        icon,
        mod.Message(mod.stringkeys.weapon_cost, cost)
    );
}

// Example: Notifications with different variable counts
function showNotificationExamples(player: mod.Player) {
    // No variables
    mod.DisplayNotificationMessage(
        mod.Message(mod.stringkeys.game_started),
        player
    );
    
    // One variable - use player object directly
    mod.DisplayNotificationMessage(
        mod.Message(mod.stringkeys.player_joined, player),
        player
    );
    
    // Multiple variables
    let wave = 5;
    let enemies = 20;
    mod.DisplayNotificationMessage(
        mod.Message(mod.stringkeys.wave_info, wave, enemies),
        player
    );
}

// Example: Using helper function for cleaner code
function updateTimer(widget: mod.UIWidget, minutes: number, seconds: number) {
    let sec1 = Math.floor(seconds / 10);
    let sec2 = Math.floor(seconds % 10);
    
    // Uses helper function to avoid repetitive switch statements
    mod.SetUITextLabel(
        widget,
        MakeMessage(mod.stringkeys.timer, minutes, sec1, sec2)
    );
}

// Main game loop example
export async function OnPlayerDeployed(player: mod.Player) {
    let ui = new TextExampleUI(player);
    ui.show();
    
    // Simulate score increasing
    let counter = 0;
    while (counter < 100) {
        await mod.Wait(1);
        counter++;
        
        ui.updateScore(counter * 10);
        
        // Level up every 25 points
        if (counter % 25 === 0) {
            ui.levelUp();
        }
    }
}

// Example: Handling player interactions
export function OnPlayerInteract(player: mod.Player, interactPoint: mod.InteractPoint) {
    let pointId = mod.GetObjId(interactPoint);
    
    // Show message based on what was interacted with
    if (pointId === 100) {
        mod.DisplayNotificationMessage(
            mod.Message(mod.stringkeys.door_opened),
            player
        );
    } else if (pointId === 200) {
        let cost = 500;
        mod.DisplayNotificationMessage(
            mod.Message(mod.stringkeys.not_enough_points_for, cost),
            player
        );
    }
}
