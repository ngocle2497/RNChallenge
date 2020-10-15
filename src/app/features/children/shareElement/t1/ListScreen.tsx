import React, { memo, useCallback } from 'react'
import isEqual from 'react-fast-compare'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList1, SHARE_SCREEN } from '../ScreenType'
import { dataImage } from './constant'
import { Block, ImageRemote, SizeBox } from '@components'
import { FlatList, ListRenderItemInfo, useWindowDimensions, TouchableOpacity, StyleSheet } from 'react-native'
import { ImageItem } from './type'
import { navigate } from '@navigation/NavigationService'
import { SharedElement } from 'react-navigation-shared-element'

type ListScreenProps = StackScreenProps<RootStackParamList1, SHARE_SCREEN.TRANSITION_1_1>

const styles = StyleSheet.create({
    block: {
        flex: 1
    },
    imageDefault: {
        width: '100%',
        height: '100%'
    },
    img: {
        width: '100%',
        height: '100%'
    }
})

const ItemView = memo(({ item, onPress }: { item: ImageItem, onPress: (item: ImageItem) => void }) => {
    const _onPress = useCallback(() => {
        if (typeof onPress === 'function') {
            onPress(item)
        }
    }, [item])
    return (
        <Block padding={5} height={350} block >
            <TouchableOpacity style={[styles.block]} onPress={_onPress}>
                <Block block borderRadius={10} justifyContent={'center'} overflow={'hidden'}>
                    <SharedElement id={`${item.id}`}>
                        <ImageRemote styleDefault={[styles.imageDefault]} style={[styles.img]} resizeMode={'cover'} imgSource={item.url} />
                    </SharedElement>
                </Block>
            </TouchableOpacity>
        </Block>
    )
}, isEqual)

const ListScreenComponent = ({ }: ListScreenProps) => {

    const _onItemPress = useCallback((image: ImageItem) => {
        navigate(SHARE_SCREEN.TRANSITION_1_2, { data: image })
    }, [])

    const _keyExtractor = useCallback((item: ImageItem) => item.id.toString(), [])

    const _renderItem = useCallback(({ item }: ListRenderItemInfo<ImageItem>) => <ItemView {...{ item, onPress: _onItemPress }} />, [dataImage])
    return (
        <Block block>
            <FlatList
                data={dataImage}
                renderItem={_renderItem}
                keyExtractor={_keyExtractor}
                numColumns={2}
                showsVerticalScrollIndicator={false} />
        </Block>
    )
}

export const ListScreen = memo(ListScreenComponent, isEqual)