import React, { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import isEqual from 'react-fast-compare';
import { Block, Icon, SizeBox } from '@components';
import Animated, { interpolate, Extrapolate, useAnimatedStyle } from 'react-native-reanimated';

const styles = StyleSheet.create({
    headerLeft: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'flex-start'
    },
    hourLeft: {
        fontSize: 20
    },
    dateLeft: {
        fontSize: 12,
        color: 'gray'
    },
    headerRight: {
        justifyContent: 'flex-end',
    },
    powerRight: {
        fontSize: 11,
        color: 'gray'
    },
    headerMiddle: {
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    hourMiddle: {
        fontSize: 30
    },
    dateMiddle: {
        fontSize: 16,
        color: 'gray'
    }
});

interface HeaderProps {
    progress: Animated.SharedValue<number>
}

const HeaderComponent = ({ progress }: HeaderProps) => {
    const headerMiddleStyle = useAnimatedStyle(() => ({
        opacity: interpolate(progress.value, [0, 0.5, 1], [0, 0, 1], Extrapolate.CLAMP),
    }))
    const headerLeftStyle = useAnimatedStyle(() => ({ opacity: interpolate(progress.value, [0, 0.5, 1], [1, 0, 0], Extrapolate.CLAMP) }))
    const headerRightStyle = useAnimatedStyle(() => ({ opacity: interpolate(progress.value, [0, 0.5, 1], [1, 0, 0], Extrapolate.CLAMP) }))
    return (
        <Block>
            <Block direction={'row'} justifyContent={'space-between'}>
                <Animated.View style={[styles.headerLeft, headerLeftStyle]}>
                    <Text style={[styles.hourLeft]}>10:50</Text>
                    <Text style={[styles.dateLeft]}>Th 6, 4 thg 9</Text>
                </Animated.View>
                <Animated.View style={[styles.headerRight, headerRightStyle]}>
                    <Block direction={'row'}>
                        <Icon icon={'clock'} />
                        <SizeBox width={2} />
                        <Icon icon={'wifi'} />
                        <SizeBox width={2} />
                        <Block>
                            <SizeBox height={2} />
                            <Icon icon={'power'} />
                        </Block>
                        <SizeBox width={2} />

                        <Text style={[styles.powerRight]}>100%</Text>
                    </Block>
                </Animated.View>
            </Block>
            <Animated.View style={[styles.headerMiddle, headerMiddleStyle]}>
                <Text style={[styles.hourMiddle]}>10:50</Text>
                <Text style={[styles.dateMiddle]}>Th 6, 4 thg 9</Text>
                <Block direction={'row'}>
                    <Icon icon={'clock'} />
                    <SizeBox width={2} />
                    <Icon icon={'wifi'} />
                    <SizeBox width={2} />
                    <Block>
                        <SizeBox height={2} />
                        <Icon icon={'power'} />
                    </Block>
                    <Text style={[styles.powerRight]}>100%</Text>
                </Block>
            </Animated.View>
        </Block>
    )
}

export const Header = memo(HeaderComponent, isEqual)