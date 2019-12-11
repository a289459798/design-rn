'use strict';
import React, {
    PureComponent,
} from 'react';
import {
    StyleSheet,
    View,
    Modal,
    TouchableWithoutFeedback,
    Image,
} from 'react-native';

export default class ICGuide extends PureComponent {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            visible: false,
            step: 1,
            data: [],
        };
    }

    render() {

        if (!this.state.visible) {
            return null;
        }
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => {
                }}
            >
                <TouchableWithoutFeedback onPress={() => {
                    this.props.onNext(this.state.step + 1);
                    this.next();
                }}>
                    <View style={{flex: 1}}>
                        <View style={[styles.mask, {height: this.state.data[this.state.step].top}]}/>
                        <View style={[styles.container, {
                            height: this.state.data[this.state.step].height,
                        }]}>
                        </View>
                        <View style={[styles.mask, {flex: 1}]}>
                            <Image
                                source={this.state.data[this.state.step].image}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </Modal>
        );

    }

    next() {

        let step = this.state.step;
        if (this.state.step == this.state.data.length) {
        } else {
            step += 1;
            this.setState({
                step: step,
            });
        }
    }

    hide() {
        this.setState({
            visible: false,
        });
    }

    show(data) {
        this.setState({
            visible: true,
            step: 1,
            data: data,
        });

    }

}

var styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },

    mask: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        zIndex: 999,
    },
});
