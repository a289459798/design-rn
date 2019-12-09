import {Dimensions} from 'react-native';

export default {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    calc: (size, defaultSize = 750) => {
        if (!size) {
            return Dimensions.get('window').width;
        }

        return size * Dimensions.get('window').width / defaultSize;
    },
};
