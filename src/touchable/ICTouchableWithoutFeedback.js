import * as React from 'react';
import {TouchableWithoutFeedback} from 'react-native';

export default class ICTouchableWithoutFeedback extends React.PureComponent<Props, any> {

    render() {
        return (
            <TouchableWithoutFeedback
                {...this.props}
            >
            </TouchableWithoutFeedback>
        );
    }

}
