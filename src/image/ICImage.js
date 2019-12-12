import {ImageProps, Image} from 'react-native-elements';
import * as React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';


export default class ICImage extends React.PureComponent<ImageProps, any> {

    render() {
        if (this.props.source.uri && this.props.useNative !== false) {
            return <FastImage {...this.props}/>;
        }
        return <Image
            {...this.props}/>;
    }
}
