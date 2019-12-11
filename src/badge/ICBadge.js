import {BadgeProps, Badge} from 'react-native-elements';
import * as React from 'react';
import PropTypes from 'prop-types';

export default class ICBadge extends React.PureComponent<BadgeProps, any> {

    render() {
        return <Badge
            {...this.props}/>;
    }
}
