import React from 'react';
import {View, TouchableWithoutFeedback, Modal, StyleSheet} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import ICColor from '../theme/ICColor';
import ICFont from '../theme/ICFont';
import ICLine from '../view/ICLine';
import ICModal from '../modal/ICModal';
import ICScreen from '../theme/ICScreen';
import ICText from '../text/ICText';
import ICTouchableOpacity from '../touchable/ICTouchableOpacity';

export default class ICActionSheet extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
        };
    }

    render() {

        let {list, visible, key} = this.state;
        return (
            <ICModal
                fromBottom
                ref={r => this.modal = r}
                style={styles.modal}
            >
                <View style={styles.modalView}>
                    <View style={[styles.modalBtn, {height: ICScreen.calc(40)}]}>
                        <ICText style={styles.modalTitle}>请选择</ICText>
                    </View>
                    <ICLine/>
                    {list.map((v, k) => (
                        <>
                            <ICTouchableOpacity
                                key={k}
                                activeOpacity={1}
                                style={styles.modalBtn}
                                onPress={() => {
                                    if (k != key) {
                                        this.props.onPress(k, v);
                                        this.modal.hide();
                                    }
                                }}
                            >
                                <ICText
                                    style={[styles.modalText, {color: key === k ? '#7089FF' : ICColor.darkGray}]}>{v.name}</ICText>
                            </ICTouchableOpacity>
                            <ICLine/>
                        </>
                    ))}
                    <ICLine style={{height: 5}}/>
                    <ICTouchableOpacity
                        activeOpacity={1}
                        style={styles.modalBtn}
                        onPress={() => this.hide()}
                    >
                        <ICText style={styles.modalText}>取消</ICText>
                    </ICTouchableOpacity>
                </View>
            </ICModal>);

    }

    show(list, key) {
        this.setState({
            list: list,
            key: key,
        }, () => {
            this.modal.show();
        });
    }

    hide() {
        this.modal.hide();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modal: {
        justifyContent: 'flex-end',
        marginBottom: 0,
        alignItems: 'center',
        borderTopRightRadius: ICFont.f15,
        borderTopLeftRadius: ICFont.f15,
    },
    modalView: {
        width: ICScreen.width,
        marginBottom: ICScreen.iphonx ? 34 : 0,
    },
    modalBtn: {
        height: ICScreen.calc(45),
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitle: {
        fontSize: ICFont.f13,
        color: ICColor.lightGray,
    },
    modalText: {
        fontSize: ICFont.f15,
        color: ICColor.darkGray,
    },
});
