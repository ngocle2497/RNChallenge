import { onScrollEvent, timing } from '@animated';
import { Block, Text, ImageRemote } from '@components';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import isEqual from 'react-fast-compare';
import { StyleSheet, ListRenderItemInfo, LayoutChangeEvent } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { interpolateColors, interpolateNode, set, useCode, useSharedValue, useValue } from 'react-native-reanimated';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

type ItemData = {
    id: number;
    color: string;
    category: string,
    image: string;
}

const data: ItemData[] = [
    { id: 1, color: '#FFC312', category: 'Family', image: 'https://images.unsplash.com/photo-1426543881949-cbd9a76740a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80' },
    { id: 2, color: '#A3CB38', category: 'Car', image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80' },
    { id: 3, color: '#0652DD', category: 'Beauty Pet', image: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80' },
    { id: 4, color: '#5758BB', category: 'Sunset', image: 'https://images.unsplash.com/photo-1505051508008-923feaf90180?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80' },
    { id: 5, color: '#6F1E51', category: 'Pop', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80' }
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
        borderRadius: 3,
        left: 0,
        bottom: -10
    }
});

const LineIndicator = memo(({ arrWidthX, scrollX, screenWidth }: { screenWidth: number, arrWidthX: { width: number, x: number, id: number }[], scrollX: Animated.Value<number> }) => {
    const inputRange = useMemo(() => data.map((_, i) => i * screenWidth), [screenWidth])
    const width = interpolateNode(scrollX, { inputRange: inputRange, outputRange: arrWidthX.sort((a, b) => a.id - b.id).map(x => x.width) })
    const translateX = interpolateNode(scrollX, { inputRange: inputRange, outputRange: arrWidthX.sort((a, b) => a.id - b.id).map(x => x.x) })
    const opacity = useValue(0)
    const backgroundColor = interpolateColors(scrollX, { inputRange, outputColorRange: data.map(x => x.color) })
    useCode(() => [set(opacity, timing({ to: 1 }))], [])
    return (
        <Animated.View style={[styles.indicator, { opacity, backgroundColor, width: width, transform: [{ translateX }] }]} />
    )
}, isEqual)

const Tab = memo(({ item, onChange, index }: { item: ItemData, index: number, onChange: (width: number, x: number, id: number) => void }) => {
    const _onLayout = useCallback(({ nativeEvent: { layout: { width, x } } }: LayoutChangeEvent) => {
        onChange(width, x, index)
    }, [])
    return (
        <Text onLayout={_onLayout} style={[styles.text]}>{item.category}</Text>
    )
}, isEqual)

const Tabs = memo(({ scrollX, screenWidth }: { screenWidth: number, scrollX: Animated.Value<number> }) => {
    const [arrWidthX, setArrWidthX] = useState<{ width: number, x: number, id: number }[]>([])
    const _onChangeLayout = useCallback((width: number, x: number, id: number) => {
        setArrWidthX(ar => ar.concat([{ width, x, id }]))
    }, [])
    const _renderItem = useCallback((item: ItemData, index: number) => <Tab key={item.id} {...{ index, item, onChange: _onChangeLayout }} />, [])
    return (
        <Block pointerEvents={'none'} direction={'row'} marginTop={50} style={[styles.tabs]} justifyContent={'space-evenly'} block>
            {data.map(_renderItem)}
            {data.length === arrWidthX.length &&
                <LineIndicator {...{ arrWidthX, scrollX, screenWidth }} />
            }
        </Block>
    )
}, isEqual)

const IndicatorComponent = () => {
    const [sizeView, setSizeView] = useState({ width: 0, height: 0 })
    const scrollX = useValue(0)
    const _renderItem = useCallback(({ item, index }: ListRenderItemInfo<ItemData>) =>
        <Block key={item.id} block width={sizeView.width} height={sizeView.height}>
            <ImageRemote style={[styles.img]} styleDefault={[styles.img]} resizeMode={'cover'} imgSource={item.image} />
            <LinearGradient style={[styles.linear]} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} colors={['rgba(255,255,255,0.7)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']} />
        </Block>, [sizeView])
    const _keyExtractor = useCallback((item: ItemData) => item.id.toString(), [])
    const _onLayout = useCallback(({ nativeEvent: { layout: { height, width } } }: LayoutChangeEvent) => setSizeView({ height, width }), [])
    return (
        <Block block onLayout={_onLayout}>
            <AnimatedFlatList
                scrollEventThrottle={16}
                onScroll={onScrollEvent({ x: scrollX })}
                // removeClippedSubviews={false}
                data={data}
                renderItem={_renderItem}
                keyExtractor={_keyExtractor}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false} />
            <Tabs {...{ scrollX, screenWidth: sizeView.width }} />
        </Block>
    )
}

export const Indicator = memo(IndicatorComponent, isEqual)