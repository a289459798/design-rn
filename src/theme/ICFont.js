import ICScreen from './ICScreen';
import {Platform} from 'react-native';

export default {
    f1: ICScreen.calc(1),
    f2: ICScreen.calc(2),
    f3: ICScreen.calc(3),
    f4: ICScreen.calc(4),
    f5: ICScreen.calc(5),
    f6: ICScreen.calc(6),
    f7: ICScreen.calc(7),
    f8: ICScreen.calc(8),
    f9: ICScreen.calc(9),
    f10: ICScreen.calc(10),
    f11: ICScreen.calc(11),
    f12: ICScreen.calc(12),
    f13: ICScreen.calc(13),
    f14: ICScreen.calc(14),
    f15: ICScreen.calc(15),
    f16: ICScreen.calc(16),
    f17: ICScreen.calc(17),
    f18: ICScreen.calc(18),
    bold: Platform.OS === 'ios' ? '400' : 'bold',
    calc: (size, defaultSize) => {
        return ICScreen.calc(size, defaultSize);
    },
};
