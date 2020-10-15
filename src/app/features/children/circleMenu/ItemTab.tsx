import React, { memo } from 'react'
import isEqual from 'react-fast-compare';
import { Svg, Path } from 'react-native-svg'
import { ItemMenu } from './type';
import { SIZE_MENU } from './constant'
import { StyleSheet } from 'react-native';
import { Text } from '@components';


interface Point {
    x: number;
    y: number;
}

interface ItemTabProps {
    item: ItemMenu;
    index: number;
    sizeArr: number;
    centerPoint: Point;
}

const ItemMenuComponent = ({ index, sizeArr, item }: ItemTabProps) => {

    const alpha = (Math.PI * 2) / sizeArr;
    const x = SIZE_MENU - Math.cos(alpha) * SIZE_MENU
    const y = SIZE_MENU - Math.sin(alpha) * SIZE_MENU
    const d = `M${SIZE_MENU},${SIZE_MENU} L0,${SIZE_MENU} A${SIZE_MENU},${SIZE_MENU} 0  0,  1  ${x}  ${y}, L${SIZE_MENU},${SIZE_MENU}`
    return (
        <Svg style={[StyleSheet.absoluteFill, { transform: [{ rotate: `${(index * 360 / sizeArr + 360 / sizeArr)}deg` }] }]} width={SIZE_MENU * 2} height={SIZE_MENU * 2}>
            <Path d={d} fill={item.color} />
        </Svg>
    )
}

export const ItemTab = memo(ItemMenuComponent, isEqual)