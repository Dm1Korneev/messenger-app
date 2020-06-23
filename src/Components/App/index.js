import commonHoc from 'Components/commonHoc';
import { loginFromStore } from 'Redux/actions';
import { isLoggedInSelector } from 'Selectors/session';

import App from './App';

const mapStateToProps = (state) => ({
  isLoggedIn: isLoggedInSelector(state),
});

const mapDispatchToProps = {
  loginFromStore,
};

export default commonHoc(App, {
  mapStateToProps,
  mapDispatchToProps,
});

