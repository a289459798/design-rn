import React from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Modal from "react-native-modal";

export default class ICBottomSheet extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    render() {
        
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => {
                }}
            >
                <TouchableWithoutFeedback style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                }} onPress={() => this.snapTo(1)}>
                    <View style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        width: '100%',
                        height: '100%',
                    }}/>
                </TouchableWithoutFeedback>
                <BottomSheet
                    ref={(r) => this.sheet = r}
                    snapPoints={[this.props.height || '80%', 0]}
                    renderContent={() => {
                        if (this.props.renderContent) {
                            return this.props.renderContent;
                        }

                        return (<View style={[{
                            backgroundColor: '#fff', height: '100%',
                        }, this.props.contentStyle]}>
                            {this.props.children}
                        </View>);
                    }}
                    renderHeader={this.props.renderHeader}
                    onCloseEnd={() => {
                        this.toggle();
                    }}
                    {...this.props}
                    style={[{zIndex: 9}, this.props.style]}
                />
            </Modal>);

    }

    show() {
        this.setState(state => ({
            visible: true,
        }), () => {
            this.sheet.snapTo(0);
        });
    }

    toggle() {
        this.setState(state => ({
            visible: !state.visible,
        }), () => {
        });
    }

    snapTo(index) {
        this.sheet.snapTo(index);
    }
}
