import { timing, toRad, withOffset, usePanGestureHandler, clamp, withTransition } from '@animated'
import { Block, Icon, ImageRemote } from '@components'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import isEqual from 'react-fast-compare'
import { View, Text, useWindowDimensions, StyleSheet, LayoutChangeEvent, TouchableOpacity } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { and, call, cond, divide, eq, Extrapolate, interpolateNode, lessOrEq, multiply, neq, onChange, or, set, useCode, useValue } from 'react-native-reanimated'
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        width: '100%',
        height: '100%',
    },
    icon: {
        tintColor: '#FFFFFF'
    },
    button: {
        position: 'absolute',
        right: 10,
        bottom: 10
    },
    masterContainer: {
        flex: 1,
        alignSelf: 'center',
        backgroundColor: 'red',
        position: 'absolute',
        overflow: 'hidden'
    }
})

const MAX_GESTURE = 100
const MAX_HEIGHT = 80

const You_tubeComponent = () => {
    const _masterGesture = useRef<PanGestureHandler>(null)
    const _gesture = useRef<PanGestureHandler>(null)
    const [isRotate, setIsRotate] = useState(false)
    const [sizeView, setSizeView] = useState({ width: 0, height: 0 })
    const imgW = useValue(sizeView.width)
    const imgH = useValue((sizeView.height) * 0.75)

    const rotate = useValue(0)
    const translateX = useValue(0)
    const translateY = useValue(0)

    const { gestureHandler, state: stateVideo, translation: translationVideo } = usePanGestureHandler()
    const translationWrapX = useValue(0)
    const translateXWrap = clamp(withOffset(translationVideo.x, stateVideo, translationWrapX), -MAX_GESTURE, 0)
    const scale = interpolateNode(translateXWrap, {
        inputRange: [
            -MAX_GESTURE, 0
        ],
        outputRange: [0.9, 1],
        extrapolate: Extrapolate.CLAMP
    })

    const { gestureHandler: gestureMaster, state: stateMaster, translation: translationMaster } = usePanGestureHandler()
    const translationMasterY = useValue(0)
    const translateMasterY = clamp(withOffset(translationMaster.y, stateMaster, translationMasterY), 0, sizeView.height * 0.8)
    const progress = interpolateNode(translateMasterY,
        {
            inputRange: [0, sizeView.height * 0.8],
            outputRange: [0, 1],
            extrapolate: Extrapolate.CLAMP
        })
    const masterW = interpolateNode(progress, { inputRange: [0, 1], outputRange: [sizeView.width, sizeView.width - 30] })
    const masterH = interpolateNode(progress, { inputRange: [0, 1], outputRange: [sizeView.height, MAX_HEIGHT] })
    const opacityButton = cond(or(neq(progress, 0), eq(stateMaster, State.ACTIVE)), 0, 1)
    const bottom = interpolateNode(progress, { inputRange: [0, 1], outputRange: [0, 30] })


    const _onToggle = useCallback(() => {
        setIsRotate(v => !v)
    }, [])

    const _onLayout = useCallback(({ nativeEvent: { layout: { height, width } } }: LayoutChangeEvent) => {
        setSizeView({ width, height })
        // masterW.setValue(width)
        // masterH.setValue(height)
        imgW.setValue(width)
        imgH.setValue(height * 0.35)
    }, [])

    useCode(() => isRotate ? [
        cond(neq(stateVideo, State.ACTIVE), [
            set(imgW, timing({ from: imgW, to: sizeView.height })),
            set(imgH, timing({ from: imgH, to: sizeView.width })),
            set(rotate, timing({ from: rotate, to: 90 })),
            set(translateX, timing({ from: translateX, to: -(sizeView.height - sizeView.width) * 0.5 })),
            set(translateY, timing({ from: translateY, to: (sizeView.height - sizeView.width) * 0.5 })),
        ])

    ] : sizeView.width !== 0 && [
        cond(neq(stateVideo, State.ACTIVE), [
            set(imgW, timing({ from: imgW, to: sizeView.width })),
            set(imgH, timing({ from: imgH, to: sizeView.height * 0.35 })),
            set(rotate, timing({ from: rotate, to: 0 })),
            set(translateX, timing({ from: translateX, to: 0 })),
            set(translateY, timing({ from: translateY, to: 0 })),
        ]),
    ], [isRotate])
    useCode(() => [
        cond(eq(stateVideo, State.END), [
            set(translationVideo.x, timing({ from: translationVideo.x, to: 0 })),
            set(translationWrapX, 0),
        ])
    ], [stateVideo])

    useCode(() => [
        cond(eq(stateMaster, State.END), [
            set(translationMasterY, 0),
            set(translationMaster.y, timing({ from: translationMaster.y, to: sizeView.height }))
        ])
    ], [stateMaster])

    useCode(() => [
        cond(and(eq(stateVideo, State.END), lessOrEq(translateXWrap, -MAX_GESTURE)), [
            call([], ([]) => {
                setIsRotate(false)

            })
        ])
    ], [translateXWrap, stateVideo])


    return (
        <Block block onLayout={_onLayout}>
            <PanGestureHandler simultaneousHandlers={[_gesture]} ref={_masterGesture} enabled={!isRotate} {...gestureMaster}>
                <Animated.View style={[styles.masterContainer, { width: masterW, bottom, height: masterH }]}>
                    <PanGestureHandler ref={_gesture} simultaneousHandlers={[_masterGesture]} enabled={isRotate} {...gestureHandler}>
                        <Animated.View style={[styles.container, { transform: [{ translateX: translateXWrap }] }]}>
                            <Animated.View style={{
                                width: imgW, height: imgH,
                                transform: [
                                    { translateX },
                                    { translateY },
                                    { rotate: toRad(rotate) },
                                    { scale }
                                ]
                            }}>
                                <ImageRemote style={[styles.img]} resizeMode={'cover'} imgSource={'https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80'} />
                                <Animated.View style={[styles.button, { opacity: opacityButton }]}>
                                    <TouchableOpacity activeOpacity={0.9} onPress={_onToggle}>
                                        <Icon style={[styles.icon]} icon={isRotate ? 'collapse' : 'expand'} />
                                    </TouchableOpacity>
                                </Animated.View>
                            </Animated.View>
                        </Animated.View>
                    </PanGestureHandler>
                </Animated.View>
            </PanGestureHandler>
        </Block>
    )
}

export const You_tube = memo(You_tubeComponent, isEqual)