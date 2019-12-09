import {TextProps, Text} from 'react-native-elements';
import * as React from 'react';
import PropTypes from 'prop-types';
import ICColor from '../theme/ICColor';

export default class ICText extends React.Component<TextProps, any> {

    static propTypes = {
        gray: PropTypes.bool,
        dark: PropTypes.bool,
        light: PropTypes.bool,
    };

    static defaultProps = {
        dark: true,
        gray: false,
        light: false,
    };

    render() {
        return <Text
            style={{color: this.props.gray ? ICColor.gray : this.props.light ? ICColor.linghtGray : ICColor.darkGray}}
            {...this.props}>
            {this.props.children}
        </Text>;
    }
}
