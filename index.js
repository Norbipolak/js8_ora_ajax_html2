/*
    A dummyjson-ről adatokat szedtünk le http segítségével és csináltink egy GET kérést (fetch)
    A fetch két paramétert vár:
    1. URL 2. egy objektum ami a http beállítása

    Alapból, ha nem adjuk meg neki ezt az objektumot, akkor egy GET kérés lesz 
    Mivel ez egy promise alapú megoldás, ezért a THEN-nel fogjuk megkapni az adatokat és kapunk egy response objektumot
*/
/*fetch("https://dummyjson.com/products")
    .then((response) => {
        console.log(response);


        /*
            Response objektum, így fog kinézni:
            body: (...) -> üzenettest
            bodyUsed: false -> azt mondja meg, hogy már kiolvastuk-e az üzenettestet
            headers: Headers {} -> fejlécinformációkat tartalmazza  
            ok: true -> hogyha 200-as kódot kaptunk akkor TRUE lesz, ha valami hiba van akkor FALSE
            redirected: false -> volt-e átírányítva a kérés, de ez látszik a statuscode-ból is (ha 3** kapunk akkor át volt)
            status: 200 
            statusText: "" -> azt kellene tartalmaznia a 200-nál, hogy OK, de ezt valamiért nem írtják bele
            type: "cors" -> CROSS ORIGIN REQUEST, a kérés url-je nem egyezik meg a válasz url-jével, szerver és a kliens már url-en található
            url: "https://dummyjson.com/products" -> melyik url-t szólítottuk meg 
            [[Prototype]]: Response
        */

/*
    body-nak a kiolvasása
    a metódus text is visszaad egy promise-t amiből indythatunk egy then-t 
    megjeleniti stringben az összes adatot
    és ha stringben kapjuk meg az adatot és ez egy JSON akkor át kell váltani JSON-né az adatot, olyan formában, hogy JSON.parse()
*/

/*response.text().then((text) => {
    console.log(text);
    const jsonFromText = JSON.parse(text);
    console.log(jsonFromText);
});*/

/*
    Ebből a stringből:

    {"products":[{"id":1,"title":"iPhone 9","description":"An apple mobile which is nothing like apple","price":549,
    "discountPercentage":12.96,"rating":4.69,"stock":94,"brand":"Apple","category":"smartphones",
    "thumbnail":"https://i.dummyjson.com/data/products/1/thumbnail.jpg","images":["https://i.dummyjson.com/data/products/1/1.jpg",
    "https://i.dummyjson.com/data/products/1/2.jpg","https://i.dummyjson.com/data/products/1/3.jpg",
    "https://i.dummyjson.com/data/products/1/4.jpg","https://i.dummyjson.com/data/products/1/thumbnail.jpg"]},
    {"id":2,"title":"iPhone X","description":"SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology 
    A12 Bionic chip with 

    Csináltunk a JSON.parse(text) segítségével ezt: 
    
    {products: Array(30), total: 100, skip: 0, limit: 30}
    limit: 30
    products: (30) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    skip: 0
    total: 100
    [[Prototype]]: Object

    Ha lenyítjuk itt a products-okat akkor ezt fogjuk látni: 

    0:{id: 1, title: 'iPhone 9', description: 'An apple mobile which is nothing like apple', price: 549, discountPercentage: 12.96, …}
    1: {id: 2, title: 'iPhone X', description: 'SIM-Free, Model A19211 6.5-inch Super Retina HD di…lay with OLED technology A12 Bionic chip with ...', price: 899, discountPercentage: 17.94, …}
    ... 
*/

/*
    itt mát JavaScript objektumot kapunk alapból 
*/
/*response.json().then((json)=> {
    console.log(json);
});*/


/*
    Headers kiolvasása 
    Sokféle módon ki lehet olvasni az adatokat, ez egy objektum, ezért használtunk entries-t 
    entries-vel visszakapunk egy tömböt, amiben tömbök találhatóak és ezekben a belső tömbökben 
    a kulcs-értékpárok vannak olyan formában, hogy a nulladik elem a kulcs a második az érték -> ezt látjuk itt most a headerben 

    0: "content-type" -> fejlécnek a típusa 
    1: "application/json; charset=utf-8" -> azt jelenti, hogy ez egy JSON adat, innen tudhatjuk meg, hogy mi JSON adatot kaptunk, charset -> karakterkódolás (UTF8)
    length: 2
    [[Prototype]]: Array(0)
*/
/*const headerInfo = response.headers.entries();
console.log(headerInfo);

for(const header of headerInfo){
 console.log(header);
}

});*/

/*
    Egyszerübb módszer az egész kiolvasásnak, amit itt felül csináltunk
    Mivel ez egy aszinkron kód és promise alapú megoldás, ezért használhatunk aszinkron függvényeket
    fontos, hogy legyen async mert különben nem tudnánk használni az await-et
*/

const productsHolder = document.querySelector("#products-holder"); /*itt kivül csináltuk de belül majd a div-et appendchild-olni kell hozzá*/


async function getProducts() {
    const response = await fetch("https://dummyjson.com/products?limit=20&skip=20");
    // console.log(response); itt ugyanígy vissza fogjuk kapni a response objektumot
    const json = await response.json(); // igy fogjuk megkapni a json-t 

    for (const product of json.products) {
        /*.products mert a json-ben volt olyan is, hogy limit, skip json.products kell nekünk, mert abban vannak a termékek*/
        const div = document.createElement("div"); /*létrehozunk egy div-et, akülső div-nek megadtunk a html-ben egy product-box nevű osztályt*/
        div.classList.add("product-box");
        const titleH3 = document.createElement("h3");
        titleH3.innerText = product.title; /*azért mert a json product-jában a title-ben van a terméknév */
        const productBoxImg = document.createElement("div");
        productBoxImg.classList.add("product-box-img");
        const thumbnail = document.createElement("img"); /*be kell rakni ide a képet*/
        thumbnail.src = product.thumbnail; /*azért mert a json product-jában a thumbnail-ben vannak a képek src-i */
        productBoxImg.appendChild(thumbnail) /* ezt a képet bele kell raknunk a productBoxImg-be*/

        const grid2 = document.createElement("div");
        grid2.classList.add("grid-2");
        const gridBox1 = document.createElement("div");
        gridBox1.classList.add("grid-box");
        gridBox1.innerText = product.price + "$"; /*ide megy majd az ár*/
        const gridBox2 = document.createElement("div");
        gridBox2.classList.add("grid-box");
        const addCartToBtn = document.createElement("button");
        addCartToBtn.innerText = "Kosárba!"
        gridBox2.appendChild(addCartToBtn);
        grid2.appendChild(gridBox1);
        grid2.appendChild(gridBox2);

        div.appendChild(titleH3);
        div.appendChild(grid2);
        div.appendChild(productBoxImg);

        productsHolder.appendChild(div);

    }
}

// getProducts();

/*
    Ezt fogjuk a getproducts-val kapni:
    {products: Array(30), total: 100, skip: 0, limit: 30}
    limit: 30 -> 30 terméket fog nekünk megjeleniteni (0-tól 29-ig)
    products: (30) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    skip: 0 -> azt jelenti, hogy a 0-tól kezdte 
    total: 100 -> összesen 100 termék van, amit meg tudnánk jeleniteni (most 30-at jelenitünk meg a 0-tól kezdve)
    [[Prototype]]: Object

    ?limit=20 - url változó a limitet 20-ra állítjuk be, alapbeállítás 30 volt, de így már csak 20 jön le
    limit=20&skip=20 - a második 20-at látjuk 21-40-ig -> ezzel tudunk lapozni a termékek között, modnjuk megnyomjuk a jobbra gombot, hozzáad még 20-at a skiphez és megjeleniti a következő 20-at
    ilyen formában:
    0: {id: 21, title: '- Daal Masoor 500 grams', description: 'Fine quality Branded Product Keep in a cool and dry place', price: 20, discountPercentage: 4.81, …}
    1: {id: 22, title: 'Elbow Macaroni - 400 gm', description: 'Product details of Bake Parlor Big Elbow Macaroni - 400 gm', price: 14, discountPercentage: 15.58, …}
    2: {id: 23, title: 'Orange Essence Food Flavou....
*/

/*
    Hogyan tudunk hozzáadni egy terméket (amihez készitettünk egy form-ot a product.html-ben)
    a következő API end pointot kell majd megszólítanunk https://dummyjson.com/products/add, ami gyakorlatilag az url
    itt már szükségünk van az addiciónális beállításokra is nem csak az url-re
*/

