
# react-native-design-rn

## react-native 版本要求

`react-native -v >= 0.61.5`

## 下载

`npm install @ichong/design-rn --save`

## 安装 

#### iOS平台

`cd ios && pod install`

#### Android平台会自动link

## 文档

**[ICAvatar](https://reactnativeelements.com/docs/avatar)**

**[ICBadge](https://reactnativeelements.com/docs/badge)**

**[ICBase](#ICBase)**

**[ICRouterBase](#ICRouterBase)**

**[ICScreen](#ICScreen)**

**[ICButton](https://reactnativeelements.com/docs/button)**

**[ICGradientButton](#ICGradientButton)**

**[CheckBox](https://reactnativeelements.com/docs/checkbox)**

**[ICGradientView](#ICGradientView)**

### ICBase

通用API组件

```js
import {View} from 'react-native';
import {ICBase, ICFont, ICTouchableWithoutFeedback} from '@ichong/design-rn';

export class Base extends ICBase{
    
    static navigationOptions = ({navigation, defaultOptions}, params = {}) => {
        return ICBase.navigationOptions({navigation}, {
            headerLeft: (
                <ICTouchableWithoutFeedback
                    onPress={() => {
                        let status = params.onLeftPress && params.onLeftPress();
                        if (!status) {
                            navigation.pop();
                        }
                    }}
                >
                    <View style={{padding: 10, backgroundColor:'red'}}>
                        {/*自行引入组件库*/}
                        {/*<Icon name={'back'} size={18}/>*/}
                    </View>
                </ICTouchableWithoutFeedback>
            ),
            headerTitleStyle: {fontSize: ICFont.calc(17), fontWeight: 'bold'},
            ...params,
        });
    };
    
    // 跳转下一个路由
    // this.pushView('NavigationName',{data:'data'});
    // 返回上一个路由
    //this.popView();
    // 返回顶部路由
    //this.popToTop()
    
    constructor(props) {
        super(props);
        this.setStyle({
            contentBackgroundColor: '#f1f1f1',
        });
    }

    getAppName() {
        return '爱宠采购';
    }

    checkLogin() {
        const {user} = this.props;
        if (!user.user.phone) {
            this.pushView('Auth');
            return;
        }
    }

    isObjectValueEqual(a, b) {
        let aProps = Object.getOwnPropertyNames(a);
        let bProps = Object.getOwnPropertyNames(b);
        if (aProps.length !== bProps.length) {
            return false;
        }
        for (let i = 0; i < aProps.length; i++) {
            let propName = aProps[i];
            if (a[propName] !== b[propName]) {
                return false;
            }
        }
        return true;
    }
    
}
```

### ICRouterBase

路由API组件

```js
import {ICRouterBase} from '@ichong/design-rn';

export class Base extends ICBase{
    
    // 跳转下一个路由
    // this.pushView('NavigationName',{data:'data'});
    // 返回上一个路由
    //this.popView();
    // 获取上一个路由传参
    //this.params.xxx;
    // 通过WebView打开链接
    //this.openURL();
    
}
```

### ICScreen

渐变色按钮

```js
import {ICScreen} from '@ichong/design-rn';

ICScreen.width;
ICScreen.height;
ICScreen.iphonx;
ICScreen.iphone12;
ICScreen.iphone;
ICScreen.android;
ICScreen.calc(100);
ICScreen.calcWithHeight(100);
```

### ICGradientButton

渐变色按钮

```js
import {ICGradientButton} from '@ichong/design-rn';

<ICGradientButton
    title={'渐变色按钮'}
    end={{x: 1, y: 0}}
    colors={['#FFBB00', '#FF9D00']}
    disabledColor={['#E1E1E1', '#E1E1E1']}
    disabledTitleStyle={{color: '#fff'}}
    titleStyle={{fontSize:15}}
    // loading={true}
    // disabled={true}
    buttonStyle={{width:100, height:45, borderRadius:22.5}}
    onPress={() => alert('点击渐变色按钮')}
/>
```
### ICGradientView

渐变色View

```js
import {View} from 'react-native';
import {ICGradientView} from '@ichong/design-rn';

<ICGradientView
    end={{x: 1, y: 0}}
    colors={['#FFBB00', '#FF9D00']}
    style={{width:100, height:100}}
>

    <View style={{width:100, height:100}}/>
</ICGradientView>
```

