import { useInsideView } from '@common';
import { Block, Text } from '@components';
import React, { memo, useEffect } from 'react'
import isEqual from 'react-fast-compare';
import { StyleSheet, View, Image } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Animated, { measure, runOnUI, useAnimatedReaction, useAnimatedRef, useAnimatedStyle, useDerivedValue, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';
import { CardProps, example, Palette } from './constants';

const styles = StyleSheet.create({
    content: {
        padding: 24
    },
    container: {
        marginVertical: 16,
        shadowColor: Palette.richBlack,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
    },
    backgroundContainer: {
        borderRadius: 16,
    },
    textContainer: {
        padding: 24,
    },
    title: {
        fontSize: 26,
        lineHeight: 32,
        paddingBottom: 8,
        color: "white"
    },
    text: {
        fontSize: 15,
        lineHeight: 18,
        color: "white"
    },
    img: {
        resizeMode: 'cover',
        height:180,
        width:'100%'
    },
    containerImage: {
        overflow: 'hidden',
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
    }
});
const Wrap = ({ id, color, text, title, image, onlyOne }: CardProps) => {
    const [ref, visible] = useInsideView<Animated.View>()
    const wasInView = useSharedValue(false)
    const actualVisible = useDerivedValue(() => (onlyOne ? wasInView.value : visible.value))
    const scale = useDerivedValue(() => withSpring(actualVisible.value ? 1 : 0.2))
    const rotate = useDerivedValue(() => withSpring(actualVisible.value ? 0 : 30))
    const translateY = useDerivedValue(() => withSpring(actualVisible.value ? 0 : -100))
    const style = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }, { translateY: translateY.value }]
    }))
    useDerivedValue(() => {
        if (visible.value) {
            wasInView.value = true
        }
    })
    return (
        <Animated.View ref={ref} style={styles.container}>
            <Animated.View style={[style, styles.backgroundContainer, { backgroundColor: Palette[color] }]}>
                {image ? <View style={styles.containerImage}><Image source={image.source} style={[styles.img]} /></View> : null}
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </Animated.View>
        </Animated.View>
    )
}
const InSideViewComponent = () => {
    return (
        <Block block color={'#99C24D'}>
            {/* <ScrollView contentContainerStyle={styles.content}>
                {example.map((card, index) => (
                    <Wrap
                        key={index}
                        {...card}
                    />
                ))}
            </ScrollView> */}
            <FlatList data={example} renderItem={({ item, index }) => <Wrap
                key={index}
                {...item}
            />} contentContainerStyle={styles.content}>
                {example.map((card, index) => (
                    <Wrap
                        key={index}
                        {...card}
                    />
                ))}
            </FlatList>
        </Block>
    )
}

export const InSideView = memo(InSideViewComponent, isEqual)