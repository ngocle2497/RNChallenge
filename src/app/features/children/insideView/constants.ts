import faker from 'faker'
import { ImageSourcePropType } from 'react-native';
const assets = [
    require("./assets/illu_candyPink.png"), //1173 × 688
    require("./assets/illu_buetiful.png"), //763 × 496
    require("./assets/illu_darkPurple.png"), //1094 × 809
];

export interface CardImageProps {
    source: ImageSourcePropType;
    height: number;
    width: number;

}
export const Palette = {
    // first
    darkPurple: "#16001E",
    maximumPurple: "#7F2982",
    chinaPink: "#DE639A",
    candyPink: "#F7717D",
    lightPink: "#F7B2B7",

    //second
    richBlack: "#080708",
    bluetiful: "#3B60E4",
    mediumSlateBlue: "#7765E3",
    thistle: "#C8ADC0",
    champagnePink: "#EDD3C4",

    androidGreen: "#99C24D",
};
export interface CardProps {
    id: string;
    color: keyof typeof Palette;
    title: string;
    text: string;
    image?: CardImageProps;
    onlyOne?: boolean;
    layout?: { width: number, height: number }
}
export const example: CardProps[] = [
    {
        id: "1",
        color: "maximumPurple",
        title: "MaximiumPurple",
        text: faker.lorem.paragraphs(2),
        onlyOne: true
    },
    {
        id: "2",
        color: "bluetiful",
        title: "Buetiful",
        text: faker.lorem.paragraphs(1),
        image: {
            source: assets[1],
            height: 496,
            width: 763,
        },
    },
    {
        id: "3",
        color: "darkPurple",
        title: "DarkPurple",
        text: faker.lorem.paragraphs(1),
        image: {
            source: assets[2],
            height: 809,
            width: 1094,
        },
        onlyOne: true
    },
    {
        id: "4",
        color: "chinaPink",
        title: "ChinaPink",
        text: faker.lorem.paragraphs(3),
    },
    {
        id: "5",
        color: "richBlack",
        title: "RichBlack",
        text: faker.lorem.paragraphs(2),
        onlyOne: true
    },
    {
        id: "6",
        color: "candyPink",
        title: "CandyPink",
        text: faker.lorem.paragraphs(1),
        image: {
            source: assets[0],
            height: 688,
            width: 1173,
        },
    },
    {
        id: "",
        color: "mediumSlateBlue",
        title: "MediumSlateBlue",
        text: faker.lorem.paragraphs(2),
    },
];
