import Animated, { event } from "react-native-reanimated";

export const onScrollEvent = (contentOffset: {
    x?: Animated.Node<number>;
    y?: Animated.Node<number>;
}) =>
    event([
        {
            nativeEvent: {
                contentOffset,
            },
        },
    ]);