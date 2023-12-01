// Define an array to store items in the shopping cart
var cart = [];

// Function to update the display of the shopping cart in the UI
function updateCartDisplay() {
    // Log the updated cart to the console
    console.log("Cart updated:", cart);

    // Get the cart content element from the HTML
    var cartContent = document.querySelector('.cart-content');
    // Clear any previous content in the cart
    cartContent.innerHTML = '';

    // Iterate through each item in the cart and create corresponding HTML elements
    cart.forEach(function (item) {
        var itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');

        var imageElement = document.createElement('img');
        imageElement.src = item.image;
        imageElement.alt = item.name;
        itemElement.appendChild(imageElement);

        var detailsElement = document.createElement('div');
        detailsElement.classList.add('cart-item-details');
        detailsElement.innerHTML = `<p>${item.name}<br>Quantity: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>`;

        itemElement.appendChild(detailsElement);
        cartContent.appendChild(itemElement);
    });

    // Calculate and update the total price of items in the cart
    var totalPrice = cart.reduce(function (sum, item) {
        return sum + item.price * item.quantity;
    }, 0).toFixed(2);

    // Get the total price element from the HTML
    var totalPriceElement = document.querySelector('.total-price');
    // Update the total price element in the UI
    totalPriceElement.textContent = 'Total: $' + totalPrice;
}

// Function to add an item to the cart --------------------------------------------------------------------
function addToCart(button) {
    // Get the parent element of the clicked button
    var parentElement = button.closest('.button-deals');
    // Extract information about the food item from the parent element
    var foodName = parentElement.querySelector('.food-name').textContent;
    var foodPrice = parseFloat(parentElement.querySelector('.food-price').textContent.replace('$', ''));
    
    // Check if the food price is a valid number
    if (isNaN(foodPrice)) {
        // Log an error if the price is not a valid number
        console.error('Invalid food price. Check the DOM structure.');
        return;
    }

    var foodImage = parentElement.querySelector('img').src;

    // Check if the item is already in the cart
    var existingItem = cart.find(item => item.name === foodName);

    if (existingItem) {
        // If the item exists, increment its quantity
        existingItem.quantity += 1;
    } else {
        // If the item doesn't exist, add a new item to the cart
        var item = {
            name: foodName,
            price: foodPrice,
            image: foodImage,
            quantity: 1
        };
        cart.push(item);
    }

    // Update the cart display in the UI
    updateCartDisplay();
    // Slide out the cart for a visual effect
    slideOutCart();
}

// Function to animate the sliding out of the cart ----------------------------------------------------------------------------
function slideOutCart() {
    var cartContainer = document.querySelector('.cart-container');
    cartContainer.style.right = '0';
}

// Function to close the cart by hiding it off-screen
function closeCart() {
    var cartContainer = document.querySelector('.cart-container');
    cartContainer.style.right = '-500px';
}

// Function to handle the checkout process
function checkout() {
    // Display an alert to thank the user for their purchase
    alert("Thank you for your purchase!");
    // Close the cart after checkout
    closeCart();
    // Clear the cart content
    clearCart();
}

// Function to clear the cart by resetting it to an empty array
function clearCart() {
    cart = [];
    // Update the cart display to reflect the empty cart
    updateCartDisplay();
}

// Event listener for the subscribe button
document.getElementById('subscribeButton').addEventListener('click', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Display an alert for a successful subscription
    alert('Subscription successful!');
});

// Event listener for when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Initialize the slide index for the homepage slideshow
    let slideIndex = 1;
    // Show the initial set of slides
    showSlides(slideIndex);

    // Set an interval to automatically advance the slides every 3000 milliseconds (3 seconds)
    setInterval(function () {
        plusSlides(1);
    }, 3000);

    // Function to advance or go back in the slideshow
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    // Function to navigate to a specific slide
    function currentSlide(n, event) {
        // Prevent the default behavior of the anchor tag
        event.preventDefault();
        // Show the specified slide
        showSlides(slideIndex = n);
    }

    // Function to display the slides
    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot-homepage");

        // Reset the slide index if it goes beyond the number of slides
        if (n > slides.length) {
            slideIndex = 1;
        }

        // Set the slide index to the last slide if it goes below 1
        if (n < 1) {
            slideIndex = slides.length;
        }

        // Hide all slides
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        // Remove the "active" class from all dot elements
        for (i = 0; dots && i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        // Display the current slide and mark the corresponding dot as active
        if (slides[slideIndex - 1] && dots[slideIndex - 1]) {
            slides[slideIndex - 1].style.display = "block";
            dots[slideIndex - 1].className += " active";
        }
    }

    // Attach click event listeners to dots for navigation
    let dotElements = document.getElementsByClassName("dot-homepage");
    for (let i = 0; i < dotElements.length; i++) {
        dotElements[i].addEventListener("click", function (event) {
            currentSlide(i + 1, event);
        });
    }
});
