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

    _renderWebView() {
        if (this.getParams('uri')) {
            return (
                <ICWebView
                    ref="webview"
                    source={{
                        uri: `${decodeURIComponent(this.getParams('uri'))}${this.getParams('uri').indexOf('?') == -1 ? '?' : '&'}${this.getUrlParams()}`,
                        method: this.getParams('method') || '',
                        body: this.getParams('body'),
                        headers: this.getParams('headers') || {},
                    }}
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
                    onLoadProgress={({nativeEvent}) => {
                        this.progress && this.progress.setNativeProps({
                            style: {width: nativeEvent.progress * 100 + '%'},
                        });
                    }}
                    onLoadEnd={() => {
                        this.loaded = true;
                        this.refs.webview.injectJavaScript('document.querySelector(".handleForm' +
                            ' .header").style.backgroundSize = \'100%\'');
                    }}
                    onMessage={(e) => {
                        this.onMessage(e);
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
                    ref="webview"
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

                {this.getParams('uri') && <View ref={(r) => this.back = r} style={{
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
                                this.refs.webview.goBack();
                            }
                        }} name={'chevron-left'} color={this.state.canGoBack ? '#666' : '#ddd'} size={24}/>

                        <Icon style={{padding: 10}} onPress={() => {
                            if (this.state.canGoForward) {
                                this.refs.webview.goForward();
                            }
                        }} name={'chevron-right'} color={this.state.canGoForward ? '#666' : '#ddd'} size={24}/>

                        <Icon style={{padding: 10}} onPress={() => {
                            Share.share({
                                url: this.state.url,
                                message: this.getParams('title'),
                                title: this.getParams('title'),
                            });

                        }} name={'share-variant'} color={'#666'} size={20}/>

                        <Icon style={{padding: 10}} onPress={() => {
                            this.refs.webview.reload();

                        }} name={'refresh'} color={'#666'} size={22}/>
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

        setTimeout(() => this.refs.webview && this.refs.webview.injectJavaScript('document.querySelector(".handleForm' +
            ' .header").style.backgroundSize = \'100%\''), 1000);

    };

}
;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },


});
