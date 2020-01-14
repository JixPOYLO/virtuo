'use strict';

//list of cars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const cars = [{
  'id': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'name': 'fiat-500-x',
  'pricePerDay': 36,
  'pricePerKm': 0.10
}, {
  'id': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'name': 'mercedes-class-a',
  'pricePerDay': 44,
  'pricePerKm': 0.30
}, {
  'id': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'name': 'bmw-x1',
  'pricePerDay': 52,
  'pricePerKm': 0.45
}];

//list of current rentals
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful for step 4

const rentals = [{
  'id': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'driver': {
    'firstName': 'Roman',
    'lastName': 'Frayssinet'
  },
  'carId': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'pickupDate': '2020-01-02',
  'returnDate': '2020-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'driver': {
    'firstName': 'Redouane',
    'lastName': 'Bougheraba'
  },
  'carId': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'pickupDate': '2020-01-05',
  'returnDate': '2020-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'driver': {
    'firstName': 'Fadily',
    'lastName': 'Camara'
  },
  'carId': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'pickupDate': '2019-12-01',
  'returnDate': '2019-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'rentalId': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}];

//step1:
var i, j ="";
for (i in rentals){
  for(j in cars){
    if(cars[j].id == rentals[i].carId)
    {
      var km = rentals[i].distance * cars[j].pricePerKm;
      var date2=new Date(rentals[i].returnDate);
      var date1 =new Date(rentals[i].pickupDate) ;
      var diff = dateDiff(date1,date2);
      var days= diff.day;
      
      if(days==0){days=1;}

      var t1= days * cars[j].pricePerDay; 

      var discount = mydays(days);
      var t= cars[j].pricePerDay + 0.9*discount.ninety * cars[j].pricePerDay + 0.7*discount.seventy * cars[j].pricePerDay+0.5*discount.fifty * cars[j].pricePerDay; 
      var rentalprice = km+t;
      var rentalpricewithoutdiscount= km+t1;

    }

  }
  console.log(rentals[i].id);
 // console.log("rental price without discount: "  + rentalpricewithoutdiscount)

  var com=commission(rentalprice,days);   
  if (rentals[i].options.deductibleReduction == true)
   {
    rentalprice=rentalprice+4*days;
    com.virtuo=com.virtuo+4*days;
   }
  console.log("rental price : "  + rentalprice)
  console.log("commission : "+ com.commi);
  console.log("  insurance : "+ com.insurance);
  console.log("  tresory : "+ com.tresory);
  console.log("  for virtuo : "+ com.virtuo);

}


console.log(cars);
console.log(rentals);
console.log(actors);

function dateDiff(date1, date2){
  var diff = {}                           // Initialisation du retour
  var tmp = date2 - date1;

  tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
  diff.sec = tmp % 60;                    // Extraction du nombre de secondes
 // console.log(diff.sec);
  tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
  diff.min = tmp % 60;                    // Extraction du nombre de minutes
 // console.log(diff.min);
  tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
  diff.hour = tmp % 24;                   // Extraction du nombre d'heures
 // console.log(diff.hour);
  tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
  diff.day = tmp;
  //console.log(diff.day);
  
  return diff;
}

//step2:
function mydays(days){
  var tab={}
  
  if (days-10>0)
  {
    tab.fifty=days-10;
    tab.seventy=6;
    tab.ninety=3;
    tab.full=1;
  }
  else if(days-4>0)
  {
    tab.fifty=0;
    tab.seventy=days-4;
    tab.ninety=3;
    tab.full=1;
  }
  else if(days-1>0)
  {
    tab.fifty=0;
    tab.seventy=0;
    tab.ninety=days-1;
    tab.full=1;
  }
  else 
  {
    tab.fifty=0;
    tab.seventy=0;
    tab.ninety=0;
    tab.full=1;
  }
  return tab;
}

//step 3:
function commission(rprice, days)
{
  var com={}

  com.commi=0.3*rprice;

  com.insurance = 0.5*com.commi;

  com.tresory=days;

  com.virtuo=com.commi-com.tresory-com.insurance;

  return com;

}

//step 4:

