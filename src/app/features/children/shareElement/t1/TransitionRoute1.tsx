import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { RootStackParamList1, SHARE_SCREEN } from '../ScreenType'
import { ListScreen } from './ListScreen';

const Stack = createSharedElementStackNavigator<RootStackParamList1>();



export const TransitionRoute1 = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={SHARE_SCREEN.TRANSITION_1_1} component={ListScreen} />
        </Stack.Navigator>
    )
}