import React, { memo } from 'react'
import { ScrollView } from 'react-native'
import isEqual from 'react-fast-compare';
import { RowButton } from './components/RowButton';
import { navigateJ } from '@navigation/NavigationService';
import { APP_SCREEN } from '@navigation/ScreenTypes';
import { Block } from '@components';

const MainComponent = () => {
    const _onPressItem = (index: number) => {
        switch (index) {
            case 1:
                navigateJ(APP_SCREEN.BOUNCING)
                break;
            case 2:
                navigateJ(APP_SCREEN.TIMING)
                break;
            case 3:
                navigateJ(APP_SCREEN.DYNAMIC_SPRING)
                break;
            case 4:
                navigateJ(APP_SCREEN.DECAY)
                break;
            case 5:
                navigateJ(APP_SCREEN.FACEBOOK_STORY)
                break;
            case 6:
                navigateJ(APP_SCREEN.WHEEL_PICKER)
                break;
            case 7:
                navigateJ(APP_SCREEN.JELLY_LIST)
                break;
            case 8:
                navigateJ(APP_SCREEN.TRANSITION)
                break;
            case 9:
                navigateJ(APP_SCREEN.WAVY)
                break;
            case 10:
                navigateJ(APP_SCREEN.TELEGRAM)
                break;
            case 11:
                navigateJ(APP_SCREEN.SHARE_ELEMENT)
                break;
            case 12:
                navigateJ(APP_SCREEN.CIRCLE_MENU)
                break;
            case 13:
                navigateJ(APP_SCREEN.YOU_TUBE)
                break;
            case 14:
                navigateJ(APP_SCREEN.WAVE)
                break;
            case 15:
                navigateJ(APP_SCREEN.INDICATOR)
                break;
            default:
                break;
        }
    }
    return (
        <Block block>
            <ScrollView showsVerticalScrollIndicator={false}>
                <RowButton img={'spring'} onPress={_onPressItem} index={1} tx={'main:txBouncing'} />
                <RowButton img={'clock'} onPress={_onPressItem} index={2} tx={'main:timing:txTiming'} />
                <RowButton img={'dynamic'} onPress={_onPressItem} index={3} tx={'main:txDynamicSpring'} />
                <RowButton img={'decay'} onPress={_onPressItem} index={4} tx={'main:txDecay'} />
                <RowButton img={'story_fb'} onPress={_onPressItem} index={5} tx={'main:txStoryFacebook'} />
                <RowButton img={'picker'} onPress={_onPressItem} index={6} tx={'main:txPicker'} />
                <RowButton img={'jelly'} onPress={_onPressItem} index={7} tx={'main:txJelly'} />
                <RowButton img={'transition'} onPress={_onPressItem} index={8} tx={'main:transition:txTransition'} />
                <RowButton img={'wavy'} onPress={_onPressItem} index={9} tx={'main:txWavy'} />
                <RowButton img={'telegram'} onPress={_onPressItem} index={10} tx={'main:telegram:txTelegram'} />
                <RowButton img={'share_element'} onPress={_onPressItem} index={11} tx={'main:shareElement:txShareElement'} />
                <RowButton img={'menu'} onPress={_onPressItem} index={12} tx={'main:circleMenu:txCircle'} />
                <RowButton img={'you_tube'} onPress={_onPressItem} index={13} tx={'main:youtube:txTitle'} />
                <RowButton img={'wave'} onPress={_onPressItem} index={14} tx={'main:wave'} />
                <RowButton img={'indicator'} onPress={_onPressItem} index={15} tx={'main:indicator'} />
            </ScrollView>
        </Block>
    )
}

export const Main = memo(MainComponent, isEqual)