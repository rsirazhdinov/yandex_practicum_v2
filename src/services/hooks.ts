import { useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';

import type { AppDispatch, RootState } from './types';

export const useSelector = selectorHook.withTypes<RootState>();

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
