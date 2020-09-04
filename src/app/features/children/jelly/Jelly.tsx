import React, { memo } from 'react'
import { View, StyleSheet } from 'react-native'
import isEqual from 'react-fast-compare'
import { ImageTypes } from '@assets/image'
import { Card } from './Card'
import { SPACE_ITEM } from './constant'
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, event, withTiming } from 'react-native-reanimated'
import { FlatList } from 'react-native-gesture-handler'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
    },
    spaceItem: {
        height: SPACE_ITEM
    },
    contentStyle: {
        alignItems: 'center'
    }
})
export interface JellyData {
    id: number;
    uri: ImageTypes;
}
const data: JellyData[] = [
    {
        id: 1,
        uri: 'card1'
    },
    {
        id: 2,
        uri: 'card2'
    },
    {
        id: 3,
        uri: 'card3'
    },
    {
        id: 4,
        uri: 'card4'
    },
    {
        id: 5,
        uri: 'card5'
    },
    {
        id: 6,
        uri: 'card6'
    },
    {
        id: 7,
        uri: 'card7'
    },
    {
        id: 8,
        uri: 'card8'
    },
    {
        id: 9,
        uri: 'card9'
    },
    {
        id: 10,
        uri: 'card10'
    },
    {
        id: 11,
        uri: 'card11'
    },
    {
        id: 12,
        uri: 'card12'
    }
]
const JellyComponent = () => {
    const velocity = useSharedValue(0)
    const time = useSharedValue(new Date().getTime())
    const y = useSharedValue(0)

    const onScrollEvent = useAnimatedScrollHandler({
        onBeginDrag: (event) => {
            y.value = event.contentOffset.y;
        },
        onScroll: (event) => {
            const dt = new Date().getTime() - time.value;
            const dy = event.contentOffset.y - y.value;
            velocity.value = dt === 0 ? 0 : dy / dt;
            time.value = new Date().getTime();
            y.value = event.contentOffset.y
        },
        onMomentumEnd: (event) => {
            velocity.value = withTiming(0)
        },
    })

    const _renderItem = ({ item }: { item: JellyData }) => {
        return (
            <Card {...{ item, velocity }} />
        )
    }
    const _keyExtractor = (item: JellyData) => item.id.toString()
    const _ItemSeparatorComponent = () => (
        <View style={[styles.spaceItem]} />
    )
    return (
        <View style={[styles.root]}>
            <AnimatedFlatList
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={_renderItem}
                onScroll={onScrollEvent}
                scrollEventThrottle={16}
                contentContainerStyle={[styles.contentStyle]}
                ItemSeparatorComponent={_ItemSeparatorComponent}
                keyExtractor={_keyExtractor} />
        </View>
    )
}

export const Jelly = memo(JellyComponent, isEqual)