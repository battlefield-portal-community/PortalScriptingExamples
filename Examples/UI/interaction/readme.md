---
title: Handling UI Interaction 
author: Bryan "BWBSoldya" Dijksterhuis
date: 2025/10/12 
version: 1.0.0
draft: false
---

## How to handle UI interaction

When adding UI elements that require interaction, such as buttons, you want the player to actually be able to interact with them. In order to accomplish this we need to know a few things:

### 1. Visible UI Buttons will be interactable immediately

If you have a UI button visible on screen, the player *will* be able to interact with it. They can do so using WASD (or the Arrow Keys) and the Spacebar on Keyboard and Mouse. As of the time of writing this, I am unsure what the inputs on controller are. However, at this point in time the player still has full control over their character, and as such any interaction with the button will also result in the player's character moving or jumping. This is generally speaking undesired behaviour, although if you specifically want this behaviour for an experience, more power to you! 

### 2. In order for the player to be able to interact with the UI properly, we need to take away the control over their character. 

We do this by calling `mod.EnableUIInputMode()`. This function takes 2 parameters: a `boolean` and a `Player` or `Team` object. If the `boolean` is `true`, then the given `Player` or `Team` will lose control over their characters and instead they gain a mouse cursor (on PC) and can freely navigate the UI. 

### 3. In order to give players back control over their character we need to disable UIInputMode again.

You can do this either through some sort of timing system (i.e.: player gets back control after X amount of time), or you can display a button that, once clicked will cancel the UIInputMode and hide all the relevant UI. If you don't do either of these things, the players will not gain control back over their player character until they respawn. 

Disabling the UIInputMode is as simple as passing `false` instead of `true` as the first parameter to the `mod.enableUIInputMode()` function. 

---

The example code provided shows the player 2 buttons in the top center of their screen when they reload their weapon. When they click either button a message pops up in the bottom right stating which button they clicked. There will be another button in the top right with an "X" in it. The player can click this to close the UI and get back control over their character. 

## Closing words

If you are having trouble understanding the script or have any questions, feel free to pop on over to [the official Battlefield Portal Hub Discord](https://discord.gg/8un9qY5AvV) and ask your questions there. 

## See Also

- [The basics of programming in the Portal SDK](../../../Guides/the-basics-of-programming-in-the-portal-sdk/readme.md) - A comprehensive starter guide for programming in the portal SDK.
- [UI Text Guide](../text-guide/readme.md) - A comprehensive text guide that helps you create actual UI elements
- [Basic UI Example](../basic/basic.ts) - Simple UI creation
- [Counter Example](../counter/counter.ts) - Dynamic text updates