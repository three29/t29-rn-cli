# T29 React-Native Boilerplate

## Battle-tested React Native boilerplate

Original concept of this boilerplate is from [Ignite](https://github.com/infinitered/ignite). We're really like the project structure from Ignite Boilerplate But we wanted to do things a little different. this Boilerplate will not create a new project based off of a template. Instead it will create a brand new React-Native app, then copy in the folder structure and install all the lastest version of the dependancies.

## Tech Stack

T29-RN include the following rock-solid technical decisions out of the box:

- React Native
- React Navigation 5
- OsmiCSX
- Reactotron-ready
- React Native Dotenv
- TDD-ready (COMMING SOON)
- And more!

## Quick Start

Prerequisites:

- Make sure you already setup React Native environtment (Android SDK, Java, etc.). [See React Native docs](https://reactnative.dev/docs/environment-setup)

Install Global CLI: (COMING SOON)

- Until the package is publish to the npm repository, you can download the repo. Cd into the repo directory and `npm install`. Then run `npm link` to install the package globally. If you want to remove the package you have run `npm unlink` from within the repo directory.

Run the CLI:

```sh
rn new MyApp
```

you can overwrite a directory by adding the `--overwrite` flag. More flags will be added over time.

there are mulitple alias for creating a new app you can use `create, create-app, new`.

And T29-RN will walk you through the rest.

## Generators

One of the great features of T29-RN is the ability to quickly generate some template files. By runing `rn g component NameOfComponent` T29-RN will create a file inside the components folder and pre-polutate it with a basic sturcture.

There are mulitple alias that you can use for the generator `g, gen, generator, generators`.

The current generator templates that T29-RN has

- Component
- Screens
- Navigation Stack
- Navigation Tabs
- Redux toolkit Api Slice
- Redux Toolkit Slice

More to be added over time.

## Boilerplate walkthrough

Your `App` folder is where most of the goodies are found in an t29-RN app. Let's walk through them in more detail. Start with `Containers/App.js` (described below) and work your way down the walkthrough in order.

### Containers

Containers are (mostly) full screens, although they can be sections of screens or application containers.

- `App.js` - your main application. We create a Redux store and configure it here
- `RootContainer.js` - main view of your application. Contains your status bar and navigation component
- `Screens/LaunchScreen.js` - this is the first screen shown in your application. It's loaded into the Navigation component
- `Screens/WelcomeScreen.js` - this screen demenstrates a working RTK Query. It's loaded into the Navigation component

To generate a new Container or Screen you can use the following generator commands:

- `rn g screen TestScreen` - Will create a `TestScreen.js` inside the Containers/Screen directory.

### Navigation

Your primary and other navigation components reside here.

- `AppNavigation.js` - loads in your initial screen and creates your menu(s) in a StackNavigation

#### Stack Navigator

- `rn g stack Test` - Will create a `TestStack.js` inside the Navigation directory.

#### Tabs Navigator

- `rn g tabs Test` - Will create a `TestTabs.js` inside the Navigation directory.

### Components

React components go here...pretty self-explanatory. We won't go through each in detail -- open each file to read the comments and view the code.

To generate a new Component you can use the following generator commands:

- `rn g component Button` - Will create a `Button.js` inside the Components directory.

### Themes

Styling themes used throughout your app styles. Since we're using OsmiCSX for the styling framework, `OsmiProvider` and `CustomTheme` goes here.

- `CustomTheme.js` - Apps custom theme.
- `OsmiProvider.js` - Provider of OsmiCSX.

### Config

Initialize and configure things here.

- `DebugConfig.js` - define how you want your debug environment to act
- `ReactotronConfig.js` - configures [Reactotron](https://github.com/infinitered/reactotron) in your project.

### Redux

Contains a preconfigured Redux and Redux ToolKit setup. Review each file carefully to see how Redux interacts with your application.

Here again we have generators to help you out. You just have to use one of the following:

- `rn g slice Amazing` - Will generate a redux slice for `Amazing`.

### Services

Contains your API service and other important utilities for your application.

- `pokemon.js` - is just an example of how to setup a RTK Query slice.

- `rn g api Amazing` - Will generate RTK QUERY for `Amazing`.

### Lib

We recommend using this folder for modules that can be extracted into their own NPM packages at some point.

### Images

Contains actual images (usually png) used in your application.

### Tests (COMING SOON)

This folder (located as a sibling to `App`) contains sample Jest snapshot and unit tests for your application.

## Troubleshooting

If you found that the boilerplate is not installer properly on your React Native proect app. Usually it's because you already install the react-native-cli globally, to solve this try to run :

```sh
npm uninstall -g react-native-cli
```

## Special Thanks

Special thanks to [Infinite Red](https://infinite.red/) who create such as beautiful react-native boilerplate (Ignite CLI). And give the inspiration for me to create this alternative cli and boilerplate.
