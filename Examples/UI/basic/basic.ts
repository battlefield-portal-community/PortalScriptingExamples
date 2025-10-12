import { ParseUI } from "modlib";

class SimpleUI {
    rootWidget: mod.UIWidget | undefined;
    width: number = 700;
    height: number = 300;

    bgColor = [1, 1, 1] // RGB
    padding = 4
    
    // state management
    isUIVisible = false;

    constructor() {
        //called when you create an object of this ui.
    }

    show() {
        if (!this.rootWidget)
            this.create();
        if (!this.rootWidget)
            return;

        mod.SetUIWidgetVisible(this.rootWidget, true);
        this.isUIVisible = true;
    }

    hide() {
        if (this.rootWidget) {
            mod.SetUIWidgetVisible(this.rootWidget, false);
            this.isUIVisible = false;
        }     
    }

    create() {
        const UIConfig = {
            type: "Container",
            size: [this.width, this.height],
            position: [0, 100],
            anchor: mod.UIAnchor.TopCenter,
            bgFill: mod.UIBgFill.Solid,
            bgColor: this.bgColor,
            bgAlpha: 1,
            children: [{
                type: "Container",
                position: [0, 0],
                size: [this.width - this.padding, this.height - this.padding],
                anchor: mod.UIAnchor.Center,
                bgFill: mod.UIBgFill.Solid,
                bgColor: [0.1, 0.1, 0.1],
                bgAlpha: 1
            },{
                type: "Text",
                textSize: 72,
                position: [0, 0, 0],
                size: [this.width, 150],
                anchor: mod.UIAnchor.Center,
                textAnchor: mod.UIAnchor.Center,
                bgAlpha: 0,
                textLabel: mod.Message(mod.stringkeys.helloworld),
            }]
        }
        this.rootWidget = ParseUI(UIConfig)
    }
}

export async function OnPlayerDeployed(eventPlayer: mod.Player): Promise<void> {
    const simple_ui = new SimpleUI()
    simple_ui.show();
}