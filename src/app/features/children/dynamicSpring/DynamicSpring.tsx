import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
import isEqual from 'react-fast-compare';
import { Block, Img } from '@components';
import Animated, { useSharedValue, useAnimatedGestureHandler, useAnimatedStyle, withSpring, useDerivedValue } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
const CARD_WIDTH = 250
const CARD_HEIGHT = 150
const DEFAULT_DAMPING = 15
const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
    otherCard: {
        position: 'absolute'
    }
});

const DynamicSpringComponent = () => {
    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)
    const translateX1 = useDerivedValue(() => withSpring(translateX.value, { damping: DEFAULT_DAMPING }))
    const translateY1 = useDerivedValue(() => withSpring(translateY.value, { damping: DEFAULT_DAMPING }))
    const translateX2 = useDerivedValue(() => withSpring(translateX1.value, { damping: DEFAULT_DAMPING }))
    const translateY2 = useDerivedValue(() => withSpring(translateY1.value, { damping: DEFAULT_DAMPING }))
    const _onGestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startX = translateX.value
            ctx.startY = translateY.value
        },
        onActive: (event, ctx) => {
            translateX.value = ctx.startX + event.translationX
            translateY.value = ctx.startY + event.translationY
        },
        onEnd: () => {
            translateX.value = withSpring(0)
            translateY.value = withSpring(0)
        }
    })
    const boxStyle1 = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }, { translateY: translateY.value }]
    }))
    const boxStyle2 = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX1.value }, { translateY: translateY1.value }]
    }))
    const boxStyle3 = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX2.value }, { translateY: translateY2.value }]
    }))
    return (
        <Block block middle justifyContent={'center'}>
            <Animated.View style={[styles.card, styles.otherCard, boxStyle3]}>
                <Img style={[styles.img]} source={'card2'} />
            </Animated.View>
            <Animated.View style={[styles.card, styles.otherCard, boxStyle2]}>
                <Img style={[styles.img]} source={'card3'} />
            </Animated.View>
            <PanGestureHandler onGestureEvent={_onGestureHandler}>
                <Animated.View style={[styles.card, boxStyle1]}>
                    <Img style={[styles.img]} source={'card1'} />
                </Animated.View>
            </PanGestureHandler>
        </Block>
    )
}

export const DynamicSpring = memo(DynamicSpringComponent, isEqual)