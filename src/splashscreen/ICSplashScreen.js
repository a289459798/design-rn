import {NativeModules} from 'react-native';

const {RNSplashScreen} = NativeModules;

class ICSplashScreen {

    show() {
        RNSplashScreen.show();
    }

    showAd(image, time, callback) {
        RNSplashScreen.showAd(image, time, callback);
    }

    hide() {
        RNSplashScreen.hide();
    }

}

export default new ICSplashScreen();
