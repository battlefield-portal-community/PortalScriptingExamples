// text-guide-example.ts
// Demonstrates proper text usage with strings.json

import { ParseUI } from "modlib";

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
            mod.Message(mod.stringkeys.level_up, this.level),
            this.player
        );
    }
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