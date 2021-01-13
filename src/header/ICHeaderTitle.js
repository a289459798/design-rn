/**
 * Created by zhangzy on 16/7/28.
 */

'use strict';
import React, {PureComponent} from 'react';
import {View} from 'react-native';
import ICFont from '../theme/ICFont';
import ICText from '../text/ICText';
import ICImage from '../image/ICImage';
import ICTouchableNativeFeedback from '../touchable/ICTouchableNativeFeedback';

export default class ICHeaderTitle extends PureComponent {

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ICTouchableNativeFeedback
                    eventId={this.props.eventId}
                    onPress={this.props.onPress}
                >
                    {this.props.image ? (
                        <ICImage
                            style={[{width: 50, height: 50}, this.props.style]}
                            source={this.props.image}
                        />
                    ) : (this.props.title ? (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <ICText style={{
                                fontSize: ICFont.calc(16),
                                color: '#fff',
                                marginBottom: 2
                            }}>{this.props.title}</ICText>
                            <ICText style={{fontSize: ICFont.calc(13), color: '#fff'}}>{this.props.subTitle}</ICText>
                        </View>
                    ) : this.props.view)}
                </ICTouchableNativeFeedback>
            </View>
        );
    }

}
