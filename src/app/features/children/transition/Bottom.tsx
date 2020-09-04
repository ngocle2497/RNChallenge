import React, { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import isEqual from 'react-fast-compare';
import { Block, Icon } from '@components';

const ANCHOR_WIDTH = 100
const ANCHOR_HEIGHT = 1.5

const styles = StyleSheet.create({
    signal: {
        position: 'absolute',
        alignSelf: 'flex-start',
        bottom: 5
    },
    anchor: {
        width: ANCHOR_WIDTH,
        height: ANCHOR_HEIGHT,
        borderRadius: ANCHOR_HEIGHT,
        backgroundColor: 'rgba(0,0,0,0.4)',

    }
});

const BottomComponent = () => {
    return (
        <Block justifyContent={'flex-end'} middle paddingVertical={5}>
            <Block style={[styles.anchor]} />
            <Block style={[styles.signal]}>
                <Icon icon={'signal'} />
            </Block>
        </Block>
    )
}

export const Bottom = memo(BottomComponent, isEqual)