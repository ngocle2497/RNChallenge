import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { JellyData } from './Jelly'
import Animated, { useAnimatedStyle, interpolate, Extrapolate, withSpring } from 'react-native-reanimated'
import { Img } from '@components'

interface CardProps {
    item: JellyData;
    velocity: Animated.SharedValue<number>;
}

const CardComponent = ({ item, velocity }: CardProps) => {
    const cardStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                skewY:
                    withSpring(interpolate(velocity.value,
                        [-1, 0, 1],
                        [-Math.PI / 18, 0, Math.PI / 18],
                        // Extrapolate.CLAMP
                    ))
            }, { perspective: 400 }],
            overflow: 'hidden',
            justifyContent: "center",
            alignItems: "center",
        }
    })
    return (
        <Animated.View style={[cardStyle]}>
            <Img source={item.uri} />
        </Animated.View>
    )
}

export const Card = memo(CardComponent, isEqual)