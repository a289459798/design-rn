import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import ICTouchableOpacity from '../touchable/ICTouchableOpacity';
import ICScreen from '../theme/ICScreen';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class ICHeaderRightButtons extends React.PureComponent {

    render() {
        const {style, onPressMenu, onPressClose} = this.props;
        return (
            <View style={[styles.container, style]}>
                <ICTouchableOpacity
                    style={styles.btnView}
                    onPress={() => onPressMenu && onPressMenu()}
                >
                    <Icon name={'dots-horizontal'} size={18} color={'#fff'}/>
                </ICTouchableOpacity>
                <View style={styles.line}/>
                <ICTouchableOpacity
                    style={styles.btnView}
                    onPress={() => onPressClose && onPressClose()}
                >
                    <Icon name={'close-circle-outline'} size={18} color={'#fff'}/>
                </ICTouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        marginRight: ICScreen.calc(10),
        borderRadius: ICScreen.calc(17),
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnView: {
        paddingVertical: ICScreen.calc(3),
        paddingHorizontal: ICScreen.calc(8),
    },
    line: {
        width: StyleSheet.hairlineWidth,
        height: ICScreen.calc(15),
        backgroundColor: 'rgba(255, 255, 255, 0.3)'
    },
});
