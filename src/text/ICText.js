import {TextProps, Text} from 'react-native-elements';
import * as React from 'react';
import PropTypes from 'prop-types';

class ICText extends React.Component<TextProps, any> {
    render() {
        return <Text
        style={{color: this.props.gray ? '#999' : this.props.darkGrey ? '#666' : '#333'}}
        {...this.props}/>;
    }
}

ICText.propTypes = {
    gray: PropTypes.bool,
    darkGrey: PropTypes.bool,
};

ICText.defaultProps = {
    gray: false,
    darkGrey: false,
};

export default ICText;
