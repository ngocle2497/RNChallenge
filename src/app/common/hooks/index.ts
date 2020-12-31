import { Component } from "react";
import { useWindowDimensions } from "react-native";
import Animated, { useAnimatedRef, useDerivedValue, measure, useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function useInsideView<T extends Component>(wrapHeight: number | undefined = undefined): [React.RefObject<T>, Animated.SharedValue<boolean>] {
    const { height } = useWindowDimensions()
    const { top } = useSafeAreaInsets()
    const ref = useAnimatedRef<T>()
    const toggle = useSharedValue(0)
    const rectBottom = useSharedValue(0)
    const rectTop = useSharedValue(0)
    const visible = useDerivedValue(() => {
        return rectTop.value <= ((wrapHeight || height)) &&
            rectBottom.value >= 0

    })
    useDerivedValue(() => {
        try {
            const measured = measure(ref);
            rectTop.value = measured.pageY - top
            rectBottom.value = measured.pageY + measured.height- top
            toggle.value = toggle.value === 1 ? 0 : 1

        } catch {
            toggle.value = toggle.value === 1 ? 0 : 1
        }
    });
    return [ref, visible]
}