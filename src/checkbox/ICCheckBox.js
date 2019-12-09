import {CheckBoxProps, CheckBox} from 'react-native-elements';
import * as React from 'react';
import PropTypes from 'prop-types';

export default class ICCheckBox extends React.Component<CheckBoxProps, any> {

    render() {
        return <CheckBox
            {...this.props}/>;
    }
}
