/*
require('dotenv').config();
const express = require('express');
const hbs = require('hbs');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken )

const app = express();
const port = process.env.PORT;
const ciacodigo = process.env.CIA;

console.log(accountSid, authToken);

//handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {});

//servir contenido estatico
app.use(express.static('public'));


client.messages.create({
    mediaUrl: ['https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'],
    body: 'Your appointment is coming up on July 21 at 3PM',
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+593994399891'
}).then(message => console.log(message.sid));


app.get('/', (req, res) => {
    res.render('home');
})

app.listen(port, () => {
    console.log(`App escuchando en http://localhost:${port}`);
});

*/

import dotenv from 'dotenv';
import Server from './config/server';
import * as encriptHelper from './helpers/EncriptHelper';

const pathEnv = `../${process.env.NODE_ENV}.env`;
dotenv.config({
    //path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
    path: pathEnv
})
const server = new Server();


encriptHelper.encrip({sTexto: 'saico', sProceso: 'E'}, function (error, result) {
    if (error) throw error;
    console.log('encriptado', result);
});

let desencriptado = encriptHelper.encrip({sTexto: '¨swft', sProceso: 'D'}, true);
console.log('desencriptado', desencriptado);

server.listen();
