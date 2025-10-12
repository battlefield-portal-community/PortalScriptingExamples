import * as modlib from 'modlib';

function OngoingGlobal_New_Rule(conditionState: any) {
	let newState = true;
	if (!conditionState.update(newState)) {
	 return;
}
	mod.DisplayCustomNotificationMessage(mod.Message("Hello World"),mod.CustomNotificationSlots.HeaderText,0)
}


export function OngoingGlobal() {
const eventInfo = {};
let eventNum = 0;
  OngoingGlobal_New_Rule(modlib.getGlobalCondition(eventNum++));
}


