import { AppNavigation } from '@navigation/AppNavigation'
import React, { memo, Suspense, useEffect, useState } from 'react'
import isEqual from 'react-fast-compare';
import I18n from '@utils/i18n/i18n'
import { I18nextProvider } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import codePush from 'react-native-code-push';


const AppComponent = () => {
    const [updating, setUpdating] = useState(false);
    const checkUpdate = async () => {
        await codePush.sync(
            { installMode: codePush.InstallMode.ON_NEXT_RESTART },
            status => {
                switch (status) {
                    case codePush.SyncStatus.INSTALLING_UPDATE:
                        setUpdating(true);
                        break;
                    case codePush.SyncStatus.UP_TO_DATE:
                        setUpdating(false);
                        break;
                    default:
                        setUpdating(false);
                }
            },
        );
    };
    useEffect(() => {
        // checkUpdate();
    }, []);
    return updating ? null : (
        <SafeAreaProvider>
            <I18nextProvider i18n={I18n}>
                <Suspense fallback={<View />}>
                    <AppNavigation />
                </Suspense>
            </I18nextProvider>
        </SafeAreaProvider>
    )
}
const codePushOption = {
    checkFrequency: codePush.CheckFrequency.ON_APP_START,
    installMode: codePush.InstallMode.ON_NEXT_RESTART,
};
// export const App = memo(AppComponent, isEqual)
export const App = memo(AppComponent, isEqual)
