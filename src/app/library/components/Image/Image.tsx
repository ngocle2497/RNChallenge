import React, { memo, useMemo } from 'react';
import { Image, ImageStyle } from 'react-native';
import { ImageProps } from './Image.props';
import { images } from '@assets/image';
import { enhance } from '@common';
import equals from 'react-fast-compare';
import { Block } from '../Block/Block';
const ROOT: ImageStyle = {
  resizeMode: 'contain',
};

const ImgComponent = (props: ImageProps) => {
  const { style: styleOverride = {}, source, containerStyle } = props;
  const style: ImageStyle = useMemo(
    () => enhance([ROOT, styleOverride]),
    [styleOverride],
  );

  return (
    <Block style={containerStyle}>
      <Image style={style} source={images[source ?? 'default']} />
    </Block>
  );
};
export const Img = memo(ImgComponent, equals);
