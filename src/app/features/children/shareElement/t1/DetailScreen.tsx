import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
import isEqual from 'react-fast-compare'
import { RootStackParamList1, SHARE_SCREEN } from '../ScreenType'
import { StackScreenProps } from '@react-navigation/stack'
import { Block, ImageRemote } from '@components'
import { SharedElement } from 'react-navigation-shared-element'

type DetailScreenProps = StackScreenProps<RootStackParamList1, SHARE_SCREEN.TRANSITION_1_2>

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: '100%'
    },
    imageDefault: {
        width: '100%',
        height: '100%'
    },
})

const DetailScreenComponent = ({ route: { params: { data } } }: DetailScreenProps) => {
    return (
        <Block block justifyContent={'center'}>
            <SharedElement id={`${data.id}`}>
                <ImageRemote styleDefault={[styles.imageDefault]} style={[styles.img]} resizeMode={'cover'} imgSource={data.url} />
            </SharedElement>
        </Block>
    )
}

export const DetailScreen = memo(DetailScreenComponent, isEqual)