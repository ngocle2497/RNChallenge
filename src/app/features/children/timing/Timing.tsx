import React, { memo, useCallback } from 'react'
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import isEqual from 'react-fast-compare';
import { Block, Text } from '@components';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, EasingNode, withSpring } from 'react-native-reanimated';
import { clampV2 } from '@animated';

const BOX_SIZE = 150

const styles = StyleSheet.create({
    box: {
        width: BOX_SIZE,
        height: BOX_SIZE,
        borderRadius: 10,
        backgroundColor: 'darkorchid'
    }
});

const TimingComponent = () => {
    const translateX = useSharedValue(0);
    const _onButtonPress = useCallback(() => {
        translateX.value = Math.floor(Math.random() * (Dimensions.get('window').width - BOX_SIZE))
    }, [])
    const boxStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: withSpring(translateX.value) }]
    }))
    return (
        <Block block justifyContent={'space-between'}>
            <Animated.View style={[styles.box, boxStyle]} />
            <TouchableOpacity onPress={_onButtonPress}>
                <Block middle paddingVertical={10} paddingHorizontal={15} color={'darkviolet'}>
                    <Text color={'#FFFFFF'} tx={"main:timing:txChange"} />
                </Block>
            </TouchableOpacity>
        </Block>
    )
}

export const Timing = memo(TimingComponent, isEqual)