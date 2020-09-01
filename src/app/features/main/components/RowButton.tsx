import React, { memo, useCallback } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import isEqual from 'react-fast-compare';
import { Block, Text, Divider, Icon, Img } from '@components';
import { ImageTypes } from '@assets/image';

const styles = StyleSheet.create({
    text: {
        flex: 1,
        paddingLeft: 5
    }
})

interface RowButtonProps {
    tx: string;
    index: number;
    onPress: (index: number) => void;
    img: ImageTypes;
}
const RowButtonComponent = ({ index, onPress, tx, img }: RowButtonProps) => {
    const _onPress = useCallback(() => {
        if (typeof onPress === 'function') {
            onPress(index)
        }
    }, [])
    return (
        <>
            <TouchableOpacity onPress={_onPress} activeOpacity={0.5}>
                <Block color={'#FFFFFF'} middle width={'100%'} paddingVertical={10} paddingHorizontal={10} direction={'row'}>
                    <Img source={img} />
                    <Text style={[styles.text]} tx={tx} />
                    <Icon icon={'arrowRight'} />
                </Block>
            </TouchableOpacity>
            <Divider />
        </>
    )
}

export const RowButton = memo(RowButtonComponent, isEqual)