import { useContext } from 'react';
import { START_LOADER, STOP_LOADER } from '../constants';
import { LoaderContext } from '../context/LoaderContext';

export const StartLoader = (key) => {
  const { dispatch: loaderDispatch } = useContext(LoaderContext);
  const startLoader = (payload) => loaderDispatch({ type: START_LOADER, payload });

  startLoader(key);
};
