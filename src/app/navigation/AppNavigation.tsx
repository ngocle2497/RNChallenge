import React, { memo, useEffect } from 'react'
import isEqual from 'react-fast-compare'
import SplashScreen from 'react-native-splash-screen'
import { createStackNavigator, StackNavigationOptions, TransitionPresets } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './NavigationService'
import { APP_SCREEN } from './ScreenTypes'
import { Main } from '@features/main/Main'
import { StyleSheet, StatusBar } from 'react-native'
import { Bouncing } from '@features/children/bouncing/Bouncing'
import { Icon } from '@components'
import { Timing } from '@features/children/timing/Timing'
import { DynamicSpring } from '@features/children/dynamicSpring/DynamicSpring'
import { Decay } from '@features/children/decay/Decay'
import { APP_COLOR } from '@config'

const MainStack = createStackNavigator()
const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
        tintColor:'white'
    }
})
const baseOption: StackNavigationOptions = {
    headerTitleAlign: "center",
    headerStyle: {
        elevation: 0, borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#bbbb',
        backgroundColor: APP_COLOR
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
const timingOption: StackNavigationOptions = {
    headerTitle: "Animated Timing"
}
const dynamicOption: StackNavigationOptions = {
    headerTitle: "Animated Dynamic"
}
const decayOption: StackNavigationOptions = {
    headerTitle: "Animated Decay"
}

const AppNavigationComponent = () => {
    useEffect(() => {
        SplashScreen.hide()
    }, [])
    return (
        <NavigationContainer ref={navigationRef}>
            <StatusBar backgroundColor={APP_COLOR} barStyle={'light-content'}/>
            <MainStack.Navigator screenOptions={{ gestureEnabled: true, headerShown: true,headerTintColor:"white", ...TransitionPresets.SlideFromRightIOS }}>
                <MainStack.Screen options={StyleSheet.flatten([baseOption, mainOption])} name={APP_SCREEN.MAIN} component={Main} />
                <MainStack.Screen options={StyleSheet.flatten([baseOption, bouncingOption])} name={APP_SCREEN.BOUNCING} component={Bouncing} />
                <MainStack.Screen options={StyleSheet.flatten([baseOption, timingOption])} name={APP_SCREEN.TIMING} component={Timing} />
                <MainStack.Screen options={StyleSheet.flatten([baseOption, dynamicOption])} name={APP_SCREEN.DYNAMIC_SPRING} component={DynamicSpring} />
                <MainStack.Screen options={StyleSheet.flatten([baseOption, decayOption])} name={APP_SCREEN.DECAY} component={Decay} />
            </MainStack.Navigator>
        </NavigationContainer>
    )
}

export const AppNavigation = memo(AppNavigationComponent, isEqual)