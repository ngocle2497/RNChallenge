import React, { useCallback } from 'react'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { RootStackParamList1, SHARE_SCREEN } from '../ScreenType'
import { ListScreen } from './ListScreen';
import { DetailScreen } from './DetailScreen';
import { TransitionPresets, StackNavigationOptions, HeaderBackButton, StackScreenProps } from '@react-navigation/stack';
import { APP_COLOR } from '@config';
const Stack = createSharedElementStackNavigator<RootStackParamList1>();

const headerAnimation: StackNavigationOptions = {
    ...TransitionPresets.SlideFromRightIOS,
    gestureEnabled: false,
    headerTintColor: '#FFFFFF',
    headerTitleAlign: 'center',
    headerTitle: 'Share Element',
    headerLeft: ({ onPress, }) => <HeaderBackButton tintColor={'#FFFFFF'} onPress={onPress} />,
    headerStyle: {
        backgroundColor: APP_COLOR
    },
}

export const TransitionRoute1 = ({ navigation }: StackScreenProps<RootStackParamList1, SHARE_SCREEN.TRANSITION_1_ROOT>) => {
    const _onGoBack = useCallback(() => { navigation.goBack() }, [navigation])
    return (
        <Stack.Navigator screenOptions={headerAnimation}>
            <Stack.Screen name={SHARE_SCREEN.TRANSITION_1_1} component={ListScreen}
                options={{ headerLeft: () => <HeaderBackButton tintColor={'#FFFFFF'} onPress={_onGoBack} />, }} />
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