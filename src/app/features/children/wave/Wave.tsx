import { Block, SizeBox } from '@components';
import MaskedView from '@react-native-community/masked-view';
import React, { memo, useCallback, useEffect, useState } from 'react'
import isEqual from 'react-fast-compare';
import { View, Text, StyleSheet, LayoutChangeEvent } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withDelay, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated';

const DEFAULT_HEIGHT_ITEM = 20

const SPACE_HEIGHT = 5

const DEFAULT_WIDTH_ITEM = 150

const styles = StyleSheet.create({
    masked: {
        flex: 1
    },
    linearGradient: {
        flex: 1
    },
    maskedItem: {
        borderRadius: DEFAULT_HEIGHT_ITEM / 2,
        backgroundColor: '#000000'
    }
});

interface MaskItem {
    widthAnimated: Animated.SharedValue<number>;
    // index: number
}

const MaskItem = memo(({ widthAnimated }: MaskItem) => {
    const itemStyle = useAnimatedStyle(() => ({
        width: widthAnimated.value,
        height: DEFAULT_HEIGHT_ITEM
    }))
    return (
        <Animated.View style={[itemStyle, styles.maskedItem]} />
    )
}, isEqual)


const WaveComponent = () => {
    const [sizeView, setSizeView] = useState({ width: 0, height: 0 })
    const widthAnimated = useSharedValue(DEFAULT_WIDTH_ITEM)
    const widthAnimated1 = useDerivedValue(() => withSpring(widthAnimated.value))
    const widthAnimated2 = useDerivedValue(() => withSpring(widthAnimated1.value, { damping: 50 }))
    const widthAnimated3 = useDerivedValue(() => withSpring(widthAnimated2.value, { damping: 50 }))
    const widthAnimated4 = useDerivedValue(() => withSpring(widthAnimated3.value, { damping: 50 }))
    const widthAnimated5 = useDerivedValue(() => withSpring(widthAnimated4.value, { damping: 50 }))
    const widthAnimated6 = useDerivedValue(() => withSpring(widthAnimated5.value, { damping: 50 }))
    const widthAnimated7 = useDerivedValue(() => withSpring(widthAnimated6.value, { damping: 50 }))
    const widthAnimated8 = useDerivedValue(() => withSpring(widthAnimated7.value, { damping: 50 }))
    const widthAnimated9 = useDerivedValue(() => withSpring(widthAnimated8.value, { damping: 50 }))
    const widthAnimated10 = useDerivedValue(() => withSpring(widthAnimated9.value, { damping: 50 }))
    const widthAnimated11 = useDerivedValue(() => withSpring(widthAnimated10.value, { damping: 50 }))
    const widthAnimated12 = useDerivedValue(() => withSpring(widthAnimated11.value, { damping: 50 }))
    const widthAnimated13 = useDerivedValue(() => withSpring(widthAnimated12.value, { damping: 50 }))
    const widthAnimated14 = useDerivedValue(() => withSpring(widthAnimated13.value, { damping: 50 }))
    const widthAnimated15 = useDerivedValue(() => withSpring(widthAnimated14.value, { damping: 50 }))
    const widthAnimated16 = useDerivedValue(() => withSpring(widthAnimated15.value, { damping: 50 }))
    const [data, setData] = useState<any>([])
    const _onLayout = useCallback(({ nativeEvent: { layout: { height, width } } }: LayoutChangeEvent) => {
        setSizeView({ width, height })
    }, [])

    const _renderItem = (_: any, index: number) => {
        return (
            <Block>
                <SizeBox height={SPACE_HEIGHT} />
                <MaskItem {...{ index, widthAnimated }} />
            </Block>
        )
    }

    useEffect(() => {
        if (sizeView.height > 0) {
            const arr = Array(Math.floor(sizeView.height / (DEFAULT_HEIGHT_ITEM + SPACE_HEIGHT))).fill(0)
            setData(arr)
        }
    }, [sizeView])
    useEffect(() => {
        setTimeout(() => {
            widthAnimated.value = withRepeat(withSequence(
                withTiming(350, { duration: 500 }),
                withDelay(500, withSpring(150, { damping: 500 })),
                withDelay(500, withSpring(50, { damping: 500 })),
                withDelay(500, withSpring(150, { damping: 500 })),
                withDelay(500, withSpring(250, { damping: 500 })),
                withDelay(500, withSpring(350, { damping: 500 })),
                withDelay(500, withSpring(200, { damping: 500 })),
                withDelay(500, withSpring(150, { damping: 500 })),
                withDelay(500, withSpring(50, { damping: 500 })),
            ), -1, false)
        }, 1000)

    }, [])
    return (
        <Block block color={'#000000'}>
            <MaskedView style={[styles.masked]} maskElement={
                <Block onLayout={_onLayout} block middle color={'transparent'}>
                    {/* {data.map(_renderItem)} */}
                    <SizeBox height={10} />
                    <MaskItem widthAnimated={widthAnimated} />
                    <SizeBox height={10} />
                    <MaskItem widthAnimated={widthAnimated1} />
                    <SizeBox height={10} />
                    <MaskItem widthAnimated={widthAnimated2} />
                    <SizeBox height={10} />
                    <MaskItem widthAnimated={widthAnimated3} />
                    <SizeBox height={10} />
                    <MaskItem widthAnimated={widthAnimated4} />
                    <SizeBox height={10} />
                    <MaskItem widthAnimated={widthAnimated5} />
                    <SizeBox height={10} />
                    <MaskItem widthAnimated={widthAnimated6} />
                    <SizeBox height={10} />
                    <MaskItem widthAnimated={widthAnimated7} />
                    <SizeBox height={10} />
                    <MaskItem widthAnimated={widthAnimated8} />
                    <SizeBox height={10} />
                    <MaskItem widthAnimated={widthAnimated9} />
                    <SizeBox height={10} />
                    <MaskItem widthAnimated={widthAnimated10} />
                    <SizeBox height={10} />
                    <MaskItem widthAnimated={widthAnimated11} />
                    <SizeBox height={10} />
                    <MaskItem widthAnimated={widthAnimated12} />
                    <SizeBox height={10} />
                    <MaskItem widthAnimated={widthAnimated13} />
                    <SizeBox height={10} />
                    <MaskItem widthAnimated={widthAnimated14} />
                    <SizeBox height={10} />
                    <MaskItem widthAnimated={widthAnimated15} />
                    <SizeBox height={10} />
                    <MaskItem widthAnimated={widthAnimated16} />
                </Block>
            }>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={[styles.linearGradient]} colors={['#eb2f06', '#b8e994']} />
            </MaskedView>
        </Block>
    )
}

export const Wave = memo(WaveComponent, isEqual)