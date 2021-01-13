'use strict';
import {NativeModules, Platform} from 'react-native';

const {RNDesignRn} = NativeModules;

export default {
    primary: '#1292B4',
    white: '#FFF',
    gray: '#666',
    darkGray: '#333',
    lightGray: '#999',
    warring: '#',
    error: 'red',
    setColor: (lightColor, darkColor) => {
        if (Platform.OS == 'ios') {
            self.lightColor = lightColor;
            self.darkColor = darkColor;
        }
    },

    setImage: (lightImage, darkImage) => {
        self.lightImage = lightImage;
        self.darkImage = darkImage;

    },

    color: (color) => {
        if (Platform.OS == 'android') {
            return color;
        }
        return RNDesignRn.isDark == 1 ? (self.darkColor[color] ? self.darkColor[color] : color) : self.lightColor[color] ? self.lightColor[color] : color;
    },

    image: (key) => {
        if (Platform.OS == 'android') {
            return self.lightImage[key];
        } else {
            return RNDesignRn.isDark == 1 ? (self.darkImage[key] ? self.darkImage[key] : self.lightImage[key]) : self.lightImage[key];
        }
    },

};
