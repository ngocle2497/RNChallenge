import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import {StyleSheet} from 'react-native';
export const enhance = (arrStyle: Array<any>) => {
  return StyleSheet.flatten(arrStyle);
};
export function useAsyncState<T>(
  initialValue: T,
): [T, (newValue: SetStateAction<T>, callback?: (newState: T) => void) => void] {
  const [state, setState] = useState(initialValue);
  const _callback = useRef<(newState: T) => void>();
  const _setState = (newValue: SetStateAction<T>, callback?: (newState: T) => void) => {
    if (callback) {
      _callback.current = callback;
    }
    setState(newValue);
  };
  useEffect(() => {
    if (typeof _callback.current === 'function') {
      _callback.current(state);
      _callback.current = undefined;
    }
  }, [state]);
  return [state, _setState];
}