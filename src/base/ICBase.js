import * as React from 'react';
import {
    BackHandler,
    Platform,
    StatusBar,
    SafeAreaView,
    View,
    StyleSheet,
    Linking,
    InteractionManager,
} from 'react-native';
import {Analytics} from 'react-native-umshare';
import ICHeaderView from '../header/ICHeaderView';
import ICHeaderButton from '../header/ICHeaderButton';
import ICHeaderTitle from '../header/ICHeaderTitle';
import ICFont from '../theme/ICFont';
import ICColor from '../theme/ICColor';
import Toast from '@ichong/react-native-toast';
import ICRouterBase from './ICRouterBase';

let navigationTitle;
export default class ICBase extends ICRouterBase {

    static navigationOptions = ({navigation, defaultOptions}, params = {}) => {
        navigationTitle = navigation.getParam('title') || params.title;
        return {
            headerStyle: Object.assign({
                height: 44,
                backgroundColor: '#fff',
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: '#F0F0F0',
                shadowOpacity: 0,
                elevation: 0,
            }, navigation.getParam('headerStyle'), params.headerStyle),
            headerRight: <View
                style={{paddingRight: 10}}>{navigation.getParam('headerRight') || params.headerRight}</View>,
            headerLeft: navigation.getParam('headerLeft') || params.headerLeft,
            title: navigation.getParam('title') || params.title,
            headerTitleStyle: Object.assign({
                fontSize: ICFont.calc(16),
                fontWeight: 'normal',
            }, navigation.getParam('headerTitleStyle'), params.headerTitleStyle),
            headerTintColor: navigation.getParam('headerTintColor') || params.headerTintColor || '#333',
            headerTitle: navigation.getParam('headerTitle') || params.headerTitle,
        };
    };

    #time;
    #interval;
    #statueStyle = {
        barStyle: 'dark-content',
        backgroundColor: '#fff',
        translucent: false,
    };
    #style = {
        safeAreaBackgroundColor: '#fff',
        contentBackgroundColor: '#f1f1f1',
    };

    constructor(props) {
        super(props);

        if (new.target === ICBase) {
            throw new Error('不能直接实例化');
        }

        this.#time = [];
        this.#interval = [];
    }

    setHeader(view) {
        this.props.navigation.setParams({
            header: view,
        });
    }

    setNavigationOptions(data) {
        this.props.navigation.setParams(data);
    }

    setHeaderTitleView(view) {
        this.props.navigation.setParams({
            headerTitle: view,
        });
    }

    setHeaderLeft(items) {
        this.props.navigation.setParams({
            headerLeft: <ICHeaderButton items={items}/>,
        });
    }

    setHeaderLeftView(view) {
        this.props.navigation.setParams({
            headerLeft: view,
        });
    }

    setHeaderRightView(view) {
        this.props.navigation.setParams({
            headerRight: view,
        });
    }

    setHeaderRight(items) {
        this.props.navigation.setParams({
            headerRight: <ICHeaderButton items={items}/>,
        });
    }

    setHeaderTitle(title) {
        this.props.navigation.setParams({
            title: title,
        });
    }


    renderView() {
        return null;
    }

    setStatusStyle(style) {
        this.#statueStyle = {
            ...this.#statueStyle,
            ...style,
        };
    }

    setStyle(style) {
        this.#style = {
            ...this.#style,
            ...style,
        };
    }

    getContentStyle() {
        return {};
    }

    renderHeader() {
        return null;
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: this.#style.safeAreaBackgroundColor}}>
                <StatusBar
                    barStyle={this.#statueStyle.barStyle}
                    backgroundColor={this.#statueStyle.backgroundColor}
                    translucent={this.#statueStyle.translucent}
                />
                {this.renderHeader()}
                <View
                    style={[{flex: 1, backgroundColor: this.#style.contentBackgroundColor}, this.getContentStyle()]}>
                    {this.renderView()}
                </View>
            </SafeAreaView>
        );
    }

    setTimeout(fn, time): number {
        let t = setTimeout(fn, time);
        return this.#time.push(t);
    }

    setInterval(fn, time): number {
        let t = setInterval(fn, time);
        return this.#interval.push(t);
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

    getAppName() {
        return '应用';
    }

    onBackButtonPressAndroid = () => {
        let nav = this.props.navigation.getParam('nav');

        if (nav) {
            if (nav.routes.length == 1) {
                if (this.lastBackPressed && (this.lastBackPressed + 2000 >= Date.now())) {

                    BackHandler.exitApp();
                    return false;
                }
                this.lastBackPressed = Date.now();

                Toast.show('再按一次退出' + this.getAppName());
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

        let pageTitle = this.getPageTitle();
        if (pageTitle) {
            Analytics.pageEnd(pageTitle);
        }
        if (Platform.OS == 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
        }

        this.pageUnLoad();
    }

    /**
     * 页面加载完成(动画执行完成)
     */
    pageShow() {
    }

    /**
     * 页面卸载，类似componentDidMount
     */
    pageUnLoad() {
    }

    /**
     * 页面加载，类似componentDidMount
     */
    pageLoad() {
    }

    dispatch(callback: CallableFunction) {
        this.props.dispatch(callback);
    }

    componentDidMount(): void {

        this.pageLoad();

        this.runAfterInteractions(() => {
            this.pageShow();
        });

        let pageTitle = this.getPageTitle();
        if (pageTitle) {
            Analytics.pageBegin(pageTitle);
        }

        if (Platform.OS == 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
        }

    }

    getPageTitle() {

        if (this.pageTitle) {
            return this.pageTitle;
        }
        return navigationTitle;
    }


    runAfterInteractions(task: () => {}, timeout = 300) {
        // InteractionManager.runAfterInteractions(() => {
        this.setTimeout(() => {
            task();
        }, timeout);
        // });
    }
}
