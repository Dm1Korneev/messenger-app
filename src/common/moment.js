import moment from 'moment';
import 'moment/locale/ru';

function getLang() {
  if (navigator.languages) {
    return navigator.languages[0];
  }
  return navigator.language;
}

moment.locale(getLang());
export default moment;
