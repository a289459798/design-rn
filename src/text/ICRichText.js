import * as React from 'react';
import PropTypes from 'prop-types';
import ICText from '../text/ICText';

export default class ICRichText extends React.PureComponent<TextProps, any> {

    static propTypes = {
        text: PropTypes.string,
        data: PropTypes.object,
    };

    render() {
        let text = '|~|' + this.props.text + '|~|';
        data = text.split(this.props.data.text);
        let view = data.map((v, k) => {
            let t = v.replace('|~|', '');
            if (k == data.length - 1) {
                return <ICText>{t}</ICText>;
            }
            return <ICText>{t}<ICText {...this.props.data.props}>{this.props.data.text}</ICText></ICText>;
        });
        return (
            <ICText {...this.props}>
                {view}
            </ICText>
        );
    }
}
