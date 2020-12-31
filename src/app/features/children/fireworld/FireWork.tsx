import { Block } from '@components'
import { APP_COLOR } from '@config'
import React, { memo, useEffect, useState } from 'react'
import isEqual from 'react-fast-compare'
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

const SIZE_BULLET = 14

const SCALE_TAIL1 = 0.9
const SCALE_TAIL2 = 0.7
const SCALE_TAIL3 = 0.5
const SCALE_TAIL4 = 0.3
const SCALE_TAIL5 = 0.1

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: APP_COLOR
    },
    container: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0,
        top: 0
    },
    bullet: {
        width: SIZE_BULLET,
        height: SIZE_BULLET,
        borderRadius: SIZE_BULLET / 2,
        backgroundColor: 'red',
        position: 'absolute',
        alignSelf: 'center',
        bottom: -SIZE_BULLET,
    },
    tail1: {
        width: SIZE_BULLET * SCALE_TAIL1,
        height: SIZE_BULLET * SCALE_TAIL1,
        borderRadius: (SIZE_BULLET / 2) * SCALE_TAIL1,
    },
    tail2: {
        width: SIZE_BULLET * SCALE_TAIL2,
        height: SIZE_BULLET * SCALE_TAIL2,
        borderRadius: (SIZE_BULLET / 2) * SCALE_TAIL2,
    },
    tail3: {
        width: SIZE_BULLET * SCALE_TAIL3,
        height: SIZE_BULLET * SCALE_TAIL3,
        borderRadius: (SIZE_BULLET / 2) * SCALE_TAIL3,
    },
    tail4: {
        width: SIZE_BULLET * SCALE_TAIL4,
        height: SIZE_BULLET * SCALE_TAIL4,
        borderRadius: (SIZE_BULLET / 2) * SCALE_TAIL4,
    },
    tail5: {
        width: SIZE_BULLET * SCALE_TAIL5,
        height: SIZE_BULLET * SCALE_TAIL5,
        borderRadius: (SIZE_BULLET / 2) * SCALE_TAIL5,
    }
})

const withSpringC = (value: number) => {
    "worklet"
    return withSpring(value, { damping: 50, mass: 1, })
}

const Item = memo(() => {
    const { top } = useSafeAreaInsets()
    const { height, width } = useWindowDimensions()
    const bulletX = useSharedValue(0)
    const bulletY = useSharedValue(0)

    const tail1X = useDerivedValue(() => withSpringC(bulletX.value))
    const tail1Y = useDerivedValue(() => withSpringC(bulletY.value))

    const tail2X = useDerivedValue(() => withSpringC(tail1X.value))
    const tail2Y = useDerivedValue(() => withSpringC(tail1Y.value))

    const tail3X = useDerivedValue(() => withSpringC(tail2X.value))
    const tail3Y = useDerivedValue(() => withSpringC(tail2Y.value))

    const tail4X = useDerivedValue(() => withSpringC(tail3X.value))
    const tail4Y = useDerivedValue(() => withSpringC(tail3Y.value))

    const tail5X = useDerivedValue(() => withSpringC(tail4X.value))
    const tail5Y = useDerivedValue(() => withSpringC(tail4Y.value))
    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx: any) => {
            ctx.startX = bulletX.value;
            ctx.startY = bulletY.value;
        },
        onActive: (event, ctx) => {
            bulletX.value = ctx.startX + event.translationX;
            bulletY.value = ctx.startY + event.translationY;
        }
    })

    const styleBullet = useAnimatedStyle(() => ({ transform: [{ translateX: bulletX.value }, { translateY: bulletY.value }] }))
    const styleTail1 = useAnimatedStyle(() => ({ transform: [{ translateX: tail1X.value }, { translateY: tail1Y.value }] }))
    const styleTail2 = useAnimatedStyle(() => ({ transform: [{ translateX: tail2X.value }, { translateY: tail2Y.value }] }))
    const styleTail3 = useAnimatedStyle(() => ({ transform: [{ translateX: tail3X.value }, { translateY: tail3Y.value }] }))
    const styleTail4 = useAnimatedStyle(() => ({ transform: [{ translateX: tail4X.value }, { translateY: tail4Y.value }] }))
    const styleTail5 = useAnimatedStyle(() => ({ transform: [{ translateX: tail5X.value }, { translateY: tail5Y.value }] }))
    useEffect(() => {
        setTimeout(() => {
            bulletY.value = withTiming(-((height - top) / 2 + Math.random() * ((height - top) / 2 - 15)))
            bulletX.value = withTiming(20)
        }, 1000)

        return () => {

        }
    }, [])
    return (
        <Animated.View style={[styles.container]}>
            <Animated.View style={[styles.bullet, styles.tail1, styleTail1]} />
            <Animated.View style={[styles.bullet, styles.tail2, styleTail2]} />
            <Animated.View style={[styles.bullet, styles.tail3, styleTail3]} />
            <Animated.View style={[styles.bullet, styles.tail4, styleTail4]} />
            <Animated.View style={[styles.bullet, styles.tail5, styleTail5]} />
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View style={[styles.bullet, styleBullet]} />
            </PanGestureHandler>
        </Animated.View>
    )
}, () => true)

const FireWorkComponent = () => {
    return (
        <SafeAreaView style={[styles.root]}>
            <Block block color={'black'}>
                <Item />
            </Block>
        </SafeAreaView>
    )
}

export const FireWork = memo(FireWorkComponent, isEqual)