import { useSessionContext } from './useSessionContext';

export const useToken = () => useSessionContext().token ?? undefined;
