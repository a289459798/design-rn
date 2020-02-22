import * as React from 'react';
import {View, ViewProps, Platform, Image} from 'react-native';
import ICScreen from '../theme/ICScreen';
import LinearGradient, {LinearGradientProps} from 'react-native-linear-gradient';

export default class ICGradientView extends React.PureComponent<LinearGradientProps, any> {

    setNativeProps(props) {
        this._view.setNativeProps(props);
    }

    render() {

        return (
            <LinearGradient
                ref={r => this._view = r}
                colors={this.props.colors}
                {...this.props}
            >
                {this.props.children}
            </LinearGradient>
        );
    }
}
