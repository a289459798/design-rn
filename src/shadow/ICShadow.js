import * as React from 'react';
import {View, ViewProps, Platform, Image, StyleSheet} from 'react-native';
import ICScreen from '../theme/ICScreen';

export default class ICShadow extends React.PureComponent<ViewProps, any> {

    render() {
        const {style, children, type} = this.props;
        if (Platform.OS === 'android') {
            return (
                <View style={[style, {overflow: 'visible'}]}>
                    {children}
                    <View style={styles.androidView}>
                        <Image source={{'uri': 'ic_yy'}} style={styles.androidImage}/>
                    </View>
                </View>
            );
        }
        return (
            <View
                {...this.props}
                style={[type === 'moderate'? styles.shadowModerateView : type === 'severe'? styles.shadowSevereView : styles.shadowMildView, style]}
            >
                {children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    androidView: {
        left: -4,
        top: -4,
        right: -4,
        bottom: -4,
        position: 'absolute',
        zIndex: -1
    },
    androidImage: {
        resizeMode: 'stretch',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    shadowMildView: {
        borderRadius: ICScreen.calc(8),
        backgroundColor: '#fff',
        shadowColor: '#EBEBEB',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 2,
    },
    shadowModerateView: {
        borderRadius: ICScreen.calc(8),
        backgroundColor: '#fff',
        shadowColor: '#EBEBEB',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    shadowSevereView: {
        borderRadius: ICScreen.calc(8),
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 4,
    }
});
