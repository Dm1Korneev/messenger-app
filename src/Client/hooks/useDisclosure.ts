import { useCallback, useState } from 'react';

export interface DisclosureState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useDisclosure = (isOpenDefault = false): DisclosureState => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((state) => !state), []);

  return {
    isOpen, open, close, toggle,
  };
};
