import React, { memo } from 'react'
import { View, Text } from 'react-native'
import isEqual from 'react-fast-compare'

interface CircleMenuProps {

}

const CircleMenuComponent = ({ }: CircleMenuProps) => {
    return (
        <View>
            <Text></Text>
        </View>
    )
}

export const CircleMenu = memo(CircleMenuComponent, isEqual)