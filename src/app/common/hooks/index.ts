import { Component, useEffect } from "react";
import { useWindowDimensions } from "react-native";
import Animated, { useAnimatedRef, useDerivedValue, measure, runOnJS, useAnimatedReaction, runOnUI, useSharedValue, withDelay } from "react-native-reanimated";

const showLog = value => {
    "worklet"
    console.log(value)
}
const run = (ref) => {
    "worklet"
    const measured = measure(ref);
    showLog(measured)
}
export function useInsideView<T extends Component>(): [React.RefObject<T>, Animated.SharedValue<boolean>] {
    const { width, height } = useWindowDimensions()
    const ref = useAnimatedRef<T>()
    const toggle = useSharedValue(0)
    const rectBottom = useSharedValue(0)
    const rectTop = useSharedValue(0)
    const visible = useDerivedValue(() => {
        return rectTop.value <= height &&
            rectBottom.value >= 0

    })
    useDerivedValue(() => {
        try {
            const measured = measure(ref);
            rectTop.value = measured.pageY
            rectBottom.value = measured.pageY + measured.height
            toggle.value = toggle.value === 1 ? 0 : 1

        } catch {
            toggle.value = toggle.value === 1 ? 0 : 1
        }
    });
    return [ref, visible]
}