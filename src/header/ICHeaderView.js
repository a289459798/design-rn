import * as React from 'react';
import {View} from 'react-native';
import ICTouchableNativeFeedback from '../touchable/ICTouchableNativeFeedback';
import ICFont from '../theme/ICFont';
import ICText from '../text/ICText';
import ICHeaderButton from './ICHeaderButton';
import ICLine from '../view/ICLine';

export default class ICHeaderView extends React.PureComponent {

    setNativeProps = (nativeProps) => {
        this._view.setNativeProps(nativeProps);
    };

    render() {
        return (
            <>
                <View
                    ref={e => this._view = e}
                    style={[{
                        width: '100%',
                        height: 44,
                        backgroundColor: '#fff',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: ICFont.f10,
                    }, this.props.style]}>
                    {this.props.leftButtons ?
                        <ICHeaderButton items={this.props.leftButtons} style={this.props.leftStyle}/>
                        : this.props.leftComponent ? this.props.leftComponent : <View/>}
                    {this.props.centerComponent || this.props.title ?
                        <View style={[{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: this.props.abs ? 'absolute' : null,
                            left: 0,
                            right: 0,
                        }, this.props.centerStyle]}>
                            {this.props.centerComponent ||
                            <ICText style={{fontSize: ICFont.f16}}>
                                {this.props.title}
                            </ICText>}
                        </View> : null}
                    {this.props.rightButtons ?
                        <ICHeaderButton items={this.props.rightButtons} style={[this.props.rightStyle]}/>
                        : this.props.rightComponent ? this.props.rightComponent : null}
                </View>
                {this.props.showLine ? <ICLine/> : null}
            </>
        );
    }
}
