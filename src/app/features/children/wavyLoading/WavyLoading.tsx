import React, { memo, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import isEqual from 'react-fast-compare';
import { Block } from '@components';
import Animated, { withRepeat, withTiming, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const SIZE_BOX = 250

const styles = StyleSheet.create({
    parent: {
        position: 'relative',
        width: SIZE_BOX,
        height: SIZE_BOX,
        transform: [{ rotateX: '60deg' }]
    },
    children: {
        position: 'absolute',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 9999
    },
    element1: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    element2: {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    },
    element3: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
    },
    element4: {
        top: 30,
        left: 30,
        right: 30,
        bottom: 30
    },
    element5: {
        top: 40,
        left: 40,
        right: 40,
        bottom: 40
    },
    element6: {
        top: 50,
        left: 50,
        right: 50,
        bottom: 50
    },
    element7: {
        top: 60,
        left: 60,
        right: 60,
        bottom: 60
    },
    element8: {
        top: 70,
        left: 70,
        right: 70,
        bottom: 70
    },
    element9: {
        top: 80,
        left: 80,
        right: 80,
        bottom: 80
    },
    element10: {
        top: 90,
        left: 90,
        right: 90,
        bottom: 90
    },
    element11: {
        top: 100,
        left: 100,
        right: 100,
        bottom: 100
    },
    element12: {
        top: 110,
        left: 110,
        right: 110,
        bottom: 110
    },
    element13: {
        top: 120,
        left: 120,
        right: 120,
        bottom: 120
    },
});
function linear(t: any) {
    'worklet';
    return t;
}
interface CircleChildrenProps {
    index: number;
    started: boolean;
}

const CircleChildren = memo(({ index, started }: CircleChildrenProps) => {
    const translateY = useSharedValue(0)
    useEffect(() => {
        if (started) {
            setTimeout(() => {
                translateY.value = withRepeat(withTiming(200, { duration: 500, easing: linear }), -1, true)

            }, Math.abs(index - 13) * 50)
        }
    }, [started])
    const circleStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }]
    }))
    return (
        <Animated.View style={[styles.children, styles[`element${index}`], circleStyle]} />
    )
}, isEqual)

const WavyLoadingComponent = () => {
    const [started, setStarted] = useState(false)
    useEffect(() => {
        setStarted(true)
    }, [])
    return (
        <Block color={'#ff66b2'} block middle justifyContent={'center'}>
            <Animated.View style={[styles.parent]}>
                <CircleChildren started={started} index={1} />
                <CircleChildren started={started} index={2} />
                <CircleChildren started={started} index={3} />
                <CircleChildren started={started} index={4} />
                <CircleChildren started={started} index={5} />
                <CircleChildren started={started} index={6} />
                <CircleChildren started={started} index={7} />
                <CircleChildren started={started} index={8} />
                <CircleChildren started={started} index={9} />
                <CircleChildren started={started} index={10} />
                <CircleChildren started={started} index={11} />
                <CircleChildren started={started} index={12} />
                <CircleChildren started={started} index={13} />
            </Animated.View>
        </Block>
    )
}

export const WavyLoading = memo(WavyLoadingComponent, isEqual)