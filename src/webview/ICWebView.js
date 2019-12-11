import * as React from 'react';
import WebView from 'react-native-webview';

export default class ICWebView extends React.PureComponent {

    render() {
        return <WebView
            originWhitelist={['*']}
            domStorageEnabled={true}
            javaScriptEnabled={true}
            applicationNameForUserAgent={'ichongapp'}
        />;
    }
}
