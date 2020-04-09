import * as React from 'react';

export default class ICBase extends React.Component {

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
}
