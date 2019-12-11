import * as React from 'react';
import {FlatList, FlatListProps} from 'react-native';

export default class ICListView extends React.PureComponent<FlatListProps, any> {

    _renderFooter(loading, hasMore) {
        if (loading && hasMore) {
            return (
                <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 10, paddingBottom: 10}}>

                    <View style={{flexDirection: 'row'}}>
                        <ActivityIndicator
                            animating={true}
                            size="small"
                        />
                        <View style={{justifyContent: 'center', marginLeft: 5}}>
                            <Text style={{fontSize: 12, color: '#666'}}>正在加载更多</Text>
                        </View>
                    </View>
                </View>
            );
        }
        return this.props.renderFooter ? this.props.renderFooter() : null;

    }

    _renderHeader() {
        if (this.props.renderHeader) {
            return this.props.renderHeader();
        }
        return (null);
    }

    _renderRefresh() {
        if (typeof this.props.isRefreshing != 'undefined') {
            return (<RefreshControl
                refreshing={this.props.isRefreshing}
                onRefresh={() => {
                    this.props.onRefresh();
                }}
            />);
        }
        return (null);
    }

    render() {
        return <FlatList
            ListHeaderComponent={() => this._renderHeader()}
            ListFooterComponent={() => this._renderFooter(this.props.loading, this.props.hasMore)}
            ItemSeparatorComponent={this.props.renderSeparator}
            onEndReached={() => this.props.hasMore && !this.props.loading ? this.props.onLoadMore() : null}
            onEndReachedThreshold={0.5}
            keyExtractor={(item, key) => key + ''}
            enableEmptySections={true}
            {...this.props}>
        </FlatList>;
    }
}
