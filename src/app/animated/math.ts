import Animated, {
    multiply, proc,
    min,
    max,
} from "react-native-reanimated";

export const clampV2 = (value: number, lowerValue: number, upperValue: number) => {
    'worklet';
    return Math.min(Math.max(lowerValue, value), upperValue)
}
export const subV2 = (r1: number, r2: number) => {
    'worklet';
    return r1 - r2
}
export const addV2 = (r1: number, r2: number) => {
    'worklet';
    return r1 + r2
}
export const toDeg = proc(
    (rad: Animated.Adaptable<number>): Animated.Node<number> =>
        multiply(rad, 180 / Math.PI),
);
export const toRad = proc(
    (deg: Animated.Adaptable<number>): Animated.Node<number> =>
        multiply(deg, Math.PI / 180),
);
export const clamp = proc(
    (
        value: Animated.Adaptable<number>,
        lowerBound: Animated.Adaptable<number>,
        upperBound: Animated.Adaptable<number>,
    ): Animated.Node<number> => min(max(lowerBound, value), upperBound),
);