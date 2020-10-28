import { useRef } from "react";
import { FlingGestureHandlerEventExtra, ForceTouchGestureHandlerEventExtra, GestureHandlerStateChangeNativeEvent, LongPressGestureHandlerEventExtra, PanGestureHandlerEventExtra, PinchGestureHandlerEventExtra, RotationGestureHandlerEventExtra, State, TapGestureHandlerEventExtra } from "react-native-gesture-handler";
import Animated, { add, cond, eq, event, set, Value } from "react-native-reanimated";
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
export interface Vector<
    T extends Animated.Adaptable<number> = Animated.Adaptable<number>
    > {
    x: T;
    y: T;
}

type Create = {
    (): Vector<0>;
    <T extends Animated.Adaptable<number>>(x: T, y?: T): Vector<T>;
};

const create: Create = <T extends Animated.Adaptable<number>>(
    x?: T,
    y?: T,
) => ({
    x: x ?? 0,
    y: y ?? x ?? 0,
});
const createValue = (x = 0, y?: number) =>
    create(new Value(x), new Value(y ?? x));
export const panGestureHandler = () => {
    const position = createValue(0);
    const translation = createValue(0);
    const velocity = createValue(0);
    const state = new Value(State.UNDETERMINED);
    const gestureHandler = onGestureEvent({
        x: position.x,
        translationX: translation.x,
        velocityX: velocity.x,
        y: position.y,
        translationY: translation.y,
        velocityY: velocity.y,
        state,
    });
    return {
        position,
        translation,
        velocity,
        state,
        gestureHandler,
    };
};
export const usePanGestureHandler = () => useConst(() => panGestureHandler());
export const withOffset = (
    value: Animated.Node<number>,
    state: Animated.Node<State>,
    offset: Animated.Value<number> = new Value(0),
) =>
    cond(
        eq(state, State.END),
        [set(offset, add(offset, value)), offset],
        add(offset, value),
    );