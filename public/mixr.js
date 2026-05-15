async function loadDrinks() {
    //Load 10 random drinks for home page
    for (let i =0; i<10; i++){
        const res = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        const data = await res.json();

        const container = document.getElementById("drinksCarousel");

        const slide = document.createElement("div");
        slide.className = "swiper-slide";

        const img = document.createElement("img");
        img.src = data.drinks[0].strDrinkThumb;
        
        slide.appendChild(img);
        container.appendChild(slide);
    }
    
    new Swiper('.swiper', {
        loop: true,
        pagination: {
        el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });
}
window.onload = function(){
    loadDrinks();
}