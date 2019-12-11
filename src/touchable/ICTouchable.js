import * as React from 'react';
import {Touchable} from 'react-native';

export default class ICTouchable extends React.PureComponent<Props, any> {

    render() {
        return <Touchable
            onPress={(e) => {
                if (this.props.eventId) {
                    Analytics.event(this.props.eventId);
                }
                this.props.onPress && this.props.onPress(e);
            }}
            {...this.props}>
        </Touchable>;
    }
}
