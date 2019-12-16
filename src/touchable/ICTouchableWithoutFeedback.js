import * as React from 'react';
import {TouchableWithoutFeedback} from 'react-native';

export default class ICTouchableWithoutFeedback extends React.PureComponent<Props, any> {

    render() {
        return <TouchableWithoutFeedback
            onPress={(e) => {
                if (this.props.eventId) {
                    Analytics.event(this.props.eventId);
                }
                this.props.onPress && this.props.onPress(e);
            }}
            {...this.props}>
        </TouchableWithoutFeedback>;
    }
}
