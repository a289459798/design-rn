import {NativeModules} from 'react-native';
import {array} from 'prop-types';

const {RNImageBrowser} = NativeModules;

export default {

    show: (images: array, index = 0) => {
        RNImageBrowser.show(images, index);
    },

};


