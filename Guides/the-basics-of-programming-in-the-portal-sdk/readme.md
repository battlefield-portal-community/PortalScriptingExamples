---
title: The Basics of Programming in the Battlefield 6 Portal SDK
author: Bryan "BWBSoldya" Dijksterhuis
date: 2025/10/12 
version: 1.0.0
draft: false
---

# The Basics of Programming in the Battlefield 6 Portal SDK

## Intro

Hi! Welcome to a quick introductory guide on the basics of programming in the Battlefield 6 Portal SDK. In this guide I'll go over a few fundamentals on how you can get started coding your own experiences from scratch. 

It is important to note that this is by no means a comprehensive guide. This is also not a guide on writing TypeScript, the programming language used in the SDK. If you are new to the language, please refer to the official [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/intro.html#get-started) for a beginner guide. 

## Prerequisites 
This guide assumes you have the following: 
- The Portal SDK downloaded on your PC. You can find this on the [Portal Experiences](https://portal.battlefield.com/bf6/experiences) page
- A code editor. Use whatever you are comfortable with, I as the author am using [VSCode](https://code.visualstudio.com/).

## Getting started 
So you have the Portal SDK downloaded, extracted, and you've opened your editor of choice. Now what? Start off by opening the folder you have extracted your Portal SDK to. In VSCode you can do this by clicking `File` -> `Open Folder...` or `File` -> `Add Folder to Workspace` if you intend on coming back to this frequently. 

Once the folder is opened, using the file explorer, you will find a bunch of different sub folders and files. Most of these we don't need. The ones we care about are as follows: 
```
├─ code/
│  ├─ mod/
│  |  └─ index.d.ts
|  └─ modlib/
│     └─ index.ts
├─ mods/
│  └─ _StartHere_BasicTemplate
|     └─ BasicTemplate.ts
├─ README.html
└─ tsconfig.json
```

### Understanding the SDK

Let's go item by item, starting with the files in the root of the project. 

---

#### `README.html`

The README.html is a file you can open with your webbrowser of choice (Chrome, Firefox, Microsoft Edge, Safari, etc.). This contains the documentation that we have for the SDK. As of the time of writing, this documentation is a bit sparse, hence the creation of this Wiki and these guides. 

Having said that, the README still contains some very valuable information. Please do read through this to get a basic understanding of the GoDot side of things. 

---

#### `tsconfig.json`

If you're familiar with TypeScript at all, you will recognize this file as the configuration file that TypeScript uses to build scripts. In this case however the Portal SDK does not require any building whatsoever. The Portal rules editor will automaticall transpile your uploaded `.ts`; the local tsconfig.json only helps your editor provide IntelliSense.

---

#### `/code/mod/index.d.ts`

This file is our core library. It contains all of the functions and type definitions that we can use to interface with the game. If something is not in this file, then we cannot change it in the game. 

---

#### `/code/modlib/index.ts`

The modlib is a relatively small wrapper around the core library. It is intended to make developing stuff with the core library a little easier. The file is a part of the official SDK and can be used in your code, but beware it is not a super extensive wrapper as of the time of this writing, so you will have to delve into the `/code/mod/index.d.ts` quite a bit. 

---

#### `/mods`

This folder contains all of the "mods", a.k.a. the  "experiences" you create. By default DICE gives us a bunch of experiences we can use to reverse-engineer and see how things work, and they also give us a basic starter template with some more documentation. 

---

#### `/mods/_StartHere_BasicTemplate/BasicTemplate.ts`

Personally I wouldn't call this whole folder a *basic template*, as this seems to be missing a few components. However, this file in particular does give us a bit more documentation that is absent from the `README.html` and the `/code/mod/index.d.ts`. The file gives us clearly commented explanation of various events happening in the game, and it gives us some basic commands that you might want to refer to frequently or semi-frequently while learning. 

---

### Creating your own experience

Now that we have a basic understanding of the files provided to us, how do we actually go and make our own experience? For the purposes of this exercise, I am going to use the `/mods/` folder as the place to develop our experience from. Technically speaking you could develop the code wherever you want. It is not required to do it in the `/mods/` folder, but it is nice to keep these things in the same place. 

We will be creating a very simple experience that just pop's up a message in the bottom right hand corner of your screen when you deploy to tell you good luck and have fun this life. It's just a simple introductory script, nothing fancy but it will give you a basic idea of what it's like to work in the Portal SDK.

#### Step 1. Create a new folder 

Go ahead and create a new folder inside of the `/mods/` folder. For the sake of this guide I'm going to call it `HelloWorld`. The name of the folder is largely irrelevant, seeing as we will be uploading our *script* to the Portal website, not this folder. However it is nice to keep naming consistent with the example projects. 

#### Step 2. Create your `.ts` file. 

Inside of your newly created folder, make a new file and give it the extension `.ts`. The name of this file is, again, largely irrelevant, though if we look at the other examples in the `/mods/` folder, we will see that the authors of those experiences kept the name the same between the folder and the `.ts` file. As such I shall name mine `HelloWorld.ts`.

This is the file you will end up uploading to the official Portal website. 

#### Step 3. Create your `.strings.json` file. 

This is a file we haven't discussed yet, but is very important. This is a JSON file, it is a file that contains a basic structure. For more info, check the official [JSON website](https://www.json.org/json-en.html). 

The sole purpose of this file is to define **any** strings you want to display on screen to the player. If you want to show a bit of text on a UI element, or you want to send out a notification, the text for those notifications will have to be put in here. Just like our `.ts` file, we want to keep naming consistent and as such we will name our `.strings.json` file `HelloWorld.strings.json`.

Just like our `.ts` file, you will end up uploading this to the Portal website. 

#### Step 4. Copy over a `tsconfig.json`

Programming is all about making life easier for yourself, and right now we need a `tsconfig.json` to help our code editor make sense of the `modlib`. But why do all that hard work when others have already done it for us. Just go into one of the default experiences provided to use by DICE inside of the `/mods/` folder and copy their `tsconfig.json` into your own mod folder. 

---

With that done we should have the following setup: 
```
├─ code/
│  ├─ mod/
│  |  └─ index.d.ts
|  └─ modlib/
│     └─ index.ts
├─ mods/
│  └─ HelloWorld
|     ├─ HelloWorld.strings.json
|     ├─ HelloWorld.ts
|     └─ tsconfig.json
└─ tsconfig.json
```

Now we can start on the real work.

---

#### Step 5. Setting up our `HelloWorld.strings.json` 

Let's open our `HelloWorld.strings.json` file and let's start off with the basics of a json file:
```json
{ 

}
```

Easy right? Well, we do actually need to put stuff in here. Thinking ahead, we want to pop up a message, and as I explained in the creation of our `.strings.json` file, we need to define any text we want to show to the player in the game. Now we are going to need a *key* and a *value*. Think of these are the "Marco Polo" game. If someone yells out "Key!", you yell back "Value!". So if our key is "hello" and our value is "world", then every time you refer to "hello", the program will return "world".

```json
{ 
    "goodLuckMessage": "Good luck & have fun {}!"
}
```

Here's the code I ended up going with, and there's a few things going on here, so let's break them down. 

First off the key, why is it all one word with capitalization? Well that realy comes down to good programming practice. Keys are usually used as *unique identifiers*, meaning they need to be unique, but they also shouldn't generally include spaces or any weird symbols. You basically only want to use the Latin alphabet characters, excluding space, symbols or numbers. Now you *could* write it as "goodluckmessage", which would be fine, as it adheres to all of those rules, but for readability sake we usually capitalize the first letter of each individual word in the key. 

Secondly, what's up with the value using it's own set of braces (`{}`)? The braces in the value of of a string are a placeholder for a dynamic value that you calculate inside of your script. Don't worry if that doesn't make much sense yet, I'll get to that when I explain the script. For now, just imagine that `{}` in the particular case actually means the player's name. 

That's all we need in this document for now! Sometimes it's just that simple.

---

#### Step 6. Setting up our `HelloWorld.ts`

Ahh the main bread and butter of our experience. For this we're gonna keep the code as simple as possible, I'll go over all of the important details that you need to know, but I am going to ignore some of the more basic TypeScript coding keywords. If you don't quite understand what something means and I've not explained it here, please do refer back to the [TypeScript documentation ](https://www.typescriptlang.org/docs/handbook/intro.html#get-started).

This is going to be our final code: 
```ts
export async function OnPlayerDeployed(eventPlayer: mod.Player): Promise<void> { 
    const message = mod.Message(mod.stringkeys.goodLuckMessage, eventPlayer);
    mod.DisplayNotificationMessage(message, eventPlayer);
}
```

Let's break it down. 

```ts
OnPlayerDeployed(eventPlayer: mod.Player): Promise<void>
``` 
This is one of the Event hooks that is exposed to us by the `/code/mod/index.d.ts`. It gets called whenever a player gets deployed. It returns nothing, but because we run this function asynchronously that needs to be wrapped inside of a Promise. 

Note for the advanced users following along: The event handlers in `/code/mod/index.d.ts` are defined as synchronous, but the Portal runtime will happily await async functions. You can safely mark them as async if your logic needs to await something.

The function takes a variable called `eventPlayer` which is of type `mod.Player`. This is our first reference to `mod.` so let me explain it.

`mod.` refers to the namespace underwhich the entire Portal SDK is exported by DICE. Everything in our `/code/mod/index.d.ts` library is underneath that `mod` namespace, so accessing any types, functions or anything else, requires that `mod` namespace prefix. "But we never imported the `mod` namespace, how can we use it?". That's what our `tsconfig.json` files are for. They give us the reference to that `mod` namespace so our IntelliSense doesn't complain. But when we upload our `.ts` file, the Portal SDK itself also has these references built in. Meaning you don't have to worry about importing the `/code/mod/index.d.ts` anywhere. (Note for those of you a bit more advanced already and following along, this does *not* count for the `/code/modlib/index.ts`, we do still need to import that manually). 

---

```ts 
const message = mod.Message(mod.stringkeys.goodLuckMessage, eventPlayer);
```
This is where we start building our actual message. What is it that we want to display on screen? It's the string we added into the `HelloWorld.strings.json` file in the previous step. We gain access to any keys inside of that JSON file through the `mod.stringkeys` variable. Alternatively if you don't like this syntax, you can omit the `mod.stringkeys.` and put the key itself in quotes, i.e.: `"goodLuckMessage"`. The SDK will resolve this automatically and it works fine. Note for the advanced users following along: Yes, JavaScript dot notation works with accessing sub keys in the `.strings.json` file. Both `mod.stringkeys.messages.popups.goodLuck` and `"messages.popups.goodLuck"` would work, provided those objects exist. 

The second parameter of the mod.Message is any placeholder values you might want to pass along. You can pass up to 3 placeholder values. These are the values that will replace those braces (`{}`) we put in the value inside of our `HelloWorld.strings.json` file. Please note: The placeholder system is strictly positional: the first {} in the string will be replaced by the first parameter you pass after the key, and so on.

---

```ts
mod.DisplayNotificationMessage(message, eventPlayer)
```

This is where take the message we have built, and we actually output it to the screen. The DisplayNotificationMessage is a default function of the Portal SDK and it takes a Message object (our `mod.Message`), and a target who you want to show it to. This can either be a Player object (like in our case) or a Team object, if you want to show the entire team. 

This function will display a notification message in the bottom right of the player's screen for 6 seconds. At the time of writing the `/code/mod/index.d.ts` file says that it shows the message in the top right, but in my testing it shows it in the bottom right, rour mileage may vary. 

---

#### Step 7. Uploading our work and testing it 

That's it folks! Our first script done. Now let's test and upload. First off, load up the official [Portal site](https://portal.battlefield.com/bf6/experiences) in your browser. Now click on the "Create new" button. When it asks you to choose a game mode, select "Portal Custom" and then "Default". Click on "Start Editing". If you want to mess with Mode, Map Rotation, Teams, Modifiers (note: Hiding the HUD will also hide these messages) and Restriction settings, go right ahead and do so, but I'm skipping straight to Rules Editor and then "Script". Here we will click on the "Create new Script file" and "Create new Strings file". 

Now go back to your code editor and select the contents of the `HelloWorld.strings.json` file, copy it and paste it into the `Strings.json` file you just created on the Portal website. Do the same thing for the `HelloWorld.ts` file and the `Script.ts` that was created. 

Now click save to save your custom experience. Give it a name, a description and select an image (Step 2 in the Publish section). Once it is saved it's time to start up the game. 

Load up the game and enter the main menu. Go to community and click on "Browse Servers". Now click on "Host" and then wait for your experience to show up. Note: if you don't see your experience listed, back out of the host menu and open it again. It might take a few tries as it sometimes takes a few minutes for a new experience to show up. If you plan to iterate on your experience (which I highly recommend), I would suggest editing an existing experience, as saving an existing experience is nearly instantanously. 

Finally scroll down to the bottom and click on "Host Locally" to instantly spin up a server. Once you have joined, click on deploy and you should see a message appear in the bottom right of your screen saying "Good luck & have fun <your username>!". 

---

## Next steps 

That's it folks, your first custom experience using the Portal SDK and coding. From here you can explore further into the depths of the `/code/mod/index.d.ts` or delve into one of the preset mods that DICE gives you to see how they do things. It does get a lot more complex for some of those, but they are valuable learning tools, and they are how we, the Portal SDK community are reverse engineering the portal experience at the time of this writing.

Check out some of the other guides on this wiki and if you have any questions, we have a [Discord Server](https://discord.gg/8un9qY5AvV) with a lot of very knowledgeable and helpful people. Hope to see you again soon! 

## See Also

- [UI Text Guide](../../Examples//UI//text-guide/readme.md) - A comprehensive text guide that helps you create actual UI elements
- [Basic UI Example](../../Examples/UI/basic/basic.ts) - Simple UI creation
- [Counter Example](../../Examples/UI/counter/counter.ts) - Dynamic text updates