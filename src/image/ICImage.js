import {ImageProps, Image} from 'react-native-elements';
import * as React from 'react';
import PropTypes from 'prop-types';

export default class ICImage extends React.PureComponent<ImageProps, any> {

    render() {
        return <Image
            {...this.props}/>;
    }
}
