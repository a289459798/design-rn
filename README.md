
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

**[ICBase](#icbase)**

**[ICRouterBase](#icrouterbase)**

**[ICButton](https://reactnativeelements.com/docs/button)**

**[ICGradientButton](#icgradientbutton)**

**[CheckBox](https://reactnativeelements.com/docs/checkbox)**

**[ICGradientView](#icgradientview)**

**[ICImage](#icimage)**

**[ICImageBrowser](#icimagebrowser)**

**[ICInput](https://reactnativeelements.com/docs/input)**

**[ICListView](#iclistview)**

**[ICBottomSheet](#icbottomsheet)**

**[ICModal](#icmodal)**

**[ICShadow](#icshadow)**

**[ICSplashScreen](#icsplashscreen)**

**[ICText](https://reactnativeelements.com/docs/text)**

**[ICColor](#iccolor)**

**[ICScreen](#icscreen)**

**[ICScreen](#icscreen)**

## 使用

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
        return '应用名称';
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

export class Base extends ICRouterBase{
    
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
    buttonStyle={{width: 100, height: 45, borderRadius: 22.5}}
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

    <View style={{width: 100, height: 100}}/>
</ICGradientView>
```

### ICImage

加载网络图片

```js
import {ICImage} from '@ichong/design-rn';

<ICImage
    style={styles.productImage}
    source={{uri: 'https://www.5ichong.com/assets/images/header-logo.png'}}
    defaultSource={require('默认图片路径（加载中和加载失败都会展示此图片）')}
/>
```

### ICImageBrowser

查看图片

```js
import {ICImageBrowser} from '@ichong/design-rn';

ICImageBrowser.show([{image: 'https://www.5ichong.com/assets/images/header-logo.png'}], 0)
```

### ICListView

列表

```js
import {ICListView} from '@ichong/design-rn';

<ICListView
    style={{flex: 1}}
    data={data}
    refreshing={false}
    onRefresh={() => {
        // 执行下拉刷新
    }}
    loading={
        // 是否展示上拉加载loading
        // true：展示并加载  false：不展示不加载
    }
    hasMore={
        // 是否还有数据可加载
        // true：展示并加载  false：不展示不加载
    }
    onLoadMore={() => {
        // 执行上啦加载
    }}
    renderItem={({item, index}) => (
        <View style={{width: 100, height: 45, backgroundColor: 'red', marginBottom: 10}}/>
    )}
/>
```

### ICBottomSheet

底部弹窗

```js
import {ICBottomSheet} from '@ichong/design-rn';

// 打开
this.iCBottomSheet.show();

// 关闭
this.iCBottomSheet.hide();

<ICBottomSheet
    ref={(r) => this.iCBottomSheet = r}
    height={300}
    contentStyle={{
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    }}
    title={"选择所在地区"}
>
    <View style={{flex: 1, backgroundColor: 'red'}}/>
</ICBottomSheet>
```

### ICModal

弹窗

```js
import {ICModal} from '@ichong/design-rn';

// 打开
this.iCModal.show();

// 关闭
this.iCModal.hide();

<ICModal
    ref={r => this.iCModal = r}
    style={{flex: 1}}
>
    <View style={{flex: 1, backgroundColor: 'red'}}/>
</ICModal>
```

### ICShadow

阴影View

```js
import {ICShadow} from '@ichong/design-rn';

<ICShadow 
    type={'severe'}
>
    <View style={{width: 100, height: 100, backgroundColor: '#fff'}}/>
</ICShadow>
```

### ICSplashScreen

开屏API

```js
import {ICSplashScreen} from '@ichong/design-rn';

// 展示广告
ICSplashScreen.showAd('网络图片地址', 3/**展示时间S**/, (res) => {
    if (!res) {
        // 点击消失
        ICSplashScreen.hide();
    }
});

ICSplashScreen.show();

ICSplashScreen.hide();
```

### ICColor

通用颜色

```js
import {ICColor} from '@ichong/design-rn';

ICColor.primary;
ICColor.white;
ICColor.gray;
ICColor.darkGray;
ICColor.lightGray;
ICColor.error;
// ios 暗黑模式颜色适配 ===暂定===
ICColor.setColor('白色正常模式','暗黑模式');
// ios 暗黑模式图片适配 ===暂定===
ICColor.setImage('白色正常模式','暗黑模式');
```

### ICScreen

适配屏幕API（等比缩放，750*1334 尺寸）

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
