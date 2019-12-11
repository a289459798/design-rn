import {AvatarProps, Avatar} from 'react-native-elements';
import * as React from 'react';
import PropTypes from 'prop-types';

export default class ICAvatar extends React.PureComponent<AvatarProps, any> {

    render() {
        return <Avatar
            {...this.props}/>;
    }
}
