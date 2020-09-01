import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { createStackNavigator, StackNavigationOptions, TransitionPresets } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './NavigationService'
import { APP_SCREEN } from './ScreenTypes'
import { Main } from '@features/main/Main'
import { StyleSheet } from 'react-native'
import { Bouncing } from '@features/children/bouncing/Bouncing'
import { Icon } from '@components'

const MainStack = createStackNavigator()
const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24
    }
})
const baseOption: StackNavigationOptions = {
    headerTitleAlign: "center",
    headerStyle: {
        elevation: 0, borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#bbbb'
    },
    headerBackTitle: "Back",
    headerBackImage: () => <Icon style={[styles.icon]} icon={'arrowLeft'} />,
}
const mainOption: StackNavigationOptions = {
    headerTitle: "Animated Challenge"
}
const bouncingOption: StackNavigationOptions = {
    headerTitle: "Animated Bouncing"
}

const AppNavigationComponent = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <MainStack.Navigator screenOptions={{ gestureEnabled: true, ...TransitionPresets.SlideFromRightIOS }}>
                <MainStack.Screen options={StyleSheet.flatten([baseOption, mainOption])} name={APP_SCREEN.MAIN} component={Main} />
                <MainStack.Screen options={StyleSheet.flatten([baseOption, bouncingOption])} name={APP_SCREEN.BOUNCING} component={Bouncing} />
            </MainStack.Navigator>
        </NavigationContainer>
    )
}

export const AppNavigation = memo(AppNavigationComponent, isEqual)