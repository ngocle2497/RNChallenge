import React, { memo, useCallback, useRef, useState } from 'react'
import isEqual from 'react-fast-compare'
import Animated, { useAnimatedGestureHandler, runOnJS, useSharedValue, useAnimatedStyle, interpolate, withSpring } from 'react-native-reanimated'
import { Block, Text } from '@components'
import { StyleSheet } from 'react-native'
import { SIZE_MENU } from './constant'
import { ItemMenu } from './type'
import { ItemTab } from './ItemTab'
import { FlingGestureHandler, Directions } from 'react-native-gesture-handler'

const styles = StyleSheet.create({
    circle: {
        width: SIZE_MENU * 2,
        height: SIZE_MENU * 2,
        marginBottom: -SIZE_MENU
    },
    fling: {
        position: 'absolute',
        width: '100%',
        height: 100,
        backgroundColor: 'transparent',
        bottom: 0
    }
})
const dataMenu: ItemMenu[] = [
    {
        id: 0,
        route: 'tab1',
        color: '#feca57'
    },
    {
        id: 1,
        route: 'tab2',
        color: '#ff6b6b'
    },
    {
        id: 2,
        route: 'tab3',
        color: '#48dbfb'
    },
    {
        id: 3,
        route: 'tab4',
        color: '#1dd1a1'
    },
    {
        id: 4,
        route: 'tab5',
        color: '#f368e0'
    },
    {
        id: 5,
        route: 'tab6',
        color: '#ff9f43'
    }

]
const CircleMenuComponent = () => {
    const _wrapFling = useRef(null)
    const selectedIndex = useSharedValue(0)
    const [indexMenu, setIndexMenu] = useState(0)
    const _leftFlingGesture = useAnimatedGestureHandler({
        onActive: () => {
            const newValue = Math.round(selectedIndex.value + 1)
            selectedIndex.value = withSpring(newValue)
            runOnJS(setIndexMenu)(-newValue)
        }
    })
    const _rightFlingGesture = useAnimatedGestureHandler({
        onActive: () => {
            const newValue = Math.round(selectedIndex.value - 1)
            selectedIndex.value = withSpring(Math.round(selectedIndex.value - 1))
            runOnJS(setIndexMenu)(-newValue)
        }
    })
    const _renderItem = useCallback((item: ItemMenu, index: number, arr: ItemMenu[]) => {
        return (
            <ItemTab {...{ item, index, sizeArr: arr.length, centerPoint: { x: SIZE_MENU, y: SIZE_MENU } }} key={item.id.toString()} />
        )
    }, [dataMenu])
    const _handleTab = (index: number) => {
        return index < 0 ? dataMenu[dataMenu.length + index] : dataMenu[index]
    }
    const menuStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${interpolate(selectedIndex.value, [0, 1], [0, 360 / dataMenu.length])}deg` }]
    }))
    return (
        <Block block justifyContent={'flex-end'} middle>
            <Text>{_handleTab(indexMenu % 6).route}</Text>
            <Animated.View style={[styles.circle, menuStyle]}>
                {dataMenu.map(_renderItem)}
            </Animated.View>
            <FlingGestureHandler onGestureEvent={_leftFlingGesture} direction={Directions.RIGHT} simultaneousHandlers={[_wrapFling]}>
                <Animated.View style={[styles.fling]}>
                    <FlingGestureHandler onGestureEvent={_rightFlingGesture} direction={Directions.LEFT} ref={_wrapFling}>
                        <Animated.View style={[styles.fling]} />
                    </FlingGestureHandler>
                </Animated.View>
            </FlingGestureHandler>
        </Block >
    )
}

export const CircleMenu = memo(CircleMenuComponent, isEqual)