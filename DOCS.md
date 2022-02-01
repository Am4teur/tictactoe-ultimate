# Documentation

## Initialization

Expo initialization of a React Native app with Typescript.

```
expo init -t expo-template-blank-typescript
```

## Project Structure

App.tsx
/src
 - /screens
 - /components
 - /utils
 - /assets

## Eslint and Prettier

```
npm add -D prettier
```

Add prettier [configuration](prettier.config.ts) file.


# Dependencies

```
npm install \
-> @react-navigation/native \
-> @react-navigation/drawer \
-> react-native-reanimated \                (drawer needs this import)
-> react-native-gesture-handler
-> react-native-screens \
-> native-base \
-> react-native-safe-area-context \         (native-base needs this import)
-> react-native-svg \                       (native-base needs this import)
-> @expo/vector-icons \
-> @react-navigation/material-bottom-tabs   (navigation material bottom bar)
-> react-native-paper                       (navigation material bottom bar)
-> react-native-vector-icons                (navigation material bottom bar)
-> @react-navigation/native-stack           (basic navigation stack)
-> moti \                                   (Similar to react motion, just trying it out)
~ styled-components \
? styled-system \
shortid \
@types/shortid \
expo-linking \
```
