// update a counter on screen every one second

 import { ParseUI } from "modlib";

class SimpleCounterUI {
    rootWidget: mod.UIWidget | undefined;
    counterText: mod.UIWidget | undefined;
    width: number = 700;
    height: number = 100;

    bgColor = [1, 1, 1] // RGB
    padding = 4
    
    // state management
    isUIVisible = false;
    counter: number | null = 0;

   constructor() {
        //called when you create an object of this ui.
        this.counter = 0;
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
        if (this.counter==null) return;

        this.rootWidget = ParseUI({
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
            }]
        })
        
        // display the counter in UI
        // as we want to update this dynamically 
        // we will define it sepratly and the place it 
        // using the "parent" key.
        this.counterText = ParseUI({
            type: "Text",
            parent: this.rootWidget,
            textSize: 36,
            position: [0, 0, 0],
            size: [this.width, 50],
            anchor: mod.UIAnchor.Center,
            textAnchor: mod.UIAnchor.Center,
            bgAlpha: 0,
            textLabel: mod.Message(mod.stringkeys.counter, this.counter),
        })
    }

    update() {
        if (!this.counterText) return;
        if (!this.counter) return
        mod.SetUITextLabel(this.counterText, mod.Message(mod.stringkeys.counter, this.counter) )
    }
}

export async function OnPlayerDeployed(eventPlayer: mod.Player): Promise<void> {
    const simple_ui = new SimpleCounterUI()
    simple_ui.counter = 0
    simple_ui.show();
    while (true) {
        simple_ui.update()
        await mod.Wait(1) // this is important
        simple_ui.counter += 1

    }
}