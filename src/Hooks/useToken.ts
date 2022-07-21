import { useSelector } from 'react-redux';

import { tokenSelector } from 'Selectors/session';

export const useToken = () => useSelector(tokenSelector);
