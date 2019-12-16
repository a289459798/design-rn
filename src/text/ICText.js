import {TextProps, Text} from 'react-native-elements';
import * as React from 'react';
import PropTypes from 'prop-types';
import ICColor from '../theme/ICColor';
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
        return <Text
            onPress={(e) => {
                if (this.props.eventId) {
                    Analytics.event(this.props.eventId);
                }
                this.props.onPress && this.props.onPress(e);
            }}
            allowFontScaling={false}
            pointerEvents={'none'}
            {...this.props}
            style={[{color: this.props.light ? ICColor.lightGray : this.props.gray ? ICColor.gray : ICColor.darkGray}, this.props.style]}
        >
            {this.props.children}
        </Text>;
    }
}
