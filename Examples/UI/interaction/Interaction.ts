import * as modlib from 'modlib';
let headerWidget: mod.UIWidget | undefined;
let closeWidget: mod.UIWidget | undefined;

export async function OnPlayerDeployed(eventPlayer: mod.Player): Promise<void> {  
    registerCloseButton(eventPlayer);
    registerHeaderButtons(eventPlayer);
    
    await gameLoop(eventPlayer);
}

async function gameLoop(player: mod.Player) { 
    while(true) { 
        if(headerWidget && closeWidget) {
            if(mod.GetSoldierState(player, mod.SoldierStateBool.IsReloading)) { 
                mod.SetUIWidgetVisible(headerWidget, true);
                mod.SetUIWidgetVisible(closeWidget, true);
                mod.EnableUIInputMode(true, player);
            }
        }
        await mod.Wait(0.1);
    }
}

export function OnPlayerUIButtonEvent(player: mod.Player, widget: any, event: any) { 
    const name = mod.GetUIWidgetName(widget);
    switch(name) { 
        case 'button_option_1':
        case 'button_option_2':
        case 'button_close_2': 
            mod.DisplayNotificationMessage(mod.Message("ui.messages.pressed", `ui.buttons.${name}`), player);
            break;
        default: 
            mod.DisplayNotificationMessage(mod.Message("ui.messages.errors.invalid_button"), player);
            break;
    }

    if(name == 'button_close') { 
        if(headerWidget && closeWidget) { 
            mod.EnableUIInputMode(false, player);
            mod.SetUIWidgetVisible(headerWidget, false);
            mod.SetUIWidgetVisible(closeWidget, false);
        }
    }
}

function registerHeaderButtons(player: mod.Player) { 
    const btnOne = getButton('option_1', mod.UIAnchor.TopCenter, [100, 50]);
    const btnTwo = getButton('option_2', mod.UIAnchor.BottomCenter, [100, 50]);
    headerWidget = modlib.ParseUI(
        {
            type: "Container",
            size: [200, 400],
            position: [0, 50],
            name: "header",   
            anchor: mod.UIAnchor.TopCenter,
            bgFill: mod.UIBgFill.Solid,
            bgColor: [0, 0, 0],
            bgAlpha: 1,
            playerId: player,
            visible: false,
            children: [
                btnOne.btn,
                btnOne.label,
                btnTwo.btn,
                btnTwo.label
            ]
        }
    );
}

function registerCloseButton(player: mod.Player) {
    const closeBtn = getButton('close', mod.UIAnchor.TopRight, [50, 50]);
    closeWidget = modlib.ParseUI(
        {
            type: "Container",
            size: [50, 50],
            position: [0, 50],
            name: "close_ui",   
            anchor: mod.UIAnchor.TopRight,
            bgFill: mod.UIBgFill.Solid,
            bgColor: [0, 0, 0],
            bgAlpha: 1,
            playerId: player,
            visible: false,
            children: [
                closeBtn.btn,
                closeBtn.label
            ]
        }
    );
}

function getButton(name: string, anchor: mod.UIAnchor, size: number[]) { 
    return {
        btn: { 
            type: "Button", 
            name: "button_" + name,
            size: size,
            position: [0, 0],
            anchor: anchor,
            bgFill: mod.UIBgFill.Solid,
            bgAlpha: 1,
            buttonEnabled: true,
            buttonColorBase: [0, 0, 0],
        },
        label: { 
            type: "Text",
            parent: "button_" + name,
            name: "button_"+ name + "_label",
            size: size,
            position: [0, 0],
            anchor: anchor,
            bgFill: mod.UIBgFill.None,
            textColor: [1, 1, 1],
            textAnchor: mod.UIAnchor.Center,
            textLabel: mod.Message(`ui.buttons.button_${name}`),
            textSize: 35,
        }
    }
}