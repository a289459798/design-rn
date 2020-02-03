import * as React from 'react';
import {FlatList, FlatListProps} from 'react-native';
import ICListView from './ICListView';

export default class ICGridView extends React.PureComponent<FlatListProps, any> {

    render() {
        return <ICListView
            {...this.props}
            ref={(e) => this.ref = e}
            columnWrapperStyle={{
                justifyContent: 'space-between',
                ...this.props.columnWrapperStyle,
            }}
        >

        </ICListView>;
    }
}
