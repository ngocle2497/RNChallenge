import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { View, Text } from 'react-native'

interface TextTickerProps {

}

const TextTickerComponent = ({}:TextTickerProps) => {
    return (
        <View>
            <Text></Text>
        </View>
    )
}

export const TextTicker = memo(TextTickerComponent,isEqual)