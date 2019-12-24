import React from 'react';
import {View} from 'react-native';
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
                isVisible={this.state.visible}
                animationIn={this.props.fromBottom ? 'slideInUp' : this.props.fromUp ? 'slideInDown' : 'fadeIn'}
                animationOut={this.props.fromBottom ? 'slideOutDown' : this.props.fromUp ? 'slideOutUp' : 'fadeOut'}
                onBackdropPress={() => this.hide()}
                {...this.props}
            >
                <View style={{backgroundColor: '#fff'}}>
                    {this.props.children}
                </View>
            </Modal>);

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
