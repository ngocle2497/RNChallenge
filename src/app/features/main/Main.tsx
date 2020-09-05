import React, { memo } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import isEqual from 'react-fast-compare';
import { Screen, Block } from '@components';
import { APP_COLOR } from '@config';
import { RowButton } from './components/RowButton';
import { navigate } from '@navigation/NavigationService';
import { APP_SCREEN } from '@navigation/ScreenTypes';

const MainComponent = () => {
    const _onPressItem = (index: number) => {
        switch (index) {
            case 1:
                navigate(APP_SCREEN.BOUNCING)
                break;
            case 2:
                navigate(APP_SCREEN.TIMING)
                break;
            case 3:
                navigate(APP_SCREEN.DYNAMIC_SPRING)
                break;
            case 4:
                navigate(APP_SCREEN.DECAY)
                break;
            case 5:
                navigate(APP_SCREEN.FACEBOOK_STORY)
                break;
            case 6:
                navigate(APP_SCREEN.WHEEL_PICKER)
                break;
            case 7:
                navigate(APP_SCREEN.JELLY_LIST)
                break;
            case 8:
                navigate(APP_SCREEN.TRANSITION)
                break;
            case 9:
                navigate(APP_SCREEN.WAVY)
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
            </ScrollView>
        </Block>
    )
}

export const Main = memo(MainComponent, isEqual)