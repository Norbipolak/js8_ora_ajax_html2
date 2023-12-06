/*
Egy terméknek a törlése
-nem küldünk neki body-t(üzenettestet)

fetch('https://dummyjson.com/products/1', {
  method: 'DELETE',
})
*/

async function deleteProduct(productID) {
    response = await fetch("https://dummyjson.com/products/" + productID, {
        method:"DELETE"
    });

    const json = await response.json();
    console.log(json);
}

deleteProduct(10);

/*
Ezt fogjuk visszakapni:

{id: 10, title: 'HP Pavilion 15-DK1056WM', description: 'HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10', price: 1099, discountPercentage: 6.18, …}
brand
: 
"HP Pavilion"
category: "laptops"
deletedOn: "2023-12-06T20:36:02.825Z"
description: "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10"
discountPercentage: 6.18
id: 10
images: (4) ['https://i.dummyjson.com/data/products/10/1.jpg', 'https://i.dummyjson.com/data/products/10/2.jpg', 'https://i.dummyjson.com/data/products/10/3.jpg', 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg']
isDeleted: true
price: 1099
rating: 4.43
stock: 89
thumbnail: "https://i.dummyjson.com/data/products/10/thumbnail.jpeg"
title: "HP Pavilion 15-DK1056WM"
[[Prototype]]: Object
*/ 

/*
    A szerveren azt történik, hogy kap információkat, hogy milyen metódussal jött az adat, milyen adat jött,
    melyik API end pointot (url)szólítottuk meg

    https://dummyjson.com/products/1
    ha ezt beírjuk a böngészőbe akkor kapunk egy stringet erről a termékről:

{"id":1,"title":"iPhone 9","description":"An apple mobile which is nothing like apple",
"price":549,"discountPercentage":12.96,"rating":4.69,"stock":94,"brand":"Apple",
"category":"smartphones","thumbnail":"https://i.dummyjson.com/data/products/1/thumbnail.jpg",
"images":["https://i.dummyjson.com/data/products/1/1.jpg","https://i.dummyjson.com/data/products/1/2.jpg",
"https://i.dummyjson.com/data/products/1/3.jpg","https://i.dummyjson.com/data/products/1/4.jpg",
"https://i.dummyjson.com/data/products/1/thumbnail.jpg"]}

ha valamit beírunk a böngészőbe az egy GET kérés
mutatja is a html Networksnek a Head-jébe, hogy Request Method: GET

PUT-val -> minden adatot felül kell írni 
PATCH-vel -> csak részlegesen 
POST-val -> teljesen új entitást hozunk létre (adatbázisban egy teljesen új sort)
*/

/*
    Elsődleges kulcs az azonosító ID az url-ben (1 vagy 2 vagy 3 stb.) két ugyanolyan nem lehet
    szóval ha törölünk egy terméket más termék nem fogja megkapni az azonosítóját/ID-ját kivéve ha 
    az egész adatbázist töröljük
    teljesen reális, hogy egy adatbázisban a termékek 625-s ID-val kezdödnek, a törlések miatt
*/

/*
    API end point url + metódus!! Application Programming Interface
    olyan felület, amin keresztül a programozók el tudnak érni más programokat.
    Sok ilyen API létezik pl. a videókártyánk, ha szeretnénk vele számolni machine learning-es dolgokat
    akkor a videókártyánk API fogjuk használni

    A webes API elérése HTTP keresztül end pointokkal (url + metódus)
*/