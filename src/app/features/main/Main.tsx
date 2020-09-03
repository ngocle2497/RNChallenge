import React, { memo } from 'react'
import { View, StyleSheet } from 'react-native'
import isEqual from 'react-fast-compare';
import { Screen } from '@components';
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
            default:
                break;
        }
    }
    return (
        <Screen scroll statusColor={APP_COLOR} statusBar={'light-content'}>
            <RowButton img={'spring'} onPress={_onPressItem} index={1} tx={'main:txBouncing'} />
            <RowButton img={'clock'} onPress={_onPressItem} index={2} tx={'main:timing:txTiming'} />
            <RowButton img={'dynamic'} onPress={_onPressItem} index={3} tx={'main:txDynamicSpring'} />
            <RowButton img={'decay'} onPress={_onPressItem} index={4} tx={'main:txDecay'} />
        </Screen>
    )
}

export const Main = memo(MainComponent, isEqual)