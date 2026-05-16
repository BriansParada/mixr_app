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
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "contain";
        
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

async function lookUpDrink(){
    //Look up drink based on ingredient or name and change HTML elements
    try{
        const tolook = document.getElementById("look_input").value;
        console.log(tolook);
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${tolook}`);
        const data = await res.json();

        const name = data.drinks[0].strDrink;
        const drink_id= data.drinks[0].idDrink;

        const res2 = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink_id}`);
        const data2 = await res2.json();

        const result_txt = document.getElementById("results_txt");
        const intruct_txt = document.getElementById("intruct");
        
        console.log(name);
        result_txt.textContent = name;
        intruct_txt.textContent = data2.drinks[0].strInstructions;
    }
    catch (error){
        console.log("Not found in API database");
    }

}
window.onload = function () {
    loadDrinks();

    new Typed('#typed-headline', {
        strings: ["Welcome to Mixr.", "Find your perfect cocktail.", "Discover something new."],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1500,
        loop: true
    });

    new Typed('#typed-sub', {
        strings: [
            "Search by name or ingredient below.",
            "Browse our carousel for inspiration.",
            "Your next favorite drink is one search away."
        ],
        typeSpeed: 40,
        backSpeed: 25,
        backDelay: 2000,
        startDelay: 500,
        loop: true
    });
};