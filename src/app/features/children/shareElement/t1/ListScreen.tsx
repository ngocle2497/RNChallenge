import React, { memo } from 'react'
import { View, Text } from 'react-native'
import isEqual from 'react-fast-compare'

interface ListScreenProps {

}

const ListScreenComponent = ({ }: ListScreenProps) => {
    return (
        <View>
            <Text></Text>
        </View>
    )
}

export const ListScreen = memo(ListScreenComponent, isEqual)