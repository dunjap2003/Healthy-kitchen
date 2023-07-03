var express = require('express');
var router = express.Router();
const data = require('../data/mydata');


router.get('/', function(req, res){
   res.redirect('/home/getCategories');
   session: req.session;
})

router.get('/home/getCategories', function(req, res, next){
 
   let kategorije = [];
   kategorije = data.categories;

   res.render('home', {
      session: req.session,
      categories: kategorije,
      kategorija: 'Lisnato povrće',
      products: data.categories.find(category => category.name === 'Lisnato povrće').products,
   });
});

router.get('/home/getProducts/:id', function(req, res, next){
   let kategorija = req.params.id;
  
   let proizvodi = data.categories.find(category => category.name === kategorija).products;
    res.render('home', {
         session: req.session,
         products: proizvodi,
         kategorija: kategorija,
         categories: data.categories
      });
});

module.exports = router;