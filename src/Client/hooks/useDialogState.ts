import { useCallback, useState } from 'react';

type OpenState<P> = {
  isOpen: true;
  payload: P;
};

type CloseState = {
  isOpen: false;
  payload: null;
};

type Open<P> = (payload: P) => void;

export type DialogState<P> = {
  open: Open<P>;
  close: () => void;
} & (OpenState<P> | CloseState);

const CLOSED_STATE: CloseState = { isOpen: false, payload: null };

export function useDialogState<P>(): DialogState<P> {
  const [state, setState] = useState<OpenState<P> | CloseState>(CLOSED_STATE);

  const open = useCallback<Open<P>>((payload) => {
    setState({ payload, isOpen: true });
  }, []);

  const close = useCallback(() => {
    setState(CLOSED_STATE);
  }, []);

  return {
    ...state,
    open,
    close,
  };
}
