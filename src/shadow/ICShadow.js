import * as React from 'react';
import {View, ViewProps, Platform} from 'react-native';
import ICScreen from '../theme/ICScreen';
import NinePatchView from 'react-native-9patch-image';

export default class ICShadow extends React.Component<ViewProps, any> {

    render() {

        if (Platform.OS == 'android') {
            return (
                <TouchableWithoutFeedback onPress={this.props.onPress}>
                    <View style={[this.props.style, {overflow: 'visible'}]}>
                        {this.props.children}
                        <NinePatchView
                            source={{'uri': 'yy'}}
                            style={{left: -4, top: -4, right: -4, bottom: -4, position: 'absolute', zIndex: -1}}
                        />
                    </View>
                </TouchableWithoutFeedback>
            );
        }
        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>
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
            </TouchableWithoutFeedback>
        );
    }
}
