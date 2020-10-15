import { ImageItem } from './t1/type';
export enum SHARE_SCREEN {
    TRANSITION_1_ROOT = "TRANSITION_1",
    TRANSITION_1_1 = 'LIST_SCREEN',
    TRANSITION_1_2 = 'DETAIL_SCREEN'
}

export type RootStackParamList1 = {
    [SHARE_SCREEN.TRANSITION_1_ROOT]: undefined;
    [SHARE_SCREEN.TRANSITION_1_1]: undefined;
    [SHARE_SCREEN.TRANSITION_1_2]: { data: ImageItem };
};