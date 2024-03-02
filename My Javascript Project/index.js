      
   let navbar = document.querySelector(".navbar");
let shoppingCart = document.querySelector(".cart");

document.querySelector("#menu-btn").onclick = () => {
    navbar.classList.toggle("active");
    shoppingCart.classList.remove("active");
};

document.querySelector("#shop-cart-btn").onclick = () => {
    shoppingCart.classList.toggle("active");
    navbar.classList.remove("active");
};

window.onscroll = () => {
    if (shoppingCart.classList.contains("active")) {
        navbar.classList.remove("active");
    } else {
        shoppingCart.classList.remove("active");
        navbar.classList.remove("active");
    }
};
    
      $(document).ready(function () {
        $(".banner_slider").slick({
          dots: true,
          arrows: false,
          infinite: true,
          speed: 1000,
          slidesToShow: 1,
          adaptiveHeight: true,
          draggable: true, 
          autoplay: true,
          autoplaySpeed: 2500,
        });
      });

    //   open and close cart process

    let cartIcon = document.querySelector("#shop-cart-btn")
    let cart = document.querySelector(".cart")
    let closeCart = document.querySelector("#close")

   // To open the cart details   
    cartIcon.onclick = () =>{
        cart.classList.add("active");
    }

      // To close the cart details
    closeCart.onclick = () =>{
        cart.classList.remove("active");
    }
  

    // some work to do when change again right:0 instead of -100% because opening and closing process when right is shift from 0 to -100%; Cart details will not be closed still after the remove cart process.
    
    // .cart{
    //     position: fixed;
    //     top:0;
    //     right:0;    -100%;


    if(document.readyState == 'loading'){
        document.addEventListener('DOMContentLoaded', ready)
    }else{
        ready();
    }

    // Purchase item remove from cart
    // Making function for it 

    function ready(){                
        var removecartbuttons = document.getElementsByClassName("cart-remove")
        console.log(removecartbuttons)
        for(var i=0; i<removecartbuttons.length; i++){
            var button = removecartbuttons[i]
            button.addEventListener('click', removeCartItem)
        }

        // Quantity Changes

        var quantityInputs = document.getElementsByClassName('cart-quantity') 
        for(var i=0; i<quantityInputs.length; i++){
         var input = quantityInputs[i]
         input.addEventListener('change', quantityChanged)
        }

        // Add to cart

        var addCart = document.getElementsByClassName('add-cart')
        for(var i=0; i< addCart.length; i++){
             var button =  addCart[i];
             button.addEventListener("click", addCartClicked)
        }

        document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked)
    }

    // Buy button

    function buyButtonClicked(){
        alert('Your order is placed')
        var cartContent = document.getElementsByClassName('cart-content')[0]
        while(cartContent.hasChildNodes()){
           cartContent.removeChild(cartContent.firstChild)
        }
        updateTotal();
    }

    //  Remove items from the cart
    function removeCartItem(event){
      var buttonClicked = event.target;
      buttonClicked.parentElement.remove();
      updateTotal();
    }

    // Quantity Changes

    function quantityChanged(event){
        var input = event.target
        if(isNaN(input.value) || input.value <= 0){
            input.value = 1;
        } 
        updateTotal();
    }

    // Add to cart

    function addCartClicked(event){
      var button = event.target
      var product = button.closest('.product');
      var title = product.querySelector('.product-title').innerText; // Get title within the product
      var price = product.querySelector('.price').innerText;
      var productImg = product.querySelector('.product-img-one').src;
      addProductToCart(title, price, productImg)
   
      updateTotal ()
    }

    var cartProductTitles = new Set();

    function addProductToCart(title, price, productImg){
        
        var cartItems = document.getElementsByClassName('cart-content')[0]
        if (cartProductTitles.has(title)) {
            alert('You have already added this item to your cart');
            return; // Exit the function if the product is already in the cart
        }
        // var cartItemsNames = cartItems.getElementsByClassName('cart-product-title')
        // for(var i=0; i<cartItemsNames.length; i++){
        //     if(cartItemsNames[i].innerText == title){
        //         alert('You have already add this item to your cart');
        //         return;
        //     }
        //     }

            var cartShopBox = document.createElement('div')
            cartShopBox.classList.add('cart-box')     
    

    var cartBoxContent = `<img class="cart-img" src="${productImg}" alt="" />
                        <div class="detail-box">
                          <div class="cart-product-title">${title}</div>
                          <div class="cart-price">${price}</div>
                          <input class="cart-quantity" type="number" name="1" />
                        </div>
                        <i class="fa fa-trash cart-remove"></i>`
                          
       cartShopBox.innerHTML = cartBoxContent;
       cartItems.append (cartShopBox);

       cartProductTitles.add(title);
       
       cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)
       cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)

       updateTotal ()
    }   
    // Update Total when items are added

    function updateTotal (){
        var cartBoxes = document.getElementsByClassName("cart-box")
        var total = 0;
        for(var i=0; i<cartBoxes.length; i++){
           var cartBox = cartBoxes[i]
           var priceElement = cartBox.getElementsByClassName('cart-price')[0]
           var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
           var price = parseFloat(priceElement.innerText.replace("$",""))
           var quantity = quantityElement.value 
           total = total + price * quantity;

        //    if price contains cents value

        total = Math.round(total*100)/ 100;
        }

        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    }

    let categoryButtons = document.querySelectorAll(".category-btns");
    let products = document.querySelectorAll(".product");

    // Initial filter setting
    let currentFilter = "ShowAll";

    // Filter function
    function filterProducts(category) {
      products.forEach((product) => {
        if (
          category === "ShowAll" ||
          product.getAttribute("data-item") === category
        ) {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });
    }

    // Initial filter
    filterProducts(currentFilter);

    // Add click event listener to each category button
    categoryButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove 'active' class from all buttons
        categoryButtons.forEach((btn) => btn.classList.remove("active"));
        // Add 'active' class to the clicked button
        this.classList.add("active");
        // Get the filter value from the button's data-filter attribute
        let filterValue = this.getAttribute("data-filter");
        // Filter the products based on the category
        filterProducts(filterValue);
      });
    });
