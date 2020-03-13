/**
 * Created by zhangzy on 16/2/19.
 */

'use strict';
import React, {
    PureComponent,
} from 'react';
import {
    StyleSheet,
    Text,
    InteractionManager,
    Animated,
    Easing,
} from 'react-native';


export default class ICSkeleton extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            fadeOutOpacity: new Animated.Value(1),
            hide: false,
        };
    }


    render() {
        return (
            <View
                style={[styles.container, {backgroundColor: '#fff'}]}>
                <Animated.View
                    style={[styles.container, {opacity: this.state.fadeOutOpacity}]}>

                    {this.props.children}
                </Animated.View>
            </View>
        );
    }

    componentDidMount() {

        InteractionManager.runAfterInteractions(() => {

            this.anim = Animated.loop(
                Animated.sequence([
                    Animated.timing(this.state.fadeOutOpacity, {
                        toValue: 0.5,
                        duration: 500,
                        useNativeDriver: true,
                        easing: Easing.bezier(.56, .63, .99, .75),
                    }),


                    Animated.timing(this.state.fadeOutOpacity, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                        easing: Easing.bezier(.56, .63, .99, .75),
                    }),
                ]),
            ).start();

        });

    }

};


const styles = StyleSheet.create({
    container: {
        position: 'absolute', width: '100%', height: '100%',
    },

});
