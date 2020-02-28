import {ImageProps} from 'react-native-elements';
import * as React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {View, Image} from 'react-native';

export default class ICImage extends React.PureComponent<ImageProps, any> {

    constructor(props) {
        super(props);
        this.state = {
            load: false,
        };
    }

    render() {

        if ((typeof this.props.source != 'number') && this.props.useNative !== false && this.props.source && this.props.source.uri && this.props.source.uri.indexOf('//') != -1) {
            return (
                <View>
                    {!this.state.load && this.props.defaultSource &&
                    <View style={[this.props.style, {position: 'absolute', zIndex: 9, overflow: 'hidden'}]}>
                        <Image  {...this.props}
                                source={this.props.defaultSource}/>
                    </View>}

                    <FastImage onLoad={() => {
                        this.setState({load: true});
                    }} {...this.props}/>
                </View>
            );
        }
        return <Image
            {...this.props}/>;
    }
}
