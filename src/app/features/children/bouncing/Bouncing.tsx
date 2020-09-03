import React, { memo, useMemo } from 'react'
import { StyleSheet, Image, useWindowDimensions, StatusBar, Platform } from 'react-native'
import isEqual from 'react-fast-compare';
import { images } from '@assets/image';
import Animated, { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withDecay, } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler'
import { clampV2, withBouncingV2 } from '@animated';
import { useSafeArea } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/stack';
import { Block } from '@components';
const IMAGE_WIDTH = 250
const IMAGE_HEIGHT = 150

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    wrapImg: {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        overflow: 'hidden'
    },
    img: {
        resizeMode: 'stretch',
        width: '100%',
        height: '100%'
    }
});
const BouncingComponent = () => {
    const headerHeight = useHeaderHeight()
    const { bottom } = useSafeArea()
    const { width, height } = useWindowDimensions()
    const bounceX = useMemo(() => width - IMAGE_WIDTH, [width])
    const bounceY = useMemo(() => height - headerHeight - IMAGE_HEIGHT - (Platform.OS === 'android' ? StatusBar.currentHeight ?? 20 : (bottom)), [bottom, headerHeight, height])

    const translateY = useSharedValue(0)
    const translateX = useSharedValue(0)
    const onGestureEvent = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startX = translateX.value;
            ctx.startY = translateY.value;
        },
        onActive: (event, ctx) => {
            translateX.value = clampV2(ctx.startX + event.translationX, 0, bounceX)
            translateY.value = clampV2(ctx.startY + event.translationY, 0, bounceY)
        },
        onEnd: ({ velocityX, velocityY }, _) => {
            translateX.value = withBouncingV2(withDecay({ velocity: velocityX, }), 0, bounceX)
            translateY.value = withBouncingV2(withDecay({ velocity: velocityY, }), 0, bounceY)
        }
    })
    const cardStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }, { translateY: translateY.value }]
        }
    })
    return (
        <Block block color={'#FFFFFF'}>
            <PanGestureHandler {...{ onGestureEvent }}>
                <Animated.View style={[styles.wrapImg, cardStyle]}>
                    <Image style={[styles.img]} source={images['card1']} />
                </Animated.View>
            </PanGestureHandler>
        </Block>
    )
}

export const Bouncing = memo(BouncingComponent, isEqual)