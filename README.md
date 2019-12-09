
# react-native-design-rn

## Getting started

`$ npm install react-native-design-rn --save`

### Mostly automatic installation

`$ react-native link react-native-design-rn`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-design-rn` and add `RNDesignRn.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNDesignRn.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.ichong.zzy.design.rn.RNDesignRnPackage;` to the imports at the top of the file
  - Add `new RNDesignRnPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-design-rn'
  	project(':react-native-design-rn').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-design-rn/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-design-rn')
  	```


## Usage
```javascript
import RNDesignRn from 'react-native-design-rn';

// TODO: What to do with the module?
RNDesignRn;
```
  