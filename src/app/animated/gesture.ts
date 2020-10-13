import Animated, { event, Value } from "react-native-reanimated";
import { GestureHandlerStateChangeNativeEvent, PanGestureHandlerEventExtra, TapGestureHandlerEventExtra, LongPressGestureHandlerEventExtra, RotationGestureHandlerEventExtra, FlingGestureHandlerEventExtra, PinchGestureHandlerEventExtra, ForceTouchGestureHandlerEventExtra, State } from "react-native-gesture-handler";
import { useRef } from "react";
export const useConst = <T>(initialValue: T | (() => T)): T => {
    const ref = useRef<{ value: T }>();
    if (ref.current === undefined) {
        // Box the value in an object so we can tell if it's initialized even if the initializer
        // returns/is undefined
        ref.current = {
            value:
                typeof initialValue === 'function'
                    ? (initialValue as Function)()
                    : initialValue,
        };
    }
    return ref.current.value;
};
type NativeEvent = GestureHandlerStateChangeNativeEvent &
    (
        | PanGestureHandlerEventExtra
        | TapGestureHandlerEventExtra
        | LongPressGestureHandlerEventExtra
        | RotationGestureHandlerEventExtra
        | FlingGestureHandlerEventExtra
        | PinchGestureHandlerEventExtra
        | ForceTouchGestureHandlerEventExtra
    );
type Adaptable<T> = { [P in keyof T]: Animated.Adaptable<T[P]> };
export const onGestureEvent = (
    nativeEvent: Partial<Adaptable<NativeEvent>>,
) => {
    const gestureEvent = event([{ nativeEvent }]);
    return {
        onHandlerStateChange: gestureEvent,
        onGestureEvent: gestureEvent,
    };
};
export const useGestureHandler = (
    nativeEvent: Parameters<typeof onGestureEvent>[0],
) => useConst(() => onGestureEvent(nativeEvent));

export const useFlingGestureHandler = () => useConst(() => flingGestureHandler());

export const flingGestureHandler = () => {
    const state = new Value(State.UNDETERMINED);
    const positionX = new Value(0);
    const positionY = new Value(0);
    const absolutePositionX = new Value(0);
    const absolutePositionY = new Value(0);
    const gestureHandler = onGestureEvent({
        state,
        x: positionX,
        y: positionY,
        absoluteX: absolutePositionX,
        absoluteY: absolutePositionY,
    });
    return {
        gestureHandler,
        positionX,
        positionY,
        absolutePositionX,
        absolutePositionY,
        state,
    };
};
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