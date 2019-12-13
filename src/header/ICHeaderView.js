import * as React from 'react';
import {View} from 'react-native';
import ICTouchableNativeFeedback from '../touchable/ICTouchableNativeFeedback';
import ICFont from '../theme/ICFont';
import ICText from '../text/ICText';
import ICHeaderButton from './ICHeaderButton';

export default class ICHeaderView extends React.PureComponent {

    render() {
        return (
            <View style={[{
                width: '100%',
                height: 44,
                backgroundColor: '#fff',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }, this.props.style]}>
                {this.props.leftButtons ?
                    <ICHeaderButton items={this.props.leftButtons} style={this.props.leftStyle}/>
                    : this.props.leftComponent ? this.props.leftComponent : null}
                {this.props.centerComponent ? this.props.centerComponent :
                    <View style={[{flex: 1, backgroundColor: 'black', fontSize: ICFont.f16}, this.props.centerStyle]}>

                    </View>}
                {this.props.rightButtons ?
                    <ICHeaderButton items={this.props.rightButtons} style={this.props.rightStyle}/>
                    : this.props.rightComponent ? this.props.rightComponent : null}
            </View>
        );
    }
}
