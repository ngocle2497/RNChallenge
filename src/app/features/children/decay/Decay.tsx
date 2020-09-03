import React, { memo } from 'react'
import { StyleSheet, useWindowDimensions, StatusBar, Platform } from 'react-native'
import isEqual from 'react-fast-compare';
import { Block, Img } from '@components';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, withDecay, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { useHeaderHeight } from '@react-navigation/stack';
import { clampV2 } from '@animated';
import { useSafeArea } from 'react-native-safe-area-context';
const CARD_WIDTH = 250
const CARD_HEIGHT = 150
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
});

const DecayComponent = () => {
    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)
    const headerHeight = useHeaderHeight()
    const { bottom } = useSafeArea()
    const { width, height } = useWindowDimensions()
    const clampX: [number, number] = [0, width - CARD_WIDTH]
    const clampY: [number, number] = [0, height - headerHeight - CARD_HEIGHT - (Platform.OS === 'android' ? StatusBar.currentHeight ?? 20 : (bottom))]
    const _onGestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startX = translateX.value
            ctx.startY = translateY.value
        },
        onActive: (event, ctx) => {
            translateX.value = clampV2(ctx.startX + event.translationX, clampX[0], clampX[1])
            translateY.value = clampV2(ctx.startY + event.translationY, clampY[0], clampY[1])
        },
        onEnd: (event, _) => {
            translateX.value = withDecay({ velocity: event.velocityX, clamp: clampX })
            translateY.value = withDecay({ velocity: event.velocityY, clamp: clampY })
        }
    })
    const boxStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }, { translateY: translateY.value }]
    }))
    return (
        <Block block>
            <PanGestureHandler onGestureEvent={_onGestureHandler}>
                <Animated.View style={[styles.card, boxStyle]}>
                    <Img style={[styles.img]} source={'card1'} />
                </Animated.View>
            </PanGestureHandler>
        </Block>
    )
}

export const Decay = memo(DecayComponent, isEqual)