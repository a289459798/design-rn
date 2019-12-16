/**
 * Created by Rambo on 2016/9/14.
 */

'use strict';
import React, {
    Component,
} from 'react';
import {
    StyleSheet,
    WebView,
    View, Text, TouchableWithoutFeedback, PanResponder, StatusBar,
} from 'react-native';


import ICBase from '../base/ICBase';
import ICWebView from './ICWebView';
import ICScreen from '../theme/ICScreen';
import ICImage from '../image/ICImage';

export default class ICWebViewComponent extends ICBase {

    static navigationOptions = ({navigation}) => {

        return ICBase.navigationOptions({navigation}, {
            title: navigation.state.params.title || '加载中...',
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            canGoBack: false,
            canGoForward: false,
            webViewTitle: '',
        };

        this.showBack = true;
    }

    getUrlParams() {
        return '';
    }

    onMessage(e) {

    }

    _renderWebView() {
        if (this.params.uri) {
            return (
                <ICWebView
                    ref="webview"
                    source={{
                        uri: `${decodeURIComponent(this.params.uri)}${this.params.uri.indexOf('?') == -1 ? '?' : '&'}${this.getUrlParams()}`,
                        method: this.params.method,
                        body: this.params.body,
                        headers: this.params.headers,
                    }}
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
                    startInLoadingState={true}
                    onLoadStart={() => this.loaded = false}

                    onLoadEnd={() => {
                        this.loaded = true;
                        console.log(this.refs);
                        this.refs.webview.injectJavaScript('document.querySelector(".handleForm' +
                            ' .header").style.backgroundSize = \'100%\'');
                    }}
                    onMessage={(e) => {
                        this.onMessage(e);
                    }}
                >

                </ICWebView>
            );
        } else if (this.params.html || this.props.html) {

            let html = `
                <html><head>
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" id="viewport" name="viewport">
<style> img {max-width: 100%}</style>
</head><body>${this.params.html || this.props.html}</body></html>
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
                    onMessage={(e) => {
                        this.onMessage(e);
                    }}
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

                {this.state.canGoBack || this.state.canGoForward ? <View ref={(r) => this.back = r} style={{
                    height: ICScreen.iphonx ? 79 : 40,
                    backgroundColor: '#fff',
                    borderTopColor: '#e2e2e2',
                    borderTopWidth: StyleSheet.hairlineWidth,
                }}>
                    <View
                        style={{height: 40, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <TouchableWithoutFeedback
                            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                            onPress={() => {
                                if (this.state.canGoBack) {
                                    this.refs.webview.goBack();
                                }
                            }}>
                            <View style={{marginRight: 80, padding: 10}}>
                                <ICImage source={{}}/>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                            onPress={() => {
                                if (this.state.canGoForward) {
                                    this.refs.webview.goForward();
                                }
                            }}>
                            <View style={{padding: 10}}>
                                <ICImage source={{}}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View> : null}
            </View>
        );

    }

    onNavigationStateChange = (navState) => {


        this.setState({
            canGoBack: navState.canGoBack,
            canGoForward: navState.canGoForward,
        });
        this.setHeaderTitle(this.params.title || this.props.title || navState.title);

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
