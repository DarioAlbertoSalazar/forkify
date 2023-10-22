import icons from '../img/icons.svg';
import { recipeDetailsMarkup } from './recipe';
import { ingredientList } from './ingredientList';
import { renderSpinner } from './spinner';
import { recipePage } from './footer';
import { imageRecipe } from './image';
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
async function showRecipe(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('No se pudo obtener la receta.');
    }
    const { data } = await response.json();
    const { recipe } = data;
    return recipe;
  } catch (error) {
    throw error;
  }
}

const URL_API =
  'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886';

(async () => {
  try {
    renderSpinner(recipeContainer);
    const recipe = await showRecipe(URL_API);
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', recipePage(recipe));
    recipeContainer.insertAdjacentHTML('afterbegin', ingredientList(recipe));
    recipeContainer.insertAdjacentHTML(
      'afterbegin',
      recipeDetailsMarkup(recipe)
    );
    recipeContainer.insertAdjacentHTML('afterbegin', imageRecipe(recipe));
  } catch (error) {
    hideSpinner();
    console.error('Error al cargar la receta', error);
  }
})();
