import React, { memo } from 'react'
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import isEqual from 'react-fast-compare';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';
import { ButtonIcon } from './ButtonIcon';
import { Block } from '@components';
import { SUB_SCREEN, PADDING_HORIZONTAL } from './Transition';

export const MARGIN_TOP_ROW = 10

const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: MARGIN_TOP_ROW
    },
    wrap2: {
        flexDirection: 'row',
        marginTop: MARGIN_TOP_ROW,
        justifyContent: 'flex-end'
    }
});

interface CenterFeatureProps {
    progress: Animated.SharedValue<number>
}

const CenterFeatureComponent = ({ progress }: CenterFeatureProps) => {
    const { width: SCREEN_WIDTH } = useWindowDimensions()
    const defaultProgress = useSharedValue(1)
    const wrapStyle = useAnimatedStyle(() => ({
        opacity: interpolate(progress.value, [0, 0.5, 1], [0, 0, 1], Extrapolate.CLAMP),
        translateY: interpolate(progress.value, [0, 1], [-30, 0], Extrapolate.CLAMP),
    }))
    const wrap2Style = useAnimatedStyle(() => ({
        opacity: interpolate(progress.value, [0, 0.5, 1], [0, 0, 1], Extrapolate.CLAMP),
        translateX: interpolate(progress.value, [0, 1], [30, 0], Extrapolate.CLAMP),
        translateY: interpolate(progress.value, [0, 1], [-30, 0], Extrapolate.CLAMP),
    }))
    return (
        <Block>
            <Animated.View style={[styles.wrap2,wrap2Style]}>
                <Block width={(SCREEN_WIDTH - SUB_SCREEN - PADDING_HORIZONTAL * 2) / 4}>
                    <ButtonIcon progress={defaultProgress} icon={'moon'} tx={'main:transition:txMoon'} />
                </Block>
                <Block width={(SCREEN_WIDTH - SUB_SCREEN - PADDING_HORIZONTAL * 2) / 4}>
                    <ButtonIcon progress={defaultProgress} icon={'air_mode'} tx={'main:transition:txAirPlan'} />
                </Block>
            </Animated.View>
            <Animated.View style={[styles.wrap, wrapStyle]}>
                <Block width={(SCREEN_WIDTH - SUB_SCREEN - PADDING_HORIZONTAL * 2) / 4}>
                    <ButtonIcon active progress={defaultProgress} icon={'location'} tx={'main:transition:txLocation'} />
                </Block>
                <Block width={(SCREEN_WIDTH - SUB_SCREEN - PADDING_HORIZONTAL * 2) / 4}>
                    <ButtonIcon progress={defaultProgress} icon={'rotate'} tx={'main:transition:txRotate'} />
                </Block>
                <Block width={(SCREEN_WIDTH - SUB_SCREEN - PADDING_HORIZONTAL * 2) / 4}>
                    <ButtonIcon progress={defaultProgress} icon={'share_data'} tx={'main:transition:txShareData'} />
                </Block>
                <Block width={(SCREEN_WIDTH - SUB_SCREEN - PADDING_HORIZONTAL * 2) / 4}>
                    <ButtonIcon active progress={defaultProgress} icon={'auto_light'} tx={'main:transition:txLightAuto'} />
                </Block>
            </Animated.View>
        </Block>
    )
}

export const CenterFeature = memo(CenterFeatureComponent, isEqual)