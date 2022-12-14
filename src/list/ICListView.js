import * as React from 'react';
import {FlatList, FlatListProps, View, Text, ActivityIndicator, RefreshControl} from 'react-native';

export default class ICListView extends React.PureComponent<FlatListProps, any> {

    _renderFooter() {
        let {loading, hasMore} = this.props;
        return this.props.renderFooter || (
            <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 10, paddingBottom: 10}}>
                {loading ? (<View style={{flexDirection: 'row'}}>
                    <ActivityIndicator size="small"/>
                    <View style={{justifyContent: 'center', marginLeft: 5}}>
                        <Text style={{
                            fontSize: 12,
                            color: '#666',
                        }}>正在加载更多</Text>
                    </View>
                </View>) : null}
            </View>
        );
    }

    _renderHeader() {
        if (this.props.renderHeader) {
            return this.props.renderHeader();
        }
        return (null);
    }

    scrollToItem(params) {
        this.ref && this.ref.scrollToOffset(params);
    }

    scrollToOffset(params) {
        this.ref && this.ref.scrollToOffset(params);
    }

    scrollToIndex(params) {
        this.ref && this.ref.scrollToIndex(params);
    }

    scrollToEnd() {
        this.ref.scrollToEnd();
    }

    render() {
        return (
            <FlatList
                ref={(e) => this.ref = e}
                ListHeaderComponent={() => this._renderHeader()}
                ListFooterComponent={() => this._renderFooter()}
                ItemSeparatorComponent={this.props.renderSeparator}
                onEndReached={() => this.props.hasMore && !this.props.loading ? this.props.onLoadMore() : null}
                onEndReachedThreshold={0.5}
                keyExtractor={(item, key) => key + ''}
                enableEmptySections={true}
                {...this.props}
            />
        );
    }
}
