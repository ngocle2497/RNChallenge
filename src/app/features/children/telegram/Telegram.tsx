import React, { memo } from 'react'
import isEqual from 'react-fast-compare';
import { Block, Text, SizeBox, Img, Icon } from '@components';
import { RowButton } from './RowButton';
import { ShadowConfig } from '../../../library/components/Block/Block.props'
import Animated, { useAnimatedStyle, useAnimatedScrollHandler, useSharedValue, interpolate, Extrapolate, withTiming, useDerivedValue } from 'react-native-reanimated';
import { useWindowDimensions, StyleSheet } from 'react-native';


const shadowConfig: ShadowConfig = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,

    elevation: 1,
}
const styles = StyleSheet.create({
    avatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    icon: {
        tintColor: '#FFFFFF'
    }
})
const MIN_HEADER_HEIGHT = 60;

const PERCENT_HEIGHT = 0.55

const SIZE_AVATAR_ROUND = 90

const OFFSET_TO_START_ANIMATION = 130


const TelegramComponent = () => {
    const offsetY = useSharedValue(0)
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions()
    const heightHeader = useDerivedValue(() =>
        interpolate(offsetY.value, [0, SCREEN_HEIGHT * PERCENT_HEIGHT - MIN_HEADER_HEIGHT], [SCREEN_HEIGHT * PERCENT_HEIGHT, MIN_HEADER_HEIGHT], Extrapolate.CLAMP))
    const wrapHeaderStyle = useAnimatedStyle(() => ({
        overflow: 'hidden',
        alignItems: 'center',
        backgroundColor: '#3498db',
        flexDirection: 'row',
        position: 'absolute',
        zIndex: 1,
        width: SCREEN_WIDTH,
        height: heightHeader.value
    }))
    const wrapAvatarStyle = useAnimatedStyle(() => ({
        overflow: 'hidden',
        transform: [{
            scale: offsetY.value < OFFSET_TO_START_ANIMATION ?
                withTiming(1) :
                interpolate(offsetY.value, [OFFSET_TO_START_ANIMATION, SCREEN_HEIGHT * PERCENT_HEIGHT - MIN_HEADER_HEIGHT], [1, 0.5], Extrapolate.CLAMP)
        }],
        marginLeft: offsetY.value < OFFSET_TO_START_ANIMATION ?
            withTiming(0) :
            interpolate(offsetY.value, [OFFSET_TO_START_ANIMATION, SCREEN_HEIGHT * PERCENT_HEIGHT - MIN_HEADER_HEIGHT], [1, 25], Extrapolate.CLAMP),

        width: offsetY.value < OFFSET_TO_START_ANIMATION ? withTiming(SCREEN_WIDTH) : withTiming(SIZE_AVATAR_ROUND),
        height: offsetY.value < OFFSET_TO_START_ANIMATION ? withTiming(SCREEN_HEIGHT * PERCENT_HEIGHT) : withTiming(SIZE_AVATAR_ROUND),
        borderRadius: offsetY.value < OFFSET_TO_START_ANIMATION ? withTiming(0) : withTiming(SIZE_AVATAR_ROUND / 2)
    }))
    const wrapTextStyle = useAnimatedStyle(() => ({
        zIndex: 3,
        transform: [
            {
                translateY: offsetY.value < OFFSET_TO_START_ANIMATION ? withTiming(0) : withTiming(0)
            },
            {
                translateX: offsetY.value < OFFSET_TO_START_ANIMATION ? withTiming(-(SCREEN_WIDTH - 20)) : withTiming(0)
            },
        ]
    }))
    const spaceView = useAnimatedStyle(() => ({
        height: offsetY.value < OFFSET_TO_START_ANIMATION ? withTiming(150) : withTiming(0)
    }))
    const textStyle = useAnimatedStyle(() => ({
        color: '#FFFFFF',
        fontSize: offsetY.value < OFFSET_TO_START_ANIMATION ? withTiming(25) : withTiming(18),
        fontWeight: 'bold'
    }))
    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            offsetY.value = event.contentOffset.y

        }
    })
    return (
        <Block block color={'rgba(255,255,255,0.1)'}>
            <Animated.View style={[wrapHeaderStyle]}>
                <Animated.View style={wrapAvatarStyle}>
                    <Img style={[styles.avatar]} source={'avatar'} />
                </Animated.View>
                <Animated.View style={[wrapTextStyle]}>
                    <Animated.View style={[spaceView]} />
                    <Animated.Text style={[textStyle]}>Hồng Ngọc</Animated.Text>
                    <Text color={'#ecf0f1'} tx={'main:telegram:txOnline'} />
                </Animated.View>
            </Animated.View>
            <Block zIndex={3} position={'absolute'} top={15} right={10}>
                <Icon style={[styles.icon]} icon={'search'} />
            </Block>
            <Block zIndex={3} position={'absolute'} top={15} left={10}>
                <Icon style={[styles.icon]} icon={'arrowLeft'} />
            </Block>
            <Animated.ScrollView scrollEventThrottle={16} onScroll={onScroll} contentContainerStyle={{ paddingTop: SCREEN_HEIGHT * PERCENT_HEIGHT }} overScrollMode={'never'} bounces={false} showsVerticalScrollIndicator={false}>
                <Block color={'white'} shadow shadowConfig={shadowConfig}>
                    <Block paddingTop={10} paddingHorizontal={16}>
                        <Text color={'#3498db'} fontWeight={'bold'} tx={'main:telegram:txAccount'} />
                    </Block>
                    <RowButton title={'+84 98 601997'} txSub={'main:telegram:txTapToChangePhone'} />
                    <RowButton title={'@HNgocL'} txSub={'main:telegram:txUserName'} />
                    <RowButton showDivider={false} title={'Change is Good!'} txSub={'main:telegram:txBio'} />
                </Block>
                <SizeBox height={10} />
                <Block color={'white'} shadow shadowConfig={shadowConfig}>
                    <Block paddingTop={10} paddingHorizontal={16}>
                        <Text color={'#3498db'} fontWeight={'bold'} tx={'main:telegram:txSetting'} />
                    </Block>
                    <RowButton icon={'notification'} txTitle={'main:telegram:txNotification'} />
                    <RowButton icon={'lock'} txTitle={'main:telegram:txSecurity'} />
                    <RowButton icon={'data_pie'} txTitle={'main:telegram:txData'} />
                    <RowButton icon={'chat'} txTitle={'main:telegram:txChatSetting'} />
                    <RowButton icon={'folder'} txTitle={'main:telegram:txFolder'} />
                    <RowButton icon={'device'} txTitle={'main:telegram:txDevice'} />
                    <RowButton showDivider={false} icon={'language'} txTitle={'main:telegram:txLanguage'} />
                </Block>
                <SizeBox height={10} />
                <Block color={'white'} shadow shadowConfig={shadowConfig}>
                    <Block paddingTop={10} paddingHorizontal={16}>
                        <Text color={'#3498db'} fontWeight={'bold'} tx={'main:telegram:txHelp'} />
                    </Block>
                    <RowButton icon={'ask_q'} txTitle={'main:telegram:txAsk'} />
                    <RowButton icon={'faq'} txTitle={'main:telegram:txFAQ'} />
                    <RowButton showDivider={false} icon={'privacy'} txTitle={'main:telegram:txPrivacy'} />
                </Block>
                <Block>
                    <Block paddingVertical={10} paddingHorizontal={16} middle>
                        <Text color={'gray'} fontSize={'FONT_13'} tx={'main:telegram:txVersion'} />
                    </Block>
                </Block>
            </Animated.ScrollView>
        </Block>
    )
}

export const Telegram = memo(TelegramComponent, isEqual)