import * as React from 'react';
import { NavigationContainerRef } from '@react-navigation/native'
import { RootStackParamList1 } from '@features/children/shareElement/ScreenType';
export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate<RouteName extends keyof RootStackParamList1>
    (...arg: undefined extends RootStackParamList1[RouteName] ?
        [RouteName] | [RouteName, RootStackParamList1[RouteName]] :
        [RouteName, RootStackParamList1[RouteName]]) {
    navigationRef.current?.navigate(arg[0], arg.length > 1 ? arg[1] : undefined);
}
export function navigateJ(name: string, param?: any) {
    navigationRef.current?.navigate(name, param);
}