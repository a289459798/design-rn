import * as React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';

export default class ICLine extends React.PureComponent<Props, any> {

    static propTypes = {
        horizontal: PropTypes.bool,
        vertical: PropTypes.bool,
    };

    static defaultProps = {
        horizontal: true,
        vertical: false,
    };

    render() {
        let style = {backgroundColor: '#F0F0F0'};
        if (this.props.vertical) {
            style.width = StyleSheet.hairlineWidth;
        } else {
            style.height = StyleSheet.hairlineWidth;
        }
        return <View
            {...this.props} style={[style, this.props.style]}/>;
    }
}
