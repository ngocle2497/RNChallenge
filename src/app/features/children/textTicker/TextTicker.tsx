import { Block, SizeBox } from '@components'
import React, { memo, useEffect, useMemo, useState } from 'react'
import isEqual from 'react-fast-compare'
import { Text, ScrollView, StyleSheet, LayoutChangeEvent, Button } from 'react-native'
import Animated, { call, Clock, clockRunning, block, cond, EasingNode, timing, not, onChange, set, startClock, stopClock, useCode, useValue, Value, interpolateNode } from 'react-native-reanimated'
import { useTransition } from '@animated'

const styles = StyleSheet.create({
    wrapText: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tickerView: {
        position: 'absolute',
        flexDirection: 'row'
    },
    wrapNotification: {
        width: '100%',
        position: 'absolute',
        top: 0,
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'rgba(0,0,0,.1)'
    }
})
interface Notification {
    id: number;
    text: string
}


const TEXT = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

const data: Notification[] = [
    {
        id: 1,
        text: TEXT.substring(0, 20)
    },
    {
        id: 2,
        text: TEXT.substring(0, 80)
    },
    {
        id: 3,
        text: TEXT.substring(0, 90)
    },
    {
        id: 4,
        text: TEXT.substring(0, 50)
    },
    {
        id: 5,
        text: TEXT.substring(0, 150)
    }
]

const SPACING = 150
function runTiming(clock: Clock, value: Animated.Value<number>, dest: Animated.Value<number>, duration = 2000) {
    const state = {
        finished: new Value(0),
        position: value,
        time: new Value(0),
        frameTime: new Value(0),
    };

    const config = {
        duration: duration,
        toValue: dest,
        easing: EasingNode.linear,
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock),
        ]),
        timing(clock, state, config),
        cond(state.finished, stopClock(clock)),
        state.position,
    ]);
}
const TextItem = memo(({ item, onRemove, widthView }: { widthView: number, item: Notification, onRemove: () => void }) => {
    const clock = useMemo(() => new Clock(), [])
    const translateX = useValue(0)
    const [width, setWidth] = useState<number>(0)
    const _onLayout = ({ nativeEvent: { layout: { width } } }: LayoutChangeEvent) => {
        setWidth(width)
    }
    useCode(() => onChange(clock, cond(not(clockRunning(clock)),
        call([], ([]) => {
            onRemove()
        }))), [item])

    useCode(() => width !== 0 && [
        set(translateX, runTiming(clock, new Value(widthView), new Value(-(width + SPACING)), width * 20))
    ], [item, width, widthView])

    return (
        <Animated.View style={[styles.wrapText, { transform: [{ translateX }] }]} onLayout={_onLayout}>
            <SizeBox width={SPACING} />
            <Text>{item.id} - {item.text}</Text>
        </Animated.View>
    )
}, isEqual)

const TextTickerComponent = () => {
    const [sizeView, setSizeView] = useState<number>(0)
    const [arrNotification, setArrayNotification] = useState<Notification[]>([])
    const [currentNotification, setCurrentNotification] = useState<Notification | null>(null)
    const progress = useTransition(arrNotification.length !== 0)
    const height = interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [0, 30],
    })
    const _onLayout = ({ nativeEvent: { layout: { width } } }: LayoutChangeEvent) => {
        setSizeView(width)
    }

    const _onRemoveText = () => {
        if (arrNotification.length > 0) {
            setArrayNotification(d => d.slice(1))
        }
    }
    useEffect(() => {
        if (arrNotification.length > 0) {
            setCurrentNotification(arrNotification[0])
        } else {
            setCurrentNotification(null)
        }
    }, [arrNotification])
    const _push = () => {
        setArrayNotification(d => d.concat([{ ...data[Math.floor(Math.random() * 4)], id: new Date().getTime() }]))
    }
    return (
        <Block block onLayout={_onLayout}>
            <Animated.View style={[styles.wrapNotification, { height }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    horizontal
                    scrollEnabled={false}
                    bounces={false}
                    showsHorizontalScrollIndicator={false}>
                    {(currentNotification !== null && sizeView !== 0) && <TextItem widthView={sizeView}
                        onRemove={_onRemoveText} item={currentNotification} />}
                </ScrollView>

            </Animated.View>
            <Block marginTop={50}>
                <Button title={'push'} onPress={_push} />
            </Block>
        </Block>
    )
}

export const TextTicker = memo(TextTickerComponent, isEqual)