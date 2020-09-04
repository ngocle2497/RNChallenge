import React, { memo } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import Animated, {
    useValue,
    Extrapolate,
    multiply,
    cos,
    sub,
    asin,
    divide,
    add,
    interpolateNode,
} from "react-native-reanimated";
import { translateZ, onScrollEvent } from "@animated";
import { FlatList } from "react-native-gesture-handler";
import { Block } from "@components";
import LinearGradient from 'react-native-linear-gradient';
import isEqual from "react-fast-compare";
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

export const ITEM_HEIGHT = 32;
export const VISIBLE_ITEMS = 7;


const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        width: width,
        height: ITEM_HEIGHT * VISIBLE_ITEMS,
        overflow: "hidden",
    },
    item: {
        height: ITEM_HEIGHT,
        justifyContent: "center",
    },
    label: {
        color: "#000",
        fontFamily: "SFProText-Semibold",
        fontSize: 24,
        lineHeight: ITEM_HEIGHT,
        textAlign: "center",
        textAlignVertical: "center",
    },
    linearTop: {
        width: '100%',
        height: ITEM_HEIGHT * (VISIBLE_ITEMS - 1) / 2,
        position: 'absolute',
        top: 0,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'gray'
    },
    linearBottom: {
        width: '100%',
        height: ITEM_HEIGHT * (VISIBLE_ITEMS - 1) / 2,
        position: 'absolute',
        bottom: 0,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: 'gray'
    }
});
const perspective = 1000;
const RADIUS_REL = VISIBLE_ITEMS * 0.5;
const RADIUS = RADIUS_REL * ITEM_HEIGHT;

const start = 1980;
const values = new Array(new Date().getFullYear() - start + 1)
    .fill(0)
    .map((_, i) => {
        const value = start + i;
        return { value, label: `${value}` };
    })
    .reverse();

const WheelComponent = () => {
    const translateY = useValue(0);
    return (
        <Block middle justifyContent={'center'} block color={'white'}>
            <View style={styles.container}>
                <AnimatedFlatList
                    overScrollMode={'never'}
                    snapToInterval={ITEM_HEIGHT}
                    showsVerticalScrollIndicator={false}
                    onScroll={onScrollEvent({ y: translateY })}
                    renderItem={({ index, item }: { index: number; item: any }) => {
                        if (item.value === -1) {
                            return (
                                <Block height={ITEM_HEIGHT * (VISIBLE_ITEMS - 1) / 2} />
                            )
                        }
                        const y = interpolateNode(
                            divide(add(translateY, ITEM_HEIGHT), ITEM_HEIGHT),
                            {
                                inputRange: [index - RADIUS_REL, index, index + RADIUS_REL],
                                outputRange: [-1.1, 0, 1.1],
                                extrapolate: Extrapolate.CLAMP,
                            }
                        );
                        const rotateX = asin(y);
                        const z = sub(multiply(RADIUS, cos(rotateX)), RADIUS);
                        return (
                            <Animated.View
                                key={item.value}
                                style={[
                                    styles.item,
                                    {
                                        transform: [
                                            { perspective },
                                            { rotateX },
                                            translateZ(perspective, z),
                                        ],
                                    },
                                ]}
                            >
                                <Text style={styles.label}>{item.label}</Text>
                            </Animated.View>
                        );
                    }} data={[{ value: -1 }, ...values, { value: -1 }]} keyExtractor={(item: any) => item.value.toString()} />
                <LinearGradient pointerEvents={'none'} colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.6)',]} style={[styles.linearTop]} />
                <LinearGradient pointerEvents={'none'} colors={['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.95)']} style={[styles.linearBottom]} />
            </View>
        </Block>
    );
};
export const Wheel = memo(WheelComponent, isEqual)