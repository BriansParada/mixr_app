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
        const drink_url = data.drinks[0].strDrinkThumb + "/medium";
        
        const res2 = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink_id}`);
        const data2 = await res2.json();

        const result_txt = document.getElementById("results_txt");
        const instruct_txt = document.getElementById("instruct");
        
        console.log(name);
        result_txt.textContent = name;
        instruct_txt.textContent = data2.drinks[0].strInstructions;
        document.getElementById("res_label").style.display="block";
        document.getElementById("save_btn").style.display="block";
        document.getElementById("drink_image").src=drink_url;
    }
    catch (error){
        console.log("Not found in API database");
    }

}
async function saveCocktail() {
    // Save cocktails from results
    const cocktail = {
        drink_name: document.getElementById("results_txt").textContent,
        drink_instructions: document.getElementById("instruct").textContent,
        img_url: document.getElementById("drink_image").src
    };

    const response = await fetch(
        '/api/cocktail',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cocktail)
        }
    );
    const data = await response.json();
    console.log(data);
    alert('Cocktail Saved!');
}
async function loadSavedCocktails() {
    // Load saved cocktails
    const response = await fetch(
        '/api/cocktails'
    );
    const data = await response.json();
    console.log(data);
    const container = document.getElementById('savedDrinks');

    data.forEach(cocktail => {
        const card = document.createElement('div');
        card.innerHTML = `
            <h2>${cocktail.drink_name}</h2>
            <img src="${cocktail.img_url}" width="200">
            <p>${cocktail.drink_instructions}</p>
        `;
        container.appendChild(card);
    });
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