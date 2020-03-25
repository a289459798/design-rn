import {Dimensions, Platform} from 'react-native';

export default {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    iphonx: Platform.OS == 'ios' && (Dimensions.get('window').height == 812 || Dimensions.get('window').height == 896),
    iphone: Platform.OS === 'ios',
    android: Platform.OS === 'android',
    calc: (size, defaultSize = 375) => {
        if (!size) {
            return Dimensions.get('window').width;
        }

        return size * Dimensions.get('window').width / defaultSize;
    },
};
