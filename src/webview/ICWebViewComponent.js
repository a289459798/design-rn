/**
 * Created by Rambo on 2016/9/14.
 */


'use strict';
import React, {
    Component,
} from 'react';
import {
    StyleSheet,
    View, Text, TouchableWithoutFeedback, PanResponder, StatusBar, Share,
} from 'react-native';


import ICBase from '../base/ICBase';
import ICWebView from './ICWebView';
import ICScreen from '../theme/ICScreen';
import ICImage from '../image/ICImage';
import ICGradientView from '../gradient/ICGradientView';
import ICTouchableWithoutFeedback from '../touchable/ICTouchableWithoutFeedback';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ICFont from '../theme/ICFont';
import ICText from '../text/ICText';

export default class ICWebViewComponent extends ICBase {

    static navigationOptions = ({navigation}) => {

        return ICBase.navigationOptions({navigation}, {
            title: navigation.state.params.title || '加载中...',
            headerLeft: <Icon name={'close'} color={'#333'} size={24}
                              onPress={() => {
                                  let status = navigation.state.params.onLeftPress && navigation.state.params.onLeftPress();
                                  if (!status) {
                                      navigation.pop();
                                  }
                              }}/>,
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            canGoBack: false,
            canGoForward: false,
            webViewTitle: '',
            progress: 0,
            showShare: false,
            showBottom: true,
        };

        this.showBack = true;
    }

    getUrlParams() {
        return '';
    }

    onMessage(e) {

    }

    getParams(key) {
        if (this.params[key]) {
            return this.params[key];
        } else if (this.props[key]) {
            return this.props[key];
        }
        return null;
    }

    getProps() {
        return {};
    }

    getNamespace() {
        return 'ichong';
    }

    injectedJavaScript() {
        let js = '';
        let fn = this._getFunctionName();
        js += `window.${this.getNamespace()} = {};`;
        for (let k in fn) {
            js += `
                window.postMessage = function(data) {
                    window.ReactNativeWebView.postMessage(data);
                }
                window.${this.getNamespace()}.${k} = function(data) {
                    window.ReactNativeWebView.postMessage(JSON.stringify({type: '${k}',data: data}));
                }
            `;
        }
        js += this.runJs();
        js += '';
        return js;
    }

    runJs() {
        return '';

    }

    _getFunctionName() {
        return {
            showShare: (data) => {
                this.setState({showShare: !!data});
            },
            setTitle: (title) => {
                this.setHeaderTitle(title);
            },
            showBottom: (data) => {
                this.setState({showBottom: !!data});
            },
            hideNav: () => {
                this.setNavigationOptions({
                    headerStyle: {
                        height: 0,
                    },
                });
            },
            ...this.registerFunctionNames(),
        };
    }

    registerFunctionNames() {
        return {};
    }

    _renderWebView() {

        if (this.getParams('uri')) {

            let source = {
                uri: `${decodeURIComponent(this.getParams('uri'))}${this.getParams('uri').indexOf('?') == -1 ? '?' : '&'}${this.getUrlParams()}`,
            };
            if (this.getParams('method')) {
                source.method = this.getParams('method');
            }
            if (this.getParams('body')) {
                source.body = this.getParams('body');
            }
            if (this.getParams('headers')) {
                source.headers = this.getParams('headers');
            }

            return (
                <ICWebView
                    ref={r => this.webview = r}
                    source={source}
                    textZoom={100}
                    onNavigationStateChange={this.onNavigationStateChange}
                    style={{flex: 1}}
                    decelerationRate="normal"
                    onShouldStartLoadWithRequest={(data) => {
                        if (data.url.indexOf('http') == 0 || data.url == 'about:blank') {
                            return true;
                        } else {
                            this.openURL(data.url);
                            return false;
                        }
                    }}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    startInLoadingState={true}
                    onLoadStart={() => this.loaded = false}
                    renderLoading={(res) => {
                        return (<View style={{width: '100%', height: ICScreen.calc(2), position: 'absolute', top: 0}}>
                            <View style={{width: '100%', height: '100%', backgroundColor: '#ddd'}}/>
                            <ICGradientView
                                ref={r => this.progress = r}
                                colors={['#8089FF', '#7089FF']}
                                end={{x: 1, y: 0}}
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    width: 0,
                                    height: '100%',
                                    zIndex: 9,
                                }}/>
                        </View>);
                    }}
                    injectedJavaScript={this.injectedJavaScript()}
                    onLoadProgress={({nativeEvent}) => {
                        this.progress && this.progress.setNativeProps({
                            style: {width: nativeEvent.progress * 100 + '%'},
                        });
                    }}
                    onLoadEnd={() => {
                        this.loaded = true;
                    }}
                    onError={(e) => {
                        this.setHeaderTitle('加载失败');
                    }}
                    renderError={(e) => {
                        return (
                            <ICTouchableWithoutFeedback onPress={() => this.webview.reload()}>
                                {this.renderError ? <View pointerEvents={'box-only'}
                                                          style={{height: '100%'}}>{this.renderError(e)}</View> :
                                    <View style={{
                                        height: '100%',
                                        backgroundColor: '#fff',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Icon name={'wifi-off'} size={90} color={'#999'}/>
                                        <ICText>加载错误，点击重试</ICText>
                                        <ICText style={{marginTop: ICFont.f10, color: '#999'}}>{e}</ICText>
                                    </View>}
                            </ICTouchableWithoutFeedback>
                        );
                    }}
                    onMessage={(e) => {
                        try {
                            let json = JSON.parse(e.nativeEvent.data);
                            let fn = this._getFunctionName();
                            if (fn && fn[json.type]) {
                                fn[json.type](json.data);
                            } else {
                                this.onMessage(e);
                            }
                        } catch (error) {
                            this.onMessage(e);
                        }
                    }}
                    {...this.getProps()}
                >

                </ICWebView>
            );
        } else if (this.getParams('html')) {

            let html = `
                <html><head>
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" id="viewport" name="viewport">
<style> img {max-width: 100%}</style>
</head><body>${this.getParams('html')}</body></html>
            `;
            return (
                <ICWebView
                    ref={r => this.webview = r}
                    source={{html: html, baseUrl: 'about:blank'}}
                    onNavigationStateChange={this.onNavigationStateChange}
                    style={{flex: 1}}
                    decelerationRate="normal"
                    onShouldStartLoadWithRequest={(data) => {
                        if (data.url == 'about:blank') {
                            return true;
                        } else {
                            this.openURL(data.url);
                            return false;
                        }
                    }}
                    useWebKit={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    onMessage={(e) => {
                        this.onMessage(e);
                    }}
                    {...this.getProps()}
                >

                </ICWebView>
            );
        } else {

            return (null);
        }
    }

    renderView() {
        return (
            <View style={{flex: 1}}>
                {this._renderWebView()}

                {this.getParams('uri') && this.state.showBottom && <View ref={(r) => this.back = r} style={{
                    height: ICScreen.iphonx ? 79 : ICScreen.calc(40),
                    backgroundColor: '#fff',
                    borderTopColor: '#e2e2e2',
                    borderTopWidth: StyleSheet.hairlineWidth,
                }}>
                    <View
                        style={{
                            height: ICScreen.calc(40),
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                        }}>

                        <Icon style={{padding: 10}} onPress={() => {
                            if (this.state.canGoBack) {
                                this.webview.goBack();
                            }
                        }} name={'chevron-left'} color={this.state.canGoBack ? '#666' : '#ddd'} size={24}/>

                        <Icon style={{padding: 10}} onPress={() => {
                            if (this.state.canGoForward) {
                                this.webview.goForward();
                            }
                        }} name={'chevron-right'} color={this.state.canGoForward ? '#666' : '#ddd'} size={24}/>

                        <Icon style={{padding: 10}} onPress={() => {
                            this.webview.reload();
                        }} name={'refresh'} color={'#666'} size={22}/>

                        <Icon style={{padding: 10}} onPress={() => {
                            if (this.state.showShare) {
                                Share.share({
                                    url: this.state.url,
                                    message: this.getParams('title'),
                                    title: this.getParams('title'),
                                });
                            }

                        }} name={'share-variant'} color={this.state.showShare ? '#666' : '#ddd'} size={20}/>

                    </View>
                </View>}
            </View>
        );

    }

    onNavigationStateChange = (navState) => {


        this.setState({
            canGoBack: navState.canGoBack,
            canGoForward: navState.canGoForward,
            url: navState.url,
        });
        this.setHeaderTitle(navState.title);

    };

}
;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },


});
