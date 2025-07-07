let name = prompt("Adınızı Giriniz");
let age = prompt("Yaşınızı Giriniz");
let job =   prompt("Mesleğinizi Giriniz");

let user = {
    name: name,
    age: Number(age),
    job: job
};

alert(`Merhaba ${user.name}, ${user.age} yaşındasın ve ${user.job} olarak çalışıyorsun.`);
console.log(user);

let cart = [];

let adding = true;

while (adding) {
    let name =  prompt("Ürün Adını Giriniz: (Bitti yazarsanız çıkış yapar)");
    if (name.toLowerCase() === "bitti") {
        adding = false;
        break;
    }

    let price = prompt("Ürün Fiyatını Giriniz");
    cart.push({ name: name, price: Number(price) });
};

console.log("Sepetiniz: ");
console.log(cart);

let totalPrice = cart.reduce((acc, product) => acc + product.price, 0);
console.log(`Toplam Fiyat: ${totalPrice} TL`);
alert(`Sepetiniz: ${JSON.stringify(cart)}\nToplam Fiyat: ${totalPrice} TL`);

cart.forEach((item, i) => {
    console.log(`${i + 1}. ${item.name} - ${item.price} TL`);
});

let toDelete = prompt("Silmek istediğiniz ürünün numarasını giriniz (1, 2, ...):");
if (toDelete) {
    cart.splice(toDelete - 1, 1);
}

cart.forEach((item, i) => {
    console.log(`${i + 1}. ${item.name} - ${item.price} TL`);
});

totalPrice = cart.reduce((acc, product) => acc + product.price, 0);
alert(`Sepetiniz: ${JSON.stringify(cart)}\nToplam Fiyat: ${totalPrice} TL`);
