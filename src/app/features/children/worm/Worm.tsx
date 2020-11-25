import { onScrollEvent, trunc, withTransition } from '@animated'
import { Block, ImageRemote, SizeBox } from '@components'
import React, { memo, useCallback, useState } from 'react'
import isEqual from 'react-fast-compare'
import { ListRenderItemInfo, LayoutChangeEvent, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Animated, { add, cond, divide, eq, floor, greaterThan, interpolateColors, multiply, sub, useValue } from 'react-native-reanimated'
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
const SIZE_DOT = 12
const SPACING = 15
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    containerPage: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        flexDirection: 'row'
    },
    dot: {
        width: SIZE_DOT,
        height: SIZE_DOT,
        backgroundColor: '#000'
    },
    row: {
        flexDirection: 'row'
    },
    worm: {
        height: SIZE_DOT,
        backgroundColor: '#fff',
        alignSelf: 'center',
        left: 0,
        right: 0,
        position: 'absolute',
    }
})


interface Image {
    id: number;
    src: string
}

const data: Image[] = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80'
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80'
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80'
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1589750602846-60028879da9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80'
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1514316703755-dca7d7d9d882?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1552519507-88aa2dfa9fdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80'
    },
    {
        id: 7,
        src: 'https://images.unsplash.com/photo-1550732520-59f139547c93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80'
    }
]

const Indicator = memo(({ scrollX, sizeView }: { scrollX: Animated.Value<number>, sizeView: { width: number, height: number } }) => {
    const offset = divide(scrollX, sizeView.width)
    const maxRight = add(multiply(data.length, SIZE_DOT), multiply(sub(data.length, 1), SPACING))
    const dotOffset = multiply(sub(offset, trunc(offset)), 2)
    const xPos = multiply(floor(offset), add(SIZE_DOT, SPACING))
    const left = cond(greaterThan(dotOffset, 1),
        add(xPos, multiply(add(SIZE_DOT, SPACING), sub(dotOffset, 1)))
        , xPos
    )
    const right = cond(greaterThan(dotOffset, 1),
        sub(maxRight, add(xPos, SIZE_DOT, multiply(1, add(SIZE_DOT, SPACING)))),
        sub(maxRight, add(xPos, SIZE_DOT, multiply(dotOffset, add(SIZE_DOT, SPACING)))))
    const backgroundColor = interpolateColors(withTransition(eq(dotOffset, 0)),
        {
            inputRange: [0, 1],
            outputColorRange: ["#2ecc71", "#FFFFFF",]
        })
    return (
        <Animated.View style={[styles.worm, { backgroundColor, right, left }]} />
    )
}, isEqual)

const ItemDot = memo(({ index }: { index: number }) => {
    return (
        <Animated.View style={[styles.row]}>
            <Animated.View style={[styles.dot]} />
            {index !== data.length - 1 && <SizeBox width={SPACING} />}
        </Animated.View>
    )
}, isEqual)

const ItemImage = memo(({ item, sizeView }: { item: Image, index: number, sizeView: { width: number, height: number } }) => {
    return (
        <Block width={sizeView.width} justifyContent={'center'} height={sizeView.height}>
            <ImageRemote resizeMode={'cover'} style={[styles.image]} imgSource={item.src} />
        </Block>
    )
}, isEqual)

const WormComponent = () => {
    const scrollX = useValue(0)
    const [sizeView, setSizeView] = useState<{ width: number, height: number }>({ width: 0, height: 0 })
    const _renderItem = useCallback(({ index, item }: ListRenderItemInfo<Image>) => <ItemImage {...{ item, index, sizeView }} />, [sizeView])
    const _kexExtractor = useCallback((item: Image) => item.id.toString(), [])
    const _renderDot = useCallback((item: Image, index: number) => <ItemDot key={item.id} index={index} />, [sizeView])
    const _onLayout = useCallback(({ nativeEvent: { layout: { height, width } } }: LayoutChangeEvent) => {
        setSizeView({ height, width })
    }, [])
    return (
        <Block block onLayout={_onLayout}>
            <AnimatedFlatList data={data}
                renderItem={_renderItem}
                keyExtractor={_kexExtractor}
                onScroll={onScrollEvent({ x: scrollX })}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                scrollEventThrottle={16} />
            <Animated.View style={[styles.containerPage]}>
                {data.map(_renderDot)}
                <Indicator {...{ scrollX, sizeView }} />
            </Animated.View>
        </Block>
    )
}

export const Worm = memo(WormComponent, isEqual)