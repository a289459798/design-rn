import {TextProps, Text} from 'react-native-elements';
import * as React from 'react';
import PropTypes from 'prop-types';
import {Analytics} from 'react-native-umshare';

export default class ICText extends React.PureComponent<TextProps, any> {

    static propTypes = {
        gray: PropTypes.bool,
        dark: PropTypes.bool,
        light: PropTypes.bool,
        eventId: PropTypes.string,
    };

    static defaultProps = {
        dark: true,
        gray: false,
        light: false,
    };

    render() {
        if (!this.props.onPress && !this.props.eventId) {
            return (
                <Text
                    selectable={true}
                    allowFontScaling={false}
                    {...this.props}
                    style={[this.props.style]}
                >
                    {this.props.children}
                </Text>
            );
        }
        return (
            <Text
                selectable={true}
                allowFontScaling={false}
                {...this.props}
                style={[this.props.style]}
                onPress={(e) => {
                    if (this.props.eventId) {
                        Analytics.event(this.props.eventId);
                    }
                    this.props.onPress && this.props.onPress(e);
                }}
            >
                {this.props.children}
            </Text>
        );
    }

}
