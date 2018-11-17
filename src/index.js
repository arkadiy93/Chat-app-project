import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import gon from 'gon';
import faker from 'faker';
import cookies from 'js-cookie';
import init from './init';


if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const randomName = faker.name.findName();
cookies.set('name', randomName);

init(gon);
