# Text and Localization Guide

This guide explains how to properly add text to your UI in Battlefield Portal, including the required strings.json system.

## The Strings System

**CRITICAL RULE**: All static text that appears in your UI **must** be defined in a `.strings.json` file.

### Why Use Strings?

The strings.json system exists for:
- **Localization**: Allows your mode to support multiple languages
- **Consistency**: Centralized text management
- **Dynamic Content**: Easy text updates without code changes

## Basic Setup

### 1. Create Your Strings File

Create a file named `YourMode.strings.json` in the same directory as your `.ts` script.

**Example**: If your script is `zombies.ts`, create `zombies.strings.json`

### 2. Define Your Text Keys

```json
{
  "hello_world": "Hello World",
  "player_name": "Player: {}",
  "score_display": "Score: {} - Wave: {}"
}
```

### 3. Use in TypeScript

```typescript
// Simple text (no variables)
mod.Message(mod.stringkeys.hello_world)

// Text with ONE variable
mod.Message(mod.stringkeys.player_name, playerName)

// Text with MULTIPLE variables
mod.Message(mod.stringkeys.score_display, score, wave)
```

## Complete Example

### strings.json
```json
{
  "points": "Points: ${}",
  "wave": "Wave {}",
  "zombies_remaining": "Zombies: {}",
  "game_over": "GAME OVER",
  "wave_complete": "Wave {} Complete!"
}
```

### TypeScript Usage
```typescript
class PlayerUI {
    pointsWidget: mod.UIWidget | undefined;
    
    createUI(player: mod.Player, points: number) {
        // Creating UI with text from strings
        mod.AddUIText(
            "points_ui",
            mod.CreateVector(50, 50, 0),
            mod.CreateVector(200, 40, 0),
            mod.UIAnchor.TopLeft,
            mod.GetUIRoot(),
            true,
            5,
            mod.CreateVector(0, 0, 0),
            0.7,
            mod.UIBgFill.Blur,
            mod.Message(mod.stringkeys.points, points), // HERE!
            24,
            mod.CreateVector(1, 1, 0),
            1,
            mod.UIAnchor.CenterLeft,
            player
        );
        
        this.pointsWidget = mod.FindUIWidgetWithName("points_ui");
    }
    
    updatePoints(points: number) {
        if (!this.pointsWidget) return;
        
        // Updating UI text
        mod.SetUITextLabel(
            this.pointsWidget, 
            mod.Message(mod.stringkeys.points, points)
        );
    }
}
```

## Helper Function for Messages

Many scripts use a helper function to handle variable numbers of arguments:

```typescript
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

// Usage
MakeMessage(mod.stringkeys.wave_complete, waveNumber);
```

## Using ParseUI Helper (Optional)

ParseUI is a helper function that makes UI creation cleaner. It's not required - you can use the raw `mod.AddUIText()` and `mod.AddUIContainer()` functions directly, but ParseUI saves a lot of repetitive code.

If you want to use ParseUI, you need to copy the full implementation into your script file:

```typescript
// Copy the entire ParseUI function from BombSquad.ts or the text-guide-example.ts

// Then use it like this:
// In strings.json:
// "welcome_message": "Welcome to Zombies Mode!"

const widget = ParseUI({
    type: "Text",
    textSize: 36,
    position: [0, 100, 0],
    size: [600, 50],
    anchor: mod.UIAnchor.TopCenter,
    textAnchor: mod.UIAnchor.Center,
    bgAlpha: 0,
    textLabel: mod.Message(mod.stringkeys.welcome_message),
});
```

### Without ParseUI (Standard Method)

You can create UI directly without ParseUI:

```typescript
// In strings.json:
// "welcome_message": "Welcome to Zombies Mode!"

mod.AddUIText(
    "my_text_widget",
    mod.CreateVector(0, 100, 0),
    mod.CreateVector(600, 50, 0),
    mod.UIAnchor.TopCenter,
    mod.GetUIRoot(),
    true,
    8,
    mod.CreateVector(0, 0, 0),
    0,
    mod.UIBgFill.None,
    mod.Message(mod.stringkeys.welcome_message),
    36,
    mod.CreateVector(1, 1, 1),
    1,
    mod.UIAnchor.Center
);
```

## Common Patterns

### Notifications
```typescript
// strings.json:
// "player_joined": "{} has joined the game"

export function OnPlayerJoinGame(player: mod.Player) {
    let playerName = mod.GetPlayerName(player);
    mod.DisplayNotificationMessage(
        mod.Message(mod.stringkeys.player_joined, playerName)
    );
}
```

### Dynamic Counters
```typescript
// strings.json:
// "timer": "Time Remaining: {}:{}{}"

function updateTimer(minutes: number, seconds: number) {
    let sec1 = Math.floor(seconds / 10);
    let sec2 = Math.floor(seconds % 10);
    
    mod.SetUITextLabel(
        timerWidget,
        mod.Message(mod.stringkeys.timer, minutes, sec1, sec2)
    );
}
```

### World Icons
```typescript
// strings.json:
// "wall_weapon": "M4A1 - $1200"

let worldIcon = mod.GetWorldIcon(301);
mod.SetWorldIconText(
    worldIcon, 
    mod.Message(mod.stringkeys.wall_weapon)
);
```

## Variable Formatting in Strings

Use `{}` as placeholders in your strings.json:

```json
{
  "no_vars": "Simple text",
  "one_var": "Player {} killed a zombie",
  "two_vars": "Wave {} - Score: {}",
  "three_vars": "Time: {}:{}:{}"
}
```

**Important**: Variables are inserted in order. The first `{}` gets the first argument, second `{}` gets the second argument, etc.

## Common Mistakes

### ❌ Wrong: Hardcoded strings
```typescript
mod.AddUIText(
    "my_text",
    position,
    size,
    anchor,
    parent,
    true,
    5,
    bgColor,
    0.7,
    mod.UIBgFill.Blur,
    "Hello World", // DON'T DO THIS
    24,
    textColor,
    1,
    mod.UIAnchor.Center,
    player
);
```

### ✅ Correct: Use strings.json
```typescript
// In strings.json: "hello_world": "Hello World"

mod.AddUIText(
    "my_text",
    position,
    size,
    anchor,
    parent,
    true,
    5,
    bgColor,
    0.7,
    mod.UIBgFill.Blur,
    mod.Message(mod.stringkeys.hello_world), // DO THIS
    24,
    textColor,
    1,
    mod.UIAnchor.Center,
    player
);
```

### ❌ Wrong: String concatenation
```typescript
let message = "Score: " + score; // DON'T DO THIS
```

### ✅ Correct: Use placeholders
```json
// In strings.json
{
  "score": "Score: {}"
}
```
```typescript
let message = mod.Message(mod.stringkeys.score, score); // DO THIS
```

## Organizing Large String Files

For big projects, use underscores or prefixes to organize keys:

```json
{
  "ui_points": "Points: ${}",
  "ui_health": "Health: {}",
  "notif_wave_start": "Wave {} Starting!",
  "notif_wave_end": "Wave {} Complete!",
  "weapon_m4a1": "M4A1 Carbine",
  "weapon_ak47": "AK-47"
}
```

Access normally:
```typescript
mod.Message(mod.stringkeys.ui_points, 500)
mod.Message(mod.stringkeys.notif_wave_start, 5)
mod.Message(mod.stringkeys.weapon_m4a1)
```

## Testing Your Strings

1. **Check the key exists**: TypeScript will auto-complete `mod.stringkeys.`
2. **Test with variables**: Make sure the number of `{}` matches your arguments
3. **Look for typos**: String keys are case-sensitive

## Quick Reference

| Task | Code Example |
|------|-------------|
| Display simple text | `mod.Message(mod.stringkeys.hello)` |
| Display with 1 variable | `mod.Message(mod.stringkeys.score, points)` |
| Display with 2 variables | `mod.Message(mod.stringkeys.wave_info, wave, zombies)` |
| Update UI text | `mod.SetUITextLabel(widget, mod.Message(mod.stringkeys.new_text))` |
| Show notification | `mod.DisplayNotificationMessage(mod.Message(mod.stringkeys.alert))` |

## See Also

- [Basic UI Example](../basic/basic.ts) - Simple UI creation
- [Counter Example](../counter/counter.ts) - Dynamic text updates
- [BombSquad.ts](../../BombSquad.ts) - Complex UI with multiple text elements
- [zombies.ts](../../zombies.ts) - Game mode with extensive text usage
