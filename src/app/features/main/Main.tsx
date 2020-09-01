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

            default:
                break;
        }
    }
    return (
        <Screen scroll statusColor={APP_COLOR} statusBar={'light-content'}>
            <RowButton img={'spring'} onPress={_onPressItem} index={1} tx={'main:txBouncing'} />
        </Screen>
    )
}

export const Main = memo(MainComponent, isEqual)