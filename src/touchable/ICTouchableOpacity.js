import * as React from 'react';
import {TouchableOpacity} from 'react-native';

export default class ICTouchableOpacity extends React.PureComponent<Props, any> {

    render() {
        return <TouchableOpacity
            onPress={(e) => {
                if (this.props.eventId) {
                    Analytics.event(this.props.eventId);
                }
                this.props.onPress && this.props.onPress(e);
            }}
            {...this.props}
            activeOpacity={this.props.activeOpacity || 0.6}
        >
        </TouchableOpacity>;
    }
}
