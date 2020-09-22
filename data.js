//variables
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('close-cart');
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector("cart-overlay");
const cartItems = document.querySelector(".cart-items");
const CartTotal = document.querySelector(".cart-total");
const productsDOM = document.querySelector(".products-center");


let cart = [];
// buttons
let buttonsDOM = [];

class Products{
    async getProducts(){
      let result = await fetch("products.json");
       let data = await result.json();
       let products = data.items;
       products = products.map(item =>{
           const{title, price} = item.fields;
           const{id} = item.sys;
           const image = item.fields.image.fields.file.url;
           return{title,price,id,image}
           })
           return products    
    } catch  (error){
        console.log(error);
    }
   
}
// display
class UI{
    displayProducts(products){
       let result = '';
       products.forEach(product => {
           result +=
           
       `<!--single products-->
       <article class="product">
         <div class="img-container">
             <img src=${product.image} alt="product" class="product-img"/>
             <button class="bag-btn" data-id=${product.id}>
                 <i class="fas fa-shopping-cart"></i>
                 add Items

             </button>
         </div>
         <h3>${product.title}</h3>
         <h4>$${product.price}</h4>
        </article> 
        <!--End of single products-->`;
    });
           
      productsDOM.innerHTML = result;

    }
     getBagButtons(){
         const buttons = [...document.querySelectorAll(".bag-btn")];
         buttonsDOM = buttons;
         buttons.forEach(buttons=>{
             let id = button.dataset.id;
             console.log(id);
             let inCart = cart.find(item =>item.id=== id)
             if(inCart){
                 button.innerText = "In Cart";
                 button.disabled = true;
             }
                 button.addEventListener('click',(event)=>{
                     event.target.innerText = "In Cart";
                     event.target.disabled = true;
                     // get product from products 
                     let cartItem = {...Storage.getProduct(id), amount:1};
                     
                     // should add product to the cart
                     cart = [...cart, cartItem];
                     
                     // save cart in local Storage
                     Storage.saveCart(cart);
                     
                     // Set cart values
                     this.setCartValues(cart);
                     // display cart values
                     this.addCartItem(cartItem)
                     // show  the cart 
                     this.showCart();
                 });
                    
                 
             
         });

     }
     setCartValues(cart){
         let tempTotal = 0;
         let itemsTotal = 0;
         cart.map(item =>{
             tempTotal = tempTotal +item.price * item.amount;
             itemsTotal += item.amount 
         });
         CartTotal.innerText = parseFloat(tempTotal.toFixed(2));
         cartItems.innerText = itemsTotal;
         
     }
     addCartItem(item){
         const div = document.createElement('div');
         div.classList.add('cart-item');
         div.innerHTML =`<img src=${item.image} alt="product"/>
         <div>
             <h4>${item.title}</h4>
             <h5>${item.price}</h5>
             <span class="remove-item" data-id=${item.id} >delete</span>
         </div>
         <div>
             <i class="fas fa-chevron-up" data-id=${item.id}></i>
             <p class="item-amount">${item.amount}</p>
             <i class="fas fa-chevron-down" data-id=${item.id}></i>
         </div>
`;
    cartContent.appendChild(div)

     }
     show() {
         cartOverlay.classList.add('transparentBcg');
         cartDOM.classList.add('showCart');
     }
     
}
// Local storage
class Storage{
    static saveProducts(products){
        localStorage.setItem("products",JSON.stringify(Products))
    }
   static getProduct(id){
       let products = JSON.parse(localStorage.getItem('products'));
       return products.find(product => product.id===id);
   }
   static saveCart(cart){
       localStorage.setItem('cart', JSON.stringify(cart));
   }
}
document.addEventListener("DOMContentLoaded",()=>{
    const ui = new UI();
    const products = new Products();
    // to get products from product json
    products.getProducts().then(products =>{ui.displayProducts(products);
    
    Storage.saveProducts(products)});
});

