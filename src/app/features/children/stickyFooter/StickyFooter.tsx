import { onScrollEvent } from '@animated'
import { Block, Icon, SizeBox, Text } from '@components'
import React, { memo, useCallback, useMemo, useState } from 'react'
import isEqual from 'react-fast-compare'
import { LayoutChangeEvent, StyleSheet, LayoutRectangle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, { interpolateColors, interpolateNode, useValue, Extrapolate } from 'react-native-reanimated'

const TEXT = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

const HEIGHT_STICKY = 60
const PADDING = 10

const styles = StyleSheet.create({
    container: {
        padding: PADDING,
        backgroundColor: 'white'
    },
    containerFunc: {
        height: HEIGHT_STICKY,
        width: '100%',
    },
    sticky: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: HEIGHT_STICKY,
        backgroundColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
    },
    wrapRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: PADDING,
        backgroundColor: '#ffffff',
        paddingHorizontal: 5,
        borderTopColor: 'gray'
    }
})

const Item = memo(() => {
    return (
        <Block paddingVertical={15}>
            <Text fontWeight={'bold'} fontSize={'FONT_17'}>Lorem</Text>
            <SizeBox height={10} />
            <Text>{TEXT}</Text>
        </Block>
    )
}, isEqual)

const StickyFooterComponent = () => {
    const y = useValue(0)
    const [wrapView, setWrapView] = useState<LayoutRectangle | null>(null)
    const [bottomFooter, setBottomFooter] = useState<LayoutRectangle | null>(null)
    const topSticky = useMemo(() => bottomFooter && wrapView ? bottomFooter.y - wrapView.height + bottomFooter.height : 30, [wrapView, bottomFooter])
    const inputRange = useMemo(() => [-1, 0, topSticky - 30, topSticky, topSticky + 1], [topSticky])

    const translateY = interpolateNode(y, {
        inputRange,
        outputRange: [0, 0, 0, 0, -1]
    })

    const shadowColor = interpolateColors(y, {
        inputRange,
        outputColorRange: ['#000', '#000', '#000', '#000', 'rgba(0,0,0,0)']
    })
    const elevation = interpolateNode(y, {
        inputRange,
        outputRange: [2, 2, 2, 2, 0]
    })
    const borderTopWidth = interpolateNode(y, {
        inputRange,
        outputRange: [0, 0, 0, 0, StyleSheet.hairlineWidth],
        extrapolate: Extrapolate.CLAMP
    })
    const _onLayoutSticky = useCallback((e: LayoutChangeEvent) => {
        setBottomFooter(e.nativeEvent.layout)
    }, [])
    const _onLayoutWrap = useCallback((e: LayoutChangeEvent) => {
        setWrapView(e.nativeEvent.layout)
    }, [])
    return (
        <Block onLayout={_onLayoutWrap} block color={'white'}>
            <Animated.ScrollView
                onScroll={onScrollEvent({ y })}
                scrollEventThrottle={16} contentContainerStyle={[styles.container]}>
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Block onLayout={_onLayoutSticky} style={[styles.containerFunc]} />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
            </Animated.ScrollView>
            {(bottomFooter && wrapView) && <Animated.View pointerEvents={'box-none'} style={[styles.containerFunc, styles.sticky, { shadowColor, elevation, transform: [{ translateY }] }]}>
                <Animated.View pointerEvents={'box-none'} style={[styles.wrapRow, { borderTopWidth }]}>
                    <Block pointerEvents={'box-none'}>
                            <Icon onPress={()=>{}} icon={'chat'} />
                    </Block>
                    <Block pointerEvents={'box-none'} block alignItems={'flex-end'}>
                            <Icon icon={'search'} />
                    </Block>
                </Animated.View>
            </Animated.View>}
        </Block>
    )
}

export const StickyFooter = memo(StickyFooterComponent, isEqual)