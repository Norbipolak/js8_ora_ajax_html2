const brandInput = document.querySelector("#brand");
const categoryInput = document.querySelector("#category");
const titleInput = document.querySelector("#title");
const priceInput = document.querySelector("#price");
const setProductBtn = document.querySelector("#set-product");

async function updateProduct() {
    const response = await fetch("https://dummyjson.com/products/1", {
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({
            title:"sdfgrege" // itt lehet csak egy valamit megváltoztatni pl. title, de a valóságban minden fel kell itt sorolni kivéve az ID-t
        }) 
    });

    const json = await response.json()
    console.log(json);
}

updateProduct();

/*

Ez lett belőle az ID=1-es termékből, megváltoztatott title után 

{id: 1, title: 'sdfgrege', price: 549, stock: 94, rating: 4.69, …}
brand: "Apple"
category: "smartphones"
description: "An apple mobile which is nothing like apple"
id: 1
images: (5) ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg']
price: 549
rating: 4.69
stock: 94
thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
title: "sdfgrege"
[[Prototype]]: Object

de ugyanugy a bodyban felül tudunk írni mindent pl. price-t 

const response = await fetch("https://dummyjson.com/products/1"
->
ha mondjuk a harmadik terméknél szeretnénk valamit felül írni akkor csak a legvégén 1 helyett 3 írunk 
->
const response = await fetch("https://dummyjson.com/products/3"
*/ 