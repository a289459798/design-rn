import * as React from 'react';
import {View} from 'react-native';
import ICTouchableNativeFeedback from '../touchable/ICTouchableNativeFeedback';
import ICFont from '../theme/ICFont';
import ICText from '../text/ICText';

export default class ICHeaderTitleICHeaderButton extends React.PureComponent {

    render() {
        if (this.props.items) {
            return (

                <View style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                }, this.props.style]}>
                    {this.props.items.map((v, k) => {
                        if (v.icon) {
                            return <ICTouchableNativeFeedback
                                onPress={v.onPress}
                                eventId={v.eventId}
                                key={k}><View style={{padding: ICFont.calc(5)}}>
                                <v.icon name={v.name} size={v.size ? ICFont.calc(v.size) : ICFont.calc(24)}/>
                            </View></ICTouchableNativeFeedback>;
                        } else if (v.text) {
                            return <ICTouchableNativeFeedback
                                onPress={v.onPress}
                                eventId={v.onPress}
                                key={k}><View style={{padding: ICFont.calc(5)}}>
                                <ICText
                                    style={{fontSize: v.size ? ICFont.calc(v.size) : ICFont.calc(14)}}>{v.text}</ICText>
                            </View></ICTouchableNativeFeedback>;
                        }
                    })}
                </View>
            );
        }
        return null;
    }
}
