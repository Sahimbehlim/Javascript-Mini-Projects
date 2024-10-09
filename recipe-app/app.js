const input = document.querySelector('input');
const btnSearch = document.querySelector('button');
const output = document.querySelector('.data');

btnSearch.addEventListener("click",(e) => {
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`;
    fetch(url).then((response) => {
        return response.json();
    }).then((result) => {
        let myMeal = result.meals[0];
        let count = 1;
        let ingredients = [];
        for (let key in myMeal){
            let ingredient = "";
            let measure = "";
            if(key.startsWith("strIngredient") && myMeal[key]){
                ingredient = myMeal[key];
                measure = myMeal[`strMeasure` + count];
                count += 1;
                ingredients.push(`${measure} ${ingredient}`);
            }
        }
        output.innerHTML = `
        <div class="data-head my-3 justify-content-center d-flex flex-column align-items-center">
            <img src="${myMeal.strMealThumb}" alt="dish-img" class="img-fluid rounded-2">
            <div class="dish-info pt-2 rounded-3">
            <h4 class="fw-bolder">${myMeal.strMeal}</h4>
            <p>${myMeal.strArea}</p>
            </div>
        </div>
        <div class="data-body"></div>
        <div class="data-footer d-flex justify-content-end">
            <button class="btn btn-warning fw-semibold mt-1 view-recipe">View Recipe</button>
        </div>`;
        let ingredientBody = document.querySelector('.data-body');
        let ulParent = document.createElement('ul');
        ingredients.forEach((i) => {
            let liChild = document.createElement('li');
            liChild.innerText = i;
            ulParent.appendChild(liChild);
            ingredientBody.appendChild(ulParent);
        })
        let viewRecipe = document.querySelector('.view-recipe');
        let recipeDetails = document.querySelector('.recipe-desc');
        viewRecipe.addEventListener('click',() => {
            recipeDetails.style.display = "block";
            recipeDetails.innerHTML = `
            <div class="d-flex justify-content-end">
                <button class="btn btn-close mb-3"></button>
            </div>
            <p>${myMeal.strInstructions}</p>`;
            let hideRecipe = document.querySelector('.btn-close');
            hideRecipe.addEventListener('click',() => {
                recipeDetails.style.display = "none";
            });
        });
    }).catch(() => {
        output.innerHTML = `<h4 class="pt-4 text-center text-danger">Enter Valid Dish Name</h4>`;
    });
});

