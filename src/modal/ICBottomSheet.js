import React from 'react';
import {View, TouchableWithoutFeedback, Modal} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

export default class ICBottomSheet extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    render() {
        const {height, transparentColor = 'rgba(0, 0, 0, 0.7)'} = this.props;
        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => {
                }}
            >
                <TouchableWithoutFeedback
                    style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
                    onPress={() => {
                        this.snapTo(0);
                        this.snapTo(0);
                    }}
                >
                    <View style={{backgroundColor: transparentColor, width: '100%', height: '100%'}}/>
                </TouchableWithoutFeedback>
                <BottomSheet
                    ref={(r) => this.sheet = r}
                    snapPoints={[0, height || '80%']}
                    renderContent={() => {
                        if (this.props.renderContent) {
                            return this.props.renderContent;
                        }
                        return (
                            <View style={[{backgroundColor: '#fff', height: '100%'}, this.props.contentStyle]}>
                                {this.props.children}
                            </View>
                        );
                    }}
                    onOpenEnd={() => {
                        this.open = true;
                    }}
                    renderHeader={this.props.renderHeader}
                    onCloseEnd={() => {
                        if (this.open) {
                            this.hide();
                        }
                    }}
                    {...this.props}
                    style={[{zIndex: 9}, this.props.style]}
                />
            </Modal>
        );
    }

    show() {
        this.setState(state => ({
            visible: true,
        }), () => {
            this.sheet.snapTo(1);
        });
    }

    hide() {
        this.setState(state => ({
            visible: false,
        }), () => {
            this.open = false;
        });
    }

    snapTo(index) {
        this.sheet.snapTo(index);
        this.sheet.snapTo(index);
    }
}
