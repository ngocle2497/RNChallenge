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
import { FacebookStory } from '@features/children/storyFacebook/StoryFacebook'
import { Wheel } from '@features/children/picker/Wheel'
import { Jelly } from '@features/children/jelly/Jelly'
import { Transition } from '@features/children/transition/Transition'
import { WavyLoading } from '@features/children/wavyLoading/WavyLoading'
import { Telegram } from '@features/children/telegram/Telegram'
import { CircleMenu } from '@features/children/circleMenu/CircleMenu'
import { ShareElement } from '@features/children/shareElement/ShareElementRoute'
import { You_tube } from '@features/children/youtube/Youtube'
import { Wave } from '@features/children/wave/Wave'
import { Indicator } from '@features/children/indicator/Indicator'

const MainStack = createStackNavigator()
const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
        tintColor: 'white'
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
const facebookStoryOption: StackNavigationOptions = {
    headerTitle: "Facebook Story"
}
const wheelOption: StackNavigationOptions = {
    headerTitle: "Wheel Picker"
}
const jellyOption: StackNavigationOptions = {
    headerTitle: "Jelly List"
}
const transitionOption: StackNavigationOptions = {
    headerTitle: "Transition"
}
const wavyOption: StackNavigationOptions = {
    headerTitle: "Wavy Circle Loading"
}
const telegramOption: StackNavigationOptions = {
    headerTitle: "Telegram Header",
    headerShown: false
}
const shareElementMenuOption: StackNavigationOptions = {
    headerTitle: "Share Element",
    headerShown: false
}
const circleMenuOption: StackNavigationOptions = {
    headerTitle: "Circle Menu"
}
const youtubeOption: StackNavigationOptions = {
    headerTitle: "Youtube Transition"
}
const waveOption: StackNavigationOptions = {
    headerTitle: "Wave Transition"
}
const indicatorOption: StackNavigationOptions = {
    headerTitle: "Indicator Animation"
}
const AppNavigationComponent = () => {
    useEffect(() => {
        SplashScreen.hide()
    }, [])
    return (
        <NavigationContainer ref={navigationRef} >
            <StatusBar backgroundColor={APP_COLOR} barStyle={'light-content'} />
            <MainStack.Navigator screenOptions={{ gestureEnabled: true, headerShown: true, headerTintColor: "white", ...TransitionPresets.SlideFromRightIOS }}>
                <MainStack.Screen options={StyleSheet.flatten([baseOption, mainOption])} name={APP_SCREEN.MAIN} component={Main} />
                <MainStack.Screen options={StyleSheet.flatten([baseOption, bouncingOption])} name={APP_SCREEN.BOUNCING} component={Bouncing} />
                <MainStack.Screen options={StyleSheet.flatten([baseOption, timingOption])} name={APP_SCREEN.TIMING} component={Timing} />
                <MainStack.Screen options={StyleSheet.flatten([baseOption, dynamicOption])} name={APP_SCREEN.DYNAMIC_SPRING} component={DynamicSpring} />
                <MainStack.Screen options={StyleSheet.flatten([baseOption, decayOption])} name={APP_SCREEN.DECAY} component={Decay} />
                <MainStack.Screen options={StyleSheet.flatten([baseOption, facebookStoryOption])} name={APP_SCREEN.FACEBOOK_STORY} component={FacebookStory} />
                <MainStack.Screen options={StyleSheet.flatten([baseOption, wheelOption])} name={APP_SCREEN.WHEEL_PICKER} component={Wheel} />
                <MainStack.Screen options={StyleSheet.flatten([baseOption, jellyOption])} name={APP_SCREEN.JELLY_LIST} component={Jelly} />
                <MainStack.Screen options={StyleSheet.flatten([baseOption, transitionOption])} name={APP_SCREEN.TRANSITION} component={Transition} />
                <MainStack.Screen options={StyleSheet.flatten([baseOption, wavyOption])} name={APP_SCREEN.WAVY} component={WavyLoading} />
                <MainStack.Screen options={StyleSheet.flatten([baseOption, telegramOption])} name={APP_SCREEN.TELEGRAM} component={Telegram} />
                <MainStack.Screen options={StyleSheet.flatten([baseOption, circleMenuOption])} name={APP_SCREEN.CIRCLE_MENU} component={CircleMenu} />
                <MainStack.Screen options={StyleSheet.flatten([baseOption, shareElementMenuOption, { gestureEnabled: false }])} name={APP_SCREEN.SHARE_ELEMENT} component={ShareElement} />
                <MainStack.Screen options={StyleSheet.flatten([baseOption, youtubeOption])} name={APP_SCREEN.YOU_TUBE} component={You_tube} />
                <MainStack.Screen options={StyleSheet.flatten([baseOption, waveOption])} name={APP_SCREEN.WAVE} component={Wave} />
                <MainStack.Screen options={StyleSheet.flatten([baseOption, indicatorOption])} name={APP_SCREEN.INDICATOR} component={Indicator} />
            </MainStack.Navigator>
        </NavigationContainer>
    )
}

export const AppNavigation = memo(AppNavigationComponent, isEqual)