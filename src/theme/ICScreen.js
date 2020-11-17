import {Dimensions, Platform} from 'react-native';

export default {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    iphonx: Platform.OS == 'ios' && (Dimensions.get('window').height >= 812),
    iphone12: Platform.OS == 'ios' && (Dimensions.get('window').height === 844 || Dimensions.get('window').height === 926),
    iphone: Platform.OS == 'ios',
    android: Platform.OS == 'android',
    calcWithHeight: (size) => {
        if (!size) {
            return Dimensions.get('window').height;
        }
        return Dimensions.get('window').height / 812 * size;
    },
    calc: (size, defaultSize = 375) => {
        if (!size) {
            return Dimensions.get('window').width;
        }
        return size * Dimensions.get('window').width / defaultSize;
    },
};
