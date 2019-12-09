import * as React from 'react';
import {TouchableNativeFeedback} from 'react-native';

export default class ICTouchableNativeFeedback extends React.Component<Props, any> {

    render() {
        return <TouchableNativeFeedback
            onPress={(e) => {
                if (this.props.eventId) {
                    Analytics.event(this.props.eventId);
                }
                this.props.onPress && this.props.onPress(e);
            }}
            {...this.props}>
        </TouchableNativeFeedback>;
    }
}
