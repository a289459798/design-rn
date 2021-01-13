import * as React from 'react';
import {View, ViewProps} from 'react-native';

export default class ICRadius extends React.PureComponent<ViewProps, any> {

    render() {
        let {radius} = this.props;
        let style = {};
        if (typeof radius === 'number') {
            style.borderRadius = radius;
        } else if (typeof radius === 'object') {
            style.borderTopRightRadius = radius[0];
            style.borderBottomRightRadius = radius[1];
            style.borderBottomLeftRadius = radius[2];
            style.borderTopLeftRadius = radius[3];
        }
        return (
            <View {...this.props} style={[style, this.props.style]}>
                {this.props.children}
            </View>
        );
    }

}
