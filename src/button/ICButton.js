import {ButtonProps, Button} from 'react-native-elements';
import * as React from 'react';
import PropTypes from 'prop-types';
import {Analytics} from 'react-native-umshare';

export default class ICButton extends React.Component<ButtonProps, any> {

    render() {
        return <Button
            onPress={(e) => {
                if (this.props.eventId) {
                    Analytics.event(this.props.eventId);
                }
                this.props.onPress && this.props.onPress(e);
            }}
            {...this.props}
            buttonStyle={[{padding: 0}, this.props.buttonStyle]}
        />;
    }
}
