import {ButtonProps, Button} from 'react-native-elements';
import * as React from 'react';
import PropTypes from 'prop-types';
import ICButton from './ICButton';
import LinearGradient from 'react-native-linear-gradient';

export default class ICGradientButton extends React.Component<ButtonProps, any> {

    render() {
        return <ICButton
            {...this.props}
            ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
                colors: this.props.disabled && this.props.disabledColor ? this.props.disabledColor : this.props.colors,
                start: this.props.start || {x: 0, y: 0},
                end: this.props.end || {x: 0, y: 1},
            }}
        />;
    }
}
