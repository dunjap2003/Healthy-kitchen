const express = require('express')
var ejs = require('ejs');
const session = require('express-session');
const app = express(); //dostavljanje stranica korisniku
var path = require('path');

const homeRouter = require('./routes/home.routes');
const cartRouter = require('./routes/cart.routes');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(session({
   secret:'my-random-key',
   resave: false,
   saveUninitialized: true,
}))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/cart', cartRouter);
app.use('/home/cart', cartRouter);


app.get('/', function(req, res){
   res.render('/');
})

app.get('/cart', function(req, res){
   res.render('/cart');
})

app.listen(3000);