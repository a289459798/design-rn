import React from 'react';
import {View, TouchableOpacity, Modal, Platform} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

export default class ICBottomSheet extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
        this.androidHide = true;
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
                <TouchableOpacity
                    activeOpacity={1}
                    style={{flex: 1, backgroundColor: transparentColor}}
                    onPress={() => {
                        if (Platform.OS === 'android') {
                            if (this.androidHide) {
                                this.androidHide = false;
                                this.snapTo(0);
                                this.snapTo(0);
                            }
                            this.setState({visible: false});
                        } else {
                            this.snapTo(0);
                            this.snapTo(0);
                        }
                    }}
                />
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
                        this.androidHide = true;
                    }}
                    {...this.props}
                    style={[{zIndex: 9}, this.props.style]}
                />
            </Modal>
        );
    }

    show() {
        this.setState({visible: true}, () => {
            this.sheet.snapTo(1);
        })
    }

    hide() {
        this.setState({visible: false}, () => {
            this.open = false;
        });
        if (Platform.OS === 'android') {
            setTimeout(() => {
                this.setState({visible: false})
            }, 100)
        }
    }

    snapTo(index) {
        this.sheet.snapTo(index);
        this.sheet.snapTo(index);
    }
}
