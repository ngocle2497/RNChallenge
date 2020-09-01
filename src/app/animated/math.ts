export const clampV2 = (value: number, lowerValue: number, upperValue: number) => {
    'worklet';
    return Math.min(Math.max(lowerValue, value), upperValue)
}
export const subV2 = (r1: number, r2: number) => {
    'worklet';
    return r1 - r2
}
export const addV2 = (r1: number, r2: number) => {
    'worklet';
    return r1 + r2
}