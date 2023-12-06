/* Ha mi szeretnénk beszedni az adatainkat nem csinálni akkor: */
const brandInput = document.querySelector("#brand");
const categoryInput = document.querySelector("#category");
const titleInput = document.querySelector("#title");
const priceInput = document.querySelector("#price");
const setProductBtn = document.querySelector("#set-product");
/*
    Ha ezeket,így lementettük, akkor átmegyünk a setProduct function-höz és átírjuk ilyen formában 
    első amit mi random beírtunk 
    const productData = {             
        category: "shoes",
        brand: "Zara",
        title: "Red Shoes",
        price: 6000
    } 
    ->
    második a html alapján, minden üres lesz és mi tudjuk a honalopon bevinni az adatainkat a formban lévő üres mezőkben 
    és utána rákkantittunk a set-product gombunkra, de ehhez alul adunk neki egy addEventListenert amiben meghívjuk a setProduct functiont
    const productData = {
        category:categoryInput.value,
        brand:brandInput.value,
        title:titleInput.value,
        price:parseInt(priceInput.value)
    }
*/

async function setProduct() {
    /* const productData = {
        category: "shoes",
        brand: "Zara",
        title: "Red Shoes",
        price: 6000
    }*/

    const productData = {
        category:categoryInput.value,
        brand:brandInput.value,
        title:titleInput.value,
        price:parseInt(priceInput.value)
    }

    const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST", // azért mert ez nekünk POST-ban fogadja az üzeneteket
        headers: { "content-type": "application/json" }, //headers az egy objektum és nekünk a content-type-ra van szükségünk ami application/json
        body: JSON.stringify(productData) 
        
        // mivel application/json a content-type-unk és ez egy json stringet vár, ezért kell a body-nál a JSON.stringify és belerakjuk az adatainkat 
        // azért, hogy szebben nézzen ki, megcsináltuk ezt felül és azt JSON.stringify-oztuk 
           
    });
    // console.log(response); így megkaptuk a response-ot 200:ok-val
    const json = await response.json();
    console.log(json);
    /* 
        Ezt kaptuk itt vissza json-ban (azokat az adatokat amiket mi küldtünk neki)
        {id: 101, title: 'Red Shoes', price: 6000, brand: 'Zara', category: 'shoes'}
            brand: "Zara"
            category: "shoes"
            id: 101
            price: 6000
            title: "Red Shoes"
            [[Prototype]]: Object
    */

}

setProductBtn.addEventListener("click", function(e) {
    e.preventDefault(); // enélkül nem fog menni 
    setProduct();
});
/*
    Itt most bármit be tudunk írni, de normális esetben a formban lennének legördülők amiből lehet választanunk,
    egyébként az új kategoriát fel kéne vinni
*/ 

//setProduct();

/*
    Updatelni egy ternéket nagyon hasonló módon tudunk, csak annyi a különbség hogy
    method: nem post lesz, hanem PUT vagy PATCH 
    headers és a body hasonló 
    különbség az url-ben a végén az 1 -> az egyes ID-jű terméket szeretnénk updatelni'https://dummyjson.com/products/1'

updating title of product with id 1 
fetch('https://dummyjson.com/products/1', {
    method: 'PUT',  or PATCH 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'iPhone Galaxy +1'
    })
  })

  Egy teljesen újat csinálni -> POST metódussal

  fetch('https://dummyjson.com/products/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'BMW Pencil',
    other product data 
})
})
*/ 