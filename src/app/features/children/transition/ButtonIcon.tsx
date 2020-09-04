import React, { memo } from 'react'
import { TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native'
import isEqual from 'react-fast-compare';
import { IconTypes } from '@assets/icon';
import Animated, { useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';
import { Icon, Text, Block } from '@components';
import { SUB_SCREEN } from './Transition';
import { APP_COLOR } from '@config/';

const SIZE_BUTTON = 20
export const WRAP_BUTTON_HEIGHT = 80
const styles = StyleSheet.create({
    button: {
        width: SIZE_BUTTON * 2,
        height: SIZE_BUTTON * 2,
        borderRadius: SIZE_BUTTON,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    wrap: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: WRAP_BUTTON_HEIGHT
    },
    text: {
        flexWrap: 'wrap',
        textAlign: 'center'
    },
    activeBtn: {
        backgroundColor: APP_COLOR
    },
    activeIcon: {
        tintColor: '#FFFFFF'
    }
});

interface ButtonIconProps {
    tx: string;
    icon: IconTypes;
    progress: Animated.SharedValue<number>;
    active?: boolean;
}

const ButtonIconComponent = ({ icon, tx, progress, active = false }: ButtonIconProps) => {
    const { width: SCREEN_WIDTH } = useWindowDimensions()
    const animatedTextStyle = useAnimatedStyle(() => ({
        maxWidth: (SCREEN_WIDTH - SUB_SCREEN) / 5,
        opacity: interpolate(progress.value, [0, 0.5, 1], [0, 0, 1], Extrapolate.CLAMP)
    }))
    return (
        <Animated.View style={[styles.wrap]}>
            <Animated.View style={[styles.button, active && styles.activeBtn]}>
                <TouchableOpacity>
                    <Icon icon={icon} style={[active && styles.activeIcon]} />
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[animatedTextStyle]}>
                <Text style={[styles.text]} tx={tx} />
            </Animated.View>
        </Animated.View>
    )
}

export const ButtonIcon = memo(ButtonIconComponent, isEqual)