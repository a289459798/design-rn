import * as React from 'react';
import {Touchable} from 'react-native';

export default class ICTouchable extends React.PureComponent<Props, any> {

    render() {
        return (
            <Touchable
                {...this.props}
            >
            </Touchable>
        );
    }

}
