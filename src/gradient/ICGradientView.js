import * as React from 'react';
import {View, ViewProps, Platform, Image} from 'react-native';
import ICScreen from '../theme/ICScreen';
import LinearGradient, {LinearGradientProps} from 'react-native-linear-gradient';

export default class ICGradientView extends React.PureComponent<LinearGradientProps, any> {

    render() {

        return (
            <LinearGradient
                colors={this.props.colors}
            >
                {this.props.children}
            </LinearGradient>
        );
    }
}
