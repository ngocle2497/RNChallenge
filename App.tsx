import { AppNavigation } from '@navigation/AppNavigation'
import React, { memo, Suspense } from 'react'
import isEqual from 'react-fast-compare';
import I18n from '@utils/i18n/i18n'
import { I18nextProvider } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';

const AppComponent = () => {
    return (
        <SafeAreaProvider>
            <I18nextProvider i18n={I18n}>
                <Suspense fallback={<View />}>
                    <AppNavigation />
                </Suspense>
            </I18nextProvider>
        </SafeAreaProvider>
    )
}

export const App = memo(AppComponent, isEqual)