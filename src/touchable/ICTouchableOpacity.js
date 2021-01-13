import * as React from 'react';
import {TouchableOpacity} from 'react-native';

export default class ICTouchableOpacity extends React.PureComponent<Props, any> {

    render() {
        return (
            <TouchableOpacity
                {...this.props}
                activeOpacity={this.props.activeOpacity || 0.6}
            >
            </TouchableOpacity>
        );
    }

}
