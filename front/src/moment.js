import moment from 'moment';
import 'moment/locale/es'; 

export default {
  install: (Vue) => {
    Vue.prototype.$moment = moment;
    moment.locale('es');
  }
};