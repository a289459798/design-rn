import * as React from 'react';
import {View, ViewProps, Platform, Image} from 'react-native';
import ICScreen from '../theme/ICScreen';

export default class ICShadow extends React.Component<ViewProps, any> {

    render() {

        if (Platform.OS == 'android') {
            return (
                <View
                    style={[this.props.style, {overflow: 'visible'}]}>
                    {this.props.children}

                    <Image source={require('../images/yy.9.png')}
                           style={{left: -4, top: -4, right: -4, bottom: -4, position: 'absolute', zIndex: -1}}/>
                </View>
            );
        }
        return (
            <View
                {...this.props}
                style={[{
                    shadowColor: 'rgba(51, 51, 51, 0.08)',
                    shadowOffset: {width: 2, height: 3},
                    shadowOpacity: 1,
                    shadowRadius: 9,
                    borderRadius: ICScreen.calc(10),
                    backgroundColor: '#fff',
                }, this.props.style]}>
                {this.props.children}
            </View>
        );
    }
}
