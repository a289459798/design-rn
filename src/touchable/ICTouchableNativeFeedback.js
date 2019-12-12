import * as React from 'react';
import {TouchableNativeFeedback, TouchableHighlight, Platform} from 'react-native';

export default class ICTouchableNativeFeedback extends React.PureComponent<Props, any> {

    render() {
        if (Platform.OS == 'android') {
            return <TouchableNativeFeedback
                onPress={(e) => {
                    if (this.props.eventId) {
                        Analytics.event(this.props.eventId);
                    }
                    this.props.onPress && this.props.onPress(e);
                }}
                {...this.props}>
                {this.props.children}
            </TouchableNativeFeedback>;
        }
        return <TouchableHighlight
            onPress={(e) => {
                if (this.props.eventId) {
                    Analytics.event(this.props.eventId);
                }
                this.props.onPress && this.props.onPress(e);
            }}
            {...this.props}>
            {this.props.children}
        </TouchableHighlight>;
    }
}
