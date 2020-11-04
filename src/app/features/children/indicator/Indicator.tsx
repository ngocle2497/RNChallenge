import { onScrollEvent } from '@animated';
import { Block, Text, ImageRemote } from '@components';
import React, { memo, useCallback, useEffect, useState } from 'react'
import isEqual from 'react-fast-compare';
import { StyleSheet, ListRenderItemInfo, LayoutChangeEvent } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { interpolateNode, useSharedValue, useValue } from 'react-native-reanimated';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

type ItemData = {
    id: number;
    category: string,
    image: string;
}

const data: ItemData[] = [
    { id: 1, category: 'Love', image: 'https://images.unsplash.com/photo-1426543881949-cbd9a76740a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80' },
    { id: 2, category: 'Car', image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80' },
    { id: 3, category: 'Cat', image: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80' },
    { id: 4, category: 'Sky', image: 'https://images.unsplash.com/photo-1505051508008-923feaf90180?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80' },
    { id: 5, category: 'Pop', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80' }
]

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: '100%'
    },
    linear: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.5
    },
    text: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    tabs: {
        position: 'absolute',
        right: 0,
        left: 0
    },
    indicator: {
        position: 'absolute',
        height: 3,
        backgroundColor: '#FFFFFF',
        left: 0,
        bottom: -10
    }
});

const LineIndicator = memo(({ arrWidth, scrollX, screenWidth }: { screenWidth: number, arrWidth: number[], scrollX: Animated.Value<number> }) => {
    const inputRange = data.map((_, i) => i * screenWidth)
    const width = interpolateNode(scrollX, { inputRange: inputRange, outputRange: arrWidth })
    const translateX = interpolateNode(scrollX, { inputRange: inputRange, outputRange: arrWidth })
    return (
        <Animated.View style={[styles.indicator, { width: width, transform: [{ translateX }] }]} />
    )
}, isEqual)

const Tab = memo(({ item, onChange }: { item: ItemData, onChange: (width: number) => void }) => {
    const _onLayout = useCallback(({ nativeEvent: { layout: { width } } }: LayoutChangeEvent) => {
        onChange(width)
    }, [])
    return (
        <Text onLayout={_onLayout} style={[styles.text]}>{item.category}</Text>
    )
}, isEqual)

const Tabs = memo(({ scrollX, screenWidth }: { screenWidth: number, scrollX: Animated.Value<number> }) => {
    const [arrWidth, setArrWidth] = useState<number[]>([])
    const _onChangeLayout = (width: number) => {
        setArrWidth(ar => ar.concat([width]))
    }
    const _renderItem = (item: ItemData) => <Tab {...{ item, onChange: _onChangeLayout }} />
    return (
        <Block pointerEvents={'none'} direction={'row'} marginTop={50} style={[styles.tabs]} justifyContent={'space-evenly'} block>
            {data.map(_renderItem)}
            {data.length === arrWidth.length &&
                <LineIndicator {...{ arrWidth, scrollX, screenWidth }} />
            }
        </Block>
    )
}, isEqual)

const IndicatorComponent = () => {
    const [sizeView, setSizeView] = useState({ width: 0, height: 0 })
    const scrollX = useValue(0)
    const _renderItem = ({ item, index }: ListRenderItemInfo<ItemData>) =>
        <Block key={item.id} block width={sizeView.width} height={sizeView.height}>
            <ImageRemote style={[styles.img]} resizeMode={'cover'} imgSource={item.image} />
            <LinearGradient style={[styles.linear]} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} colors={['rgba(255,255,255,0.7)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']} />
        </Block>
    const _keyExtractor = (item: ItemData) => item.id.toString()
    const _onLayout = useCallback(({ nativeEvent: { layout: { height, width } } }: LayoutChangeEvent) => setSizeView({ height, width }), [])
    return (
        <Block block onLayout={_onLayout}>
            <AnimatedFlatList scrollEventThrottle={16} onScroll={onScrollEvent({ x: scrollX })} removeClippedSubviews={false} data={data} renderItem={_renderItem} keyExtractor={_keyExtractor} pagingEnabled horizontal showsHorizontalScrollIndicator={false} />
            <Tabs {...{ scrollX, screenWidth: sizeView.width }} />
        </Block>
    )
}

export const Indicator = memo(IndicatorComponent, isEqual)