import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import ICScreen from '../theme/ICScreen';

export default class ICSafeBottom extends React.PureComponent<Props, any> {

    render() {
        return (
            <View style={{backgroundColor: '#fff', paddingBottom: ICScreen.iphonx ? 39 : 0}}>
                {this.props.children}
            </View>
        );
    }
}
