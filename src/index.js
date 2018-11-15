import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import gon from 'gon';
import faker from 'faker';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import init from './init';

const socket = io('http://localhost:4000');

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const randomName = faker.name.findName();
cookies.set('name', randomName);

socket.on('connect', () => {
  console.log('connected');
})

socket.on('event', function(data){
  console.log('data recieved');
});

init(gon);
