import {ImageProps} from 'react-native-elements';
import * as React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {View, Image} from 'react-native';
import ICScreen from '../theme/ICScreen';

export default class ICImage extends React.PureComponent<ImageProps, any> {

    constructor(props) {
        super(props);
        this.state = {
            load: false,
            style: {},
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

                    <FastImage onLoad={(res) => {

                        let newStyle = {};
                        if (this.props.width == 'auto' || this.props.height == 'auto') {
                            let style = {};
                            for (let k in this.props.style) {
                                if (typeof this.props.style[k] == 'object') {
                                    style = {
                                        ...style,
                                        ...this.props.style[k],
                                    };
                                } else {
                                    style = this.props.style;
                                    break;
                                }
                            }

                            if (this.props.width == 'auto') {
                                newStyle.width = (style.height || ICScreen.height) / res.nativeEvent.height * res.nativeEvent.width;
                            }
                            if (this.props.height == 'auto') {
                                newStyle.height = (style.width || ICScreen.width) / res.nativeEvent.width * res.nativeEvent.height;
                            }
                        }
                        this.setState({load: true, style: newStyle});


                    }} {...this.props} style={[this.props.style, this.state.style]}/>
                </View>
            );
        }
        return <Image
            {...this.props}/>;
    }
}
