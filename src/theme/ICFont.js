import ICScreen from './ICScreen';

export default {
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
    calc: (size, defaultSize) => {
        return ICScreen.calc(size, defaultSize);
    },
};
