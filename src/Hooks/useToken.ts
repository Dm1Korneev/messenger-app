import { useSessionContext } from 'Components/SessionProvider';

export const useToken = () => useSessionContext().token ?? undefined;
