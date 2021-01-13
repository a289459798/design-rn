import * as React from 'react';
import {TouchableNativeFeedback, TouchableHighlight, Platform} from 'react-native';

export default class ICTouchableNativeFeedback extends React.PureComponent<Props, any> {

    render() {
        if (Platform.OS == 'android') {
            return (
                <TouchableNativeFeedback
                    {...this.props}
                >
                    {this.props.children}
                </TouchableNativeFeedback>
            );
        }
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                {...this.props}
            >
                {this.props.children}
            </TouchableHighlight>
        );
    }

}
