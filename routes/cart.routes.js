var express = require('express');
var router = express.Router();
var path = require('path');

function proizvodUKosarici(cart, ime){
   for(let i = 0; i < cart.length; i++){
      if(cart[i].ime == ime){
         return true;
      }
   }

   return false;
}

function izracunajKolicinu(cart, req){
   total = 0;
   for(let i = 0; i < cart.length; i++){
      total = parseInt(total) + parseInt(cart[i].kolicina);
   }

   req.session.total = total;
   return total;
}

router.get('/', function(req, res){
   res.redirect('/cart/getAll'); 
});

router.post('/add/:id', function(req, res){
   let ime = req.params.id.toString();
   let kolicina = req.body.kolicina;
   let proizvod = {ime:ime, kolicina:kolicina};
   let cart;

   if(req.session.cart){
      cart = req.session.cart;

      if(!proizvodUKosarici(cart, ime)){
         cart.push(proizvod);
      }

      else{
         cart.find(proiz => proiz.ime === proizvod.ime).kolicina++;
      }
   }
   else{
      req.session.cart = [proizvod];
      cart = req.session.cart;
   }

   izracunajKolicinu(cart, req);

  return res.sendStatus(204);
});

router.post('/remove/:id', function(req, res, next){
   let ime = req.params.id;
   let kolicina = req.body.kolicina;
   let proizvod = {ime:ime, kolicina:kolicina};

   let cart = req.session.cart;
   let total = req.session.total;

   let index = cart.findIndex(proiz => proiz.ime === ime);

   if(index !== -1){
      if(cart[index].kolicina > 1){
         cart[index].kolicina--;
         req.session.total--;
      }
      else{
         cart.splice(index, 1);
         req.session.total--;
      }
   }

   return res.sendStatus(204);
});

router.get('/getAll', function(req, res, next){
   let cart = req.session.cart;
   let total = req.session.total;

   res.render('cart', {cart: cart, total:total});
})


module.exports = router;