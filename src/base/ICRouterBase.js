import * as React from 'react';
import {Linking} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';

export default class ICRouterBase extends React.Component {

    get params() {
        let params = this.props.navigation.state.params || {};
        if (params.isLinking) {
            params[params.key] = params;
        }
        return params;
    }

    popToTop() {
        this.props.navigation.popToTop();
    }

    popView(n = 1) {
        this.props.navigation.pop(n);
    }

    // 替换当前路由
    replaceView(component, props) {
        this.props.navigation.replace(component, props);
    }

    // 替换上级某个路由并返回
    replaceWithDelta(component, delta, props) {
        let key = '';
        if (this.props.nav && this.props.nav.routes[this.props.nav.index]) {
            for (let i in this.props.nav.routes[this.props.nav.index].routes) {
                if (i == this.props.nav.routes[this.props.nav.index].routes.length - delta) {
                    key = this.props.nav.routes[this.props.nav.index].routes[i].key;
                    break;
                }
            }
        }
        const replaceAction = StackActions.replace({
            key: key,
            routeName: component,
            params: props,
        });
        this.props.navigation.dispatch(replaceAction);
        for (let i = 1; i < delta; i++) {
            this.popView();
        }
    }

    // 替换一个上级路由并返回
    replacePrevious(component, props) {
        let key = '';
        if (this.props.nav && this.props.nav.routes[this.props.nav.index]) {
            for (let i in this.props.nav.routes[this.props.nav.index].routes) {
                if (i == this.props.nav.routes[this.props.nav.index].routes.length - 2) {
                    key = this.props.nav.routes[this.props.nav.index].routes[i].key;
                    break;
                }
            }
        }
        const replaceAction = StackActions.replace({
            key: key,
            routeName: component,
            params: props,
        });
        this.props.navigation.dispatch(replaceAction);
        this.popView();
    }

    // 替换下个路由
    replaceNext(component, props) {
        let key = '';
        let length = 1;
        if (this.props.nav && this.props.nav.routes[this.props.nav.index]) {
            for (let i in this.props.nav.routes[this.props.nav.index].routes) {
                if (i == this.props.nav.routes[this.props.nav.index].routes.length - 1) {
                    length = this.props.nav.routes[this.props.nav.index].routes.length;
                    key = this.props.nav.routes[this.props.nav.index].routes[i].key;
                    break;
                }
            }
        }
        if (length > 1) {
            const replaceAction = StackActions.replace({
                key: key,
                routeName: component,
                params: props,
            });
            this.props.navigation.dispatch(replaceAction);
        } else {
            this.pushView(component, props);
        }
    }

    replaceWithScreen(oldComponent, newComponent, props) {
        let key = '';
        let n = 1;
        if (this.props.nav && this.props.nav.routes[this.props.nav.index]) {
            for (let i in this.props.nav.routes[this.props.nav.index].routes) {
                if (oldComponent == this.props.nav.routes[this.props.nav.index].routes[i].routeName) {
                    key = this.props.nav.routes[this.props.nav.index].routes[i].key;
                    n = this.props.nav.routes[this.props.nav.index].routes.length - 1 - i;
                    break;
                }
            }
        }
        const replaceAction = StackActions.replace({
            key: key,
            routeName: newComponent,
            params: props,
        });
        this.props.navigation.dispatch(replaceAction);
        this.popView(n);
    }

    pushView(component, props, type = '') {
        this.props.navigation.navigate(component, {...props, transition: type});
    }

    push(component, props, type = '') {
        this.props.navigation.push(component, {...props, transition: type});
    }

    reset(component) {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: component})],
        });
        this.props.navigation.dispatch(resetAction);
    }

    openURL(url, data) {
        if (!url) {
            alert('链接不存在');
            return;
        }
        if (url.indexOf('http://') == 0 || url.indexOf('https://') == 0) {
            this.pushView('WebView', {uri: url, ...data});
            return;
        }
        Linking.openURL(url);
    }

}
