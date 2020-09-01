import React, { memo, useCallback, useState, useMemo } from 'react'
import { View, StyleSheet, Image, Dimensions, LayoutChangeEvent } from 'react-native'
import isEqual from 'react-fast-compare';
import { images } from '@assets/image';
import Animated, { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withDecay, } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler'
import { clampV2, withBouncingV2 } from '@animated';
import { useSafeArea } from 'react-native-safe-area-context';
const IMAGE_WIDTH = 250
const IMAGE_HEIGHT = 150
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

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
/**
 * option 1
 */
const bounceX = SCREEN_WIDTH - IMAGE_WIDTH
const bounceY = SCREEN_HEIGHT - IMAGE_HEIGHT
const BouncingComponent = () => {
    const [sizeWrap, setSizeWrap] = useState({ width: 0, height: 0 })
    /**
     * option 2
     */
    // const bounceX = useMemo(() => sizeWrap.width - IMAGE_WIDTH, [sizeWrap])
    // const bounceY = useMemo(() => sizeWrap.height - IMAGE_HEIGHT, [sizeWrap])

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
            translateX.value = withBouncingV2(withDecay({ velocity: velocityX, },), 0, bounceX)
            translateY.value = withBouncingV2(withDecay({ velocity: velocityY, }), 0, bounceY)
        }
    })
    const _onLayout = useCallback(({ nativeEvent: { layout: { height, width } } }: LayoutChangeEvent) => {
        setSizeWrap({ width, height })
    }, [])
    const cardStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }, { translateY: translateY.value }]
        }
    })
    return (
        <View style={[styles.container]} onLayout={_onLayout}>
            <PanGestureHandler {...{ onGestureEvent }}>
                <Animated.View style={[styles.wrapImg, cardStyle]}>
                    <Image style={[styles.img]} source={images['card1']} />
                </Animated.View>
            </PanGestureHandler>
        </View>
    )
}

export const Bouncing = memo(BouncingComponent, isEqual)