import React from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import Modal from 'react-native-modal';

export default class ICModal extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    render() {
        return (
            <Modal
                useNativeDriver={true}
                customBackdrop={!this.props.noAllow ? null : <View style={{
                    flex: 1, backgroundColor: 'rgba(0, 0, 0,0.7)',
                }}/>}
                isVisible={this.state.visible}
                animationIn={this.props.fromBottom ? 'slideInUp' : this.props.fromUp ? 'slideInDown' : 'fadeIn'}
                animationOut={this.props.fromBottom ? 'slideOutDown' : this.props.fromUp ? 'slideOutUp' : 'fadeOut'}
                onBackdropPress={() => this.hide()}
                {...this.props}
            >
                <View style={[{backgroundColor: '#fff'}, this.props.style]}>
                    {this.props.children}
                </View>
            </Modal>
        );
    }

    show() {
        this.setState({
            visible: true,
        });
    }

    hide() {
        this.setState({
            visible: false,
        });
    }

}
