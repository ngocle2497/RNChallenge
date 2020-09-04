import React, { memo } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import isEqual from 'react-fast-compare';
import { Block, Text, Icon, SizeBox } from '@components';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, useDerivedValue, withTiming, interpolateNode, Extrapolate, interpolate } from 'react-native-reanimated';
import { Header } from './Header';
import { snapPoint, clampV2 } from '@animated';
import { Bottom } from './Bottom';
import { ButtonIcon, WRAP_BUTTON_HEIGHT } from './ButtonIcon';
import { CenterFeature, MARGIN_TOP_ROW } from './CenterFeature';

export const SUB_SCREEN = 10
export const PADDING_HORIZONTAL = 10
const DEFAULT_HEIGHT = 150
const MAX_HEIGHT = 400
const styles = StyleSheet.create({
    wrap: {
        backgroundColor: '#ffffff',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        // marginHorizontal: 10,
        paddingHorizontal: PADDING_HORIZONTAL,
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row'
    }
});

const TransitionComponent = () => {
    const { width: SCREEN_WIDTH } = useWindowDimensions()
    const translationY = useSharedValue(0)
    const height = useDerivedValue(() => clampV2(translationY.value + DEFAULT_HEIGHT, DEFAULT_HEIGHT, MAX_HEIGHT))

    const progress = useDerivedValue(() => interpolate(translationY.value,
        [0, MAX_HEIGHT - DEFAULT_HEIGHT],
        [0, 1],
        Extrapolate.CLAMP
    ))
    const heightSpace = useDerivedValue(() => interpolate(progress.value, [0, 1], [10, 70]))
    const _onGestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startY = translationY.value
        },
        onActive: (event, ctx) => {
            translationY.value = ctx.startY + event.translationY
        },
        onEnd: (event) => {
            translationY.value = withTiming(translationY.value + event.velocityY * 0.2 > (MAX_HEIGHT - DEFAULT_HEIGHT) / 2 ? (MAX_HEIGHT - DEFAULT_HEIGHT) : 0)
        }
    })
    const wrapStyle = useAnimatedStyle(() => ({
        width: SCREEN_WIDTH - SUB_SCREEN,
        height: height.value
    }))
    const spaceStyle = useAnimatedStyle(() => ({
        height: heightSpace.value
    }))

    const widthIcon = useDerivedValue(() => interpolate(progress.value, [0, 1], [(SCREEN_WIDTH - SUB_SCREEN - PADDING_HORIZONTAL * 2) / 6, (SCREEN_WIDTH - SUB_SCREEN - PADDING_HORIZONTAL * 2) / 4], Extrapolate.CLAMP))
    const button1Style = useAnimatedStyle(() => ({ width: widthIcon.value }))
    const button2Style = useAnimatedStyle(() => ({ width: widthIcon.value }))
    const button3Style = useAnimatedStyle(() => ({ width: widthIcon.value }))
    const button4Style = useAnimatedStyle(() => ({ width: widthIcon.value }))
    const button5Style = useAnimatedStyle(() => ({ width: widthIcon.value }))
    const button6Style = useAnimatedStyle(() => ({ width: widthIcon.value }))
    const rowStyle = useAnimatedStyle(() => ({
        transform: [{
            translateX: interpolate(progress.value, [0, 0.3, 1], [0, -60, -(SCREEN_WIDTH - SUB_SCREEN - PADDING_HORIZONTAL * 2)], Extrapolate.CLAMP),
        }, { translateY: interpolate(progress.value, [0, 0.3, 1], [0, 60, WRAP_BUTTON_HEIGHT + MARGIN_TOP_ROW], Extrapolate.CLAMP) }]
    }))
    return (
        <Block block middle color={'rgba(0,0,0,0.2)'}>
            <PanGestureHandler onGestureEvent={_onGestureHandler}>
                <Animated.View style={[styles.wrap, wrapStyle]}>
                    <Header {...{ progress }} />
                    <Animated.View style={[spaceStyle]} />
                    <Block block>
                        <Block direction={'row'} justifyContent={'flex-start'}>
                            <Animated.View style={[button1Style]}>
                                <ButtonIcon active progress={progress} icon={'wi_fi'} tx={'main:transition:txWiFi'} />
                            </Animated.View>
                            <Animated.View style={[button2Style]}><ButtonIcon active progress={progress} icon={'ring'} tx={'main:transition:txRing'} /></Animated.View>
                            <Animated.View style={[button3Style]}><ButtonIcon progress={progress} icon={'flash'} tx={'main:transition:txFlash'} /></Animated.View>
                            <Animated.View style={[button4Style]}><ButtonIcon progress={progress} icon={'save_power'} tx={'main:transition:txSavePower'} /></Animated.View>
                            <Animated.View style={[styles.row, rowStyle]}>
                                <Animated.View style={[button5Style]}>
                                    <ButtonIcon progress={progress} icon={'data'} tx={'main:transition:txData'} />
                                </Animated.View>
                                <Animated.View style={[button6Style]}>
                                    <ButtonIcon progress={progress} icon={'bluetooth'} tx={'main:transition:txBluetooth'} />
                                </Animated.View>
                            </Animated.View>
                        </Block>
                        <CenterFeature {...{ progress }} />
                    </Block>
                    <Bottom />
                </Animated.View>
            </PanGestureHandler>
        </Block>
    )
}

export const Transition = memo(TransitionComponent, isEqual)