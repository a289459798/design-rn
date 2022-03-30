import * as React from 'react';
import {View, Animated, StatusBar} from 'react-native';
import ICFont from '../theme/ICFont';
import ICText from '../text/ICText';
import ICHeaderButton from './ICHeaderButton';
import ICLine from '../view/ICLine';
import ICScreen from '../theme/ICScreen';

export default class ICHeaderView extends React.PureComponent {

    setNativeProps = (nativeProps) => {
        this._view && this._view.setNativeProps(nativeProps);
    };

    render() {
        let statusBarHeight = (ICScreen.iphonx || ICScreen.iphone12) ? 44 : ICScreen.iphone ? 20 : StatusBar.currentHeight;
        return (
            <>
                <Animated.View
                    ref={e => this._view = e}
                    style={[{
                        width: '100%',
                        height: this.props.safeAreaHide ? 44 + statusBarHeight : 44,
                        paddingTop: this.props.safeAreaHide ? statusBarHeight : 0,
                        backgroundColor: '#fff',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: ICFont.f10,
                        zIndex: 9,
                    }, this.props.style]}>
                    {this.props.leftButtons ? (
                        <ICHeaderButton items={this.props.leftButtons} style={this.props.leftStyle}/>
                    ) : this.props.leftComponent ? this.props.leftComponent : <View/>}
                    {this.props.centerComponent || this.props.title ? (
                        <View style={[{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: this.props.abs ? 'absolute' : null,
                            left: 0,
                            right: 0,
                        }, this.props.centerStyle]}>
                            {this.props.centerComponent || (
                                <ICText style={[{fontSize: ICFont.f16}, this.props.titleStyle]}>
                                    {this.props.title}
                                </ICText>
                            )}
                        </View>
                    ) : null}
                    {this.props.rightButtons ? (
                        <ICHeaderButton items={this.props.rightButtons} style={[this.props.rightStyle]}/>
                    ) : this.props.rightComponent ? this.props.rightComponent : null}
                </Animated.View>
                {this.props.showLine ? <ICLine/> : null}
            </>
        );
    }
}
