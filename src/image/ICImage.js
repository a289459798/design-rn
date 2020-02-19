import {ImageProps, Image} from 'react-native-elements';
import * as React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {View} from 'react-native';

export default class ICImage extends React.PureComponent<ImageProps, any> {

    constructor(props) {
        super(props);
        this.state = {
            load: false,
        };
    }

    render() {
        if (this.props.useNative !== false) {
            return (
                <View>
                    {!this.state.load && this.props.defaultSource &&
                    <View style={[this.props.style], {position: 'absolute', zIndex: 9}}>
                        <Image resizeMode={'center'} {...this.props}
                               source={this.props.defaultSource}/>
                    </View>}

                    <FastImage onLoad={() => {
                        this.setState({load: true})
                    }} {...this.props}/>
                </View>
            );
        }
        return <Image
            {...this.props}/>;
    }
}
