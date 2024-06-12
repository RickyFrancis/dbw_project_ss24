// hooks.ts
import { useDispatch as useReduxDispatch } from 'react-redux';
import { AppDispatch } from './app/store';

export const useDispatch = () => useReduxDispatch<AppDispatch>();
