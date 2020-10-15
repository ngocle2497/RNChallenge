import React from 'react'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { RootStackParamList1, SHARE_SCREEN } from '../ScreenType'
import { ListScreen } from './ListScreen';
import { DetailScreen } from './DetailScreen';
import { TransitionPresets } from '@react-navigation/stack';

const Stack = createSharedElementStackNavigator<RootStackParamList1>();


export const TransitionRoute1 = () => {
    return (
        <Stack.Navigator screenOptions={{ ...TransitionPresets.SlideFromRightIOS, gestureEnabled: false }}>
            <Stack.Screen name={SHARE_SCREEN.TRANSITION_1_1} component={ListScreen} />
            <Stack.Screen name={SHARE_SCREEN.TRANSITION_1_2} sharedElementsConfig={(route, otherRoute, isShowing) => {
                return [
                    {
                        id: route.params.data.id,
                        resize: 'clip',
                        align: 'center-top'
                    },
                ]
            }} component={DetailScreen} />
        </Stack.Navigator>
    )
}