import React, { memo, useRef } from 'react'
import { View, Text, StyleSheet, FlatList, NativeSyntheticEvent, NativeScrollEvent, } from 'react-native'
import isEqual from 'react-fast-compare';
import { SizeBox, Icon, Block } from '@components';
import { onScrollEvent } from '@animated';
import Animated, { interpolateNode, Extrapolate, useValue } from 'react-native-reanimated';
import FastImage from 'react-native-fast-image'
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const WIDTH_IMG = 125
const SIZE_AVATAR = 17
const SIZE_WRAP_AVATAR = 20
const BASE_HEIGHT = 200

const styles = StyleSheet.create({
    wrap: {
        width: '100%',
        height: BASE_HEIGHT,
        flexDirection: 'row'
        // backgroundColor: 'red',
    },
    wrapImage: {
        width: WIDTH_IMG,
        height: '100%',
        overflow: 'hidden',
        borderRadius: 20
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    wrapAvatar: {
        width: SIZE_WRAP_AVATAR * 2,
        height: SIZE_WRAP_AVATAR * 2,
        borderRadius: SIZE_WRAP_AVATAR,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#0057e7',
        position: 'absolute',
        top: 10,
        left: 10
    },
    avatar: {
        width: SIZE_AVATAR * 2,
        height: SIZE_AVATAR * 2,
        borderRadius: SIZE_AVATAR,
        resizeMode: 'cover'
    },
    content: {
        paddingLeft: WIDTH_IMG + 10
    },
    wrapFirstItem: {
        position: 'absolute',
        height: '100%',
        width: WIDTH_IMG,
        borderRadius: 20,

        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#bbb',
        zIndex: 1
    },
    wrapTop: {
        width: WIDTH_IMG,
        height: BASE_HEIGHT * 0.6,
        // overflow:'hidden'
        // backgroundColor:'red'
    },
    baseAvatar: {
        width: WIDTH_IMG,
        height: BASE_HEIGHT * 0.6,
        resizeMode: 'cover'
    },
    wrapBottom: {
        flex: 1,
        justifyContent: 'flex-end',
        // backgroundColor:'#FFFFFF'
    },
    wrapIcon: {
        position: 'absolute',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        width: 28,
        height: 28,
        borderRadius: 14,
        alignSelf: 'center',
        bottom: -15,
        backgroundColor: '#FFFFFF'
    }

});
interface FacebookStoryData {
    id: number;
    avatar: string;
    bg: string;
}
const data: FacebookStoryData[] = [
    {
        id: 1,
        avatar: 'https://www.backgroundscool.com/wp-content/uploads/2019/12/crop-30-18.jpg',
        bg: 'https://image.winudf.com/v2/image1/Y29tLmhkd2Nhci50aWFua29uZ2JpemhpX3NjcmVlbl81XzE1NjcwMDYyNzdfMDU0/screen-5.jpg?fakeurl=1&type=.jpg'
    },
    {
        id: 2,
        avatar: 'https://newevolutiondesigns.com/images/freebies/cool-wallpaper-3.jpg',
        bg: 'https://image.winudf.com/v2/image1/Y29tLnBlcmZhY3RhcHBzLmphbWVzLm5hdHVyZV9zY3JlZW5fMV8xNTQyOTA5OTc0XzA0MA/screen-1.jpg?fakeurl=1&type=.jpg'
    },
    {
        id: 3,
        avatar: 'https://images.pexels.com/photos/719396/pexels-photo-719396.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        bg: 'https://wonderfulengineering.com/wp-content/uploads/2016/01/nature-wallpapers-38.jpg'
    },
    {
        id: 4,
        avatar: 'https://www.setaswall.com/wp-content/uploads/2018/11/PUBG-Phone-Wallpaper-02-1080x2340-340x550.jpg',
        bg: 'https://i.pinimg.com/originals/15/05/a7/1505a796ee38433c10e9dca2db9e3a60.jpg'
    },
    {
        id: 6,
        avatar: 'https://www.iliketowastemytime.com/sites/default/files/imagecache/blog_image/18-wheeler-tractor-trailer-semi-hd-wallpaper-edit-by-yuriy-sklyar-iltwmt.jpg',
        bg: 'https://www.hdwallpapers.in/thumbs/2020/sun_passing_through_green_trees_under_purple_field_with_clouds_4k_5k_hd_nature-t1.jpg'
    },
]
interface FirstItemProps {
    progress: Animated.Node<number>
}
const FirstItem = ({ progress }: FirstItemProps) => {
    const widthWrap = interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [WIDTH_IMG, WIDTH_IMG - 50],
        extrapolate: Extrapolate.CLAMP
    })
    const heightWrap = interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [BASE_HEIGHT, 60],
        extrapolate: Extrapolate.CLAMP
    })
    const borderWidth = interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [1, 0],
        extrapolate: Extrapolate.CLAMP
    })
    const borderTopLeftRadius = interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [20, 0],
        extrapolate: Extrapolate.CLAMP
    })
    const borderBottomLeftRadius = interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [20, 0],
        extrapolate: Extrapolate.CLAMP
    })
    const borderTopRightRadius = interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [20, 30],
        extrapolate: Extrapolate.CLAMP
    })
    const borderBottomRightRadius = interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [20, 30],
        extrapolate: Extrapolate.CLAMP
    })
    const opacityBottom = interpolateNode(progress, {
        inputRange: [0, 0.5],
        outputRange: [1, 0],
        extrapolate: Extrapolate.CLAMP
    })
    const widthTop = interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [WIDTH_IMG, 50],
        extrapolate: Extrapolate.CLAMP
    })
    const heightTop = interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [WIDTH_IMG, 50],
        extrapolate: Extrapolate.CLAMP
    })
    const radiusTop = interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [0, 25],
        extrapolate: Extrapolate.CLAMP
    })
    const top = interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [0, 9],
        extrapolate: Extrapolate.CLAMP
    })
    const translateX = interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [0, 7],
        extrapolate: Extrapolate.CLAMP
    })
    const scale = interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [1, 0.6],
        extrapolate: Extrapolate.CLAMP
    })
    const translateX1 = interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [0, 17],
        extrapolate: Extrapolate.CLAMP
    })
    const bottom = interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [-15, -9],
        extrapolate: Extrapolate.CLAMP
    })
    return (
        <Animated.View style={[styles.wrapFirstItem, { width: widthWrap, height: heightWrap, borderTopRightRadius, borderBottomRightRadius, borderWidth, borderBottomLeftRadius, borderTopLeftRadius }]}>
            <Animated.View style={[styles.wrapTop, { transform: [{ translateX }], width: widthTop, height: heightTop, borderRadius: radiusTop, top }]}>
                <Animated.Image style={[styles.baseAvatar, { width: widthTop, height: heightTop, borderRadius: radiusTop }]} source={{ uri: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' }} />
                <Animated.View style={[styles.wrapIcon, { bottom, transform: [{ scale }, { translateX: translateX1 }] }]}>
                    <Icon icon={'plus'} />
                </Animated.View>
            </Animated.View>
            <Animated.View style={[styles.wrapBottom, { opacity: opacityBottom }]}>
                <Text>Tin của bạn</Text>
            </Animated.View>
        </Animated.View>
    )
}

const FacebookStoryComponent = () => {
    const _ref = useRef<any>(null)
    const x = useValue(0)
    const progress = interpolateNode(x, {
        inputRange: [0, WIDTH_IMG + 10],
        outputRange: [0, 1],
        extrapolate: Extrapolate.CLAMP
    })
    const _renderItem = ({ item }: { item: FacebookStoryData }) => {
        return (
            <View style={[styles.wrapImage]}>
                <FastImage style={[styles.img]} source={{ uri: item.bg }} />
                <View style={[styles.wrapAvatar]}>
                    <FastImage style={[styles.avatar]} source={{ uri: item.avatar }} />
                </View>
            </View>
        )
    }
    const _keyExtractor = (item: FacebookStoryData) => String(item.id)
    const _renderSpace = () => {
        return (
            <SizeBox width={10} />
        )
    }
    const _onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const x = event.nativeEvent.contentOffset.x
        if (x < WIDTH_IMG) {
            if (x > WIDTH_IMG / 2) {
                _ref.current?.getNode().scrollToOffset({ offset: WIDTH_IMG + 10 })
            } else {
                _ref.current?.getNode().scrollToOffset({ offset: 0 })
            }
        }
    }
    return (
        <Block block middle justifyContent={'center'}>
            <View style={[styles.wrap]}>
                <FirstItem {...{ progress }} />
                <AnimatedFlatList onScroll={onScrollEvent({ x })} onMomentumScrollEnd={_onScrollEnd} ref={_ref} data={data} showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.content]} ItemSeparatorComponent={_renderSpace} horizontal renderItem={_renderItem} keyExtractor={_keyExtractor} />
            </View>
        </Block>
    )
}

export const FacebookStory = memo(FacebookStoryComponent, isEqual)