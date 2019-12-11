import * as React from 'react';
import {BackHandler, Platform, StatusBar} from 'react-native';
import {Analytics} from 'react-native-umshare';

export default class ICBase extends React.PureComponent {

    #time;
    #interval;

    constructor(props) {
        super(props);

        if (new.target === ICBase) {
            throw new Error('不能直接实例化');
        }

        this.#time = [];
        this.#interval = [];
    }

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

    replaceView(component, props) {

        this.props.navigation.replace(component, props);
    }

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

    setTimeout(fn, time): number {
        let time = setTimeout(fn, time);
        return this.#time.push(time);
    }

    setInterval(): number {
        let time = setInterval(fn, time);
        return this.#interval.push(time);
    }

    clearTimeout(id: number) {
        let timer = this.#time[id - 1];
        if (timer) {
            clearTimeout(timer);
        }
        this.#time[id - 1] = null;
    }

    clearInterval(id: number) {
        let timer = this.#interval[id - 1];
        if (timer) {
            clearInterval(timer);
        }
        this.#interval[id - 1] = null;
    }

    onBackButtonPressAndroid = () => {
        let nav = this.props.navigation.getParam('nav');
        if (nav) {
            if (nav.routes[nav.index].routes.length == 1) {
                if (this.lastBackPressed && (this.lastBackPressed + 2000 >= Date.now())) {

                    BackHandler.exitApp();
                    return false;
                }
                this.lastBackPressed = Date.now();

                Toast.show('再按一次退出爱宠采购');
            } else if (this.getHandleBack) {
                this.getHandleBack();
            } else {
                this.popView();
            }

            return true;
        }
        return false;

    };

    componentWillUnmount(): void {
        if (this.#time && this.#time.length > 0) {
            this.#time.forEach((v) => {
                if (v) {
                    clearTimeout(v);
                }
            });
        }
        if (this.#interval && this.#interval.length > 0) {
            this.#interval.forEach((v) => {
                if (v) {
                    clearInterval(v);
                }
            });
        }
        this.#time = [];
        this.#interval = [];

        Analytics.pageEnd(this.props.navigation.state.routeName);
        if (Platform.OS == 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
        }
    }

    componentDidMount(): void {

        Analytics.pageBegin(this.props.navigation.state.routeName);
        if (Platform.OS == 'android') {
            StatusBar.setBackgroundColor('#fff');
            StatusBar.setTranslucent(false);
            BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
        }

    }
}
