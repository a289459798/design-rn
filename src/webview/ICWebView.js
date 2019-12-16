import * as React from 'react';
import WebView, {WebViewProps} from 'react-native-webview';

export default class ICWebView extends WebView<WebViewProps> {

    // render() {
    //     return <WebView
    //         originWhitelist={['*']}
    //         domStorageEnabled={true}
    //         javaScriptEnabled={true}
    //         applicationNameForUserAgent={'ichongapp'}
    //         useWebKit={true}
    //         {...this.props}
    //     />;
    // }
}
