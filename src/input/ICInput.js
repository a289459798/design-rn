import {InputProps, Input} from 'react-native-elements';
import * as React from 'react';

export default class ICInput extends React.PureComponent<InputProps, any> {

    render() {
        return (
            <Input
                underlineColorAndroid={'transparent'}
                {...this.props}
                inputContainerStyle={[{borderBottomWidth: 0}, this.props.inputContainerStyle]}
            />
        );
    }
}
