import Animated, { divide, sub } from "react-native-reanimated";

export const translateZ = (
    perspective: Animated.Adaptable<number>,
    z: Animated.Adaptable<number>,
) => ({ scale: divide(perspective, sub(perspective, z)) });