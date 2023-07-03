function povecajBrojacProizvoda(imeProizvoda){
   let brojac = document.getElementById(imeProizvoda);
   if(isNaN(parseInt(brojac.textContent))){
      brojac.textContent = 1;
   }
   else{
      brojac.textContent++;
   }

   let brojacUkupno = document.getElementById("brojacUkupno");
   if(isNaN(parseInt(brojacUkupno.textContent))){
      brojacUkupno.textContent = 1;
   }
   else{
      brojacUkupno.textContent++;
   }
}

function smanjiBrojacProizvoda(imeProizvoda){
   let brojac = document.getElementById(imeProizvoda);
   if(brojac.textContent > 1){
      brojac.textContent--;
   }

   else if(brojac.textContent == 1){
      console.log(imeProizvoda);
      let n = "." + `${imeProizvoda}`;
      console.log(n);
      let pro = document.getElementById("proizvodi").querySelector(`[class="${imeProizvoda}"]`);
      console.log(pro);

      pro.remove();

   }

   let brojacUkupno = document.getElementById("brojacUkupno");
   if(brojacUkupno.textContent > 1){
      brojacUkupno.textContent--;
   }

   else if(brojacUkupno.textContent == 1){
      brojacUkupno.textContent = "";
   }
}

window.addEventListener('pageshow', function (event) {
   var historyTraversal = event.persisted || (typeof window.performance != 'undefined' && window.performance.navigation.type === 2);
   if (historyTraversal) {
     this.document.location.href = '/home/getCategories';
   }
 });

