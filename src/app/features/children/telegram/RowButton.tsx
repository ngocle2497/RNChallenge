import React, { memo } from 'react'
import { TouchableOpacity } from 'react-native'
import isEqual from 'react-fast-compare';
import { Block, Text, Icon, Divider, SizeBox } from '@components';
import { IconTypes } from '@assets/icon';

interface RowButtonProps {
    txTitle?: string;
    txSub?: string;
    title?: string;
    icon?: IconTypes;
    showDivider?: boolean;
}

const RowButtonComponent = ({ title, txSub, txTitle, icon, showDivider = true }: RowButtonProps) => {
    return (
        <Block marginTop={10} paddingHorizontal={16}>
            <TouchableOpacity>
                <Block direction={'row'}>
                    {icon && <Block flex={1}>
                        <Icon icon={icon} />
                    </Block>}
                    <Block flex={5}>
                        <Text fontSize={'FONT_15'} tx={txTitle} text={title} />

                        {txSub && (
                            <>
                                <SizeBox height={5} />
                                <Text color={'#bdc3c7'} tx={txSub} />
                            </>
                        )}
                    </Block>
                </Block>
            </TouchableOpacity>
            <SizeBox height={10} />
            {showDivider && <Block height={1}>
                {icon &&
                    <Block flex={1} />}
                <Block flex={5}>
                    <Divider height={1} />
                </Block>
            </Block>}
        </Block>
    )
}

export const RowButton = memo(RowButtonComponent, isEqual)