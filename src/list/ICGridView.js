import * as React from 'react';
import {FlatList, FlatListProps} from 'react-native';
import ICListView from './ICListView';

export default class ICGridView extends React.Component<FlatListProps, any> {

    render() {
        return <ICListView
            {...this.props}
            columnWrapperStyle={{
                justifyContent: 'space-between',
                ...this.props.columnWrapperStyle,
            }}
            columnWrapperStyle={this.props.column}
        >

        </ICListView>;
    }
}
