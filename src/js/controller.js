import icons from '../img/icons.svg';
import { recipePage } from './footer';
import { ingredientList } from './ingredientList';
import { recipeDetailsMarkup } from './recipe';
import { renderSpinner } from './spinner';
import { imageRecipe } from './image';
import SearchView from './views/searchView';

const recipeContainer = document.querySelector('.recipe');

const KEY = '8d488d17-fae0-474f-a48f-b7eab7d8c578';

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

const loadRecipe = async id => {
  // const id = location.hash.slice(1);
  if (!id) {
    return;
  }
  const URL_API = `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`;
  try {
    renderSpinner(recipeContainer);
    const recipe = await showRecipe(URL_API);
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', recipePage(recipe));
    recipeContainer.insertAdjacentHTML('afterbegin', ingredientList(recipe));
    recipeContainer.insertAdjacentHTML('afterbegin',recipeDetailsMarkup(recipe));
    recipeContainer.insertAdjacentHTML('afterbegin', imageRecipe(recipe));
  } catch (error) {
    console.error('Error al cargar la receta', error);
  }
};

const PreviewViewItems = ({ id, title, publisher, image_url, key }) => {
  return `
<li class="preview">
    <a class="preview__link" ${
      id === id ? 'preview__link--active' : ''
    }" href="#${id}">
      <figure class="preview__fig">
        <img src="${image_url}" alt="${title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${title}</h4>
        <p class="preview__publisher">${publisher}</p>       
        <div class="preview__user-generated ${key ? '' : 'hidden'}">
        <svg>
        <use href="${icons}#icon-user"></use>
        </svg>
      </div>
    </div>
    </a>
  </li>
`;
};

const loadSearchResults = async query => {
  const URL_API = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}&key=${KEY}`;
  try {
    const res = await fetch(URL_API);
    const response = await res.json();
    const { data } = response;
    const result = data.recipes.slice(0,5)
      .map(previewItem => PreviewViewItems(previewItem))
      .join('');
    document.getElementById('searchResultsList').innerHTML = result;
    console.log(data.recipes);
    // const selectId = await loadRecipe(id);
  } catch (err) {
    console.error('Error al buscar la receta', err);
  }
};

const controlSearchResults = async function () {
  try {
    renderSpinner(recipeContainer);
    // 1) Get search query
    const query = SearchView.getQuery();
    console.log(query);
    if (!query) return;

    // 2) Load search results
    await loadSearchResults(query);
  } catch (err) {
    console.log(err);
  }
};

const init = () => {
  SearchView.addHandlerSearch(controlSearchResults);
  window.addEventListener('hashchange', () => {
    const id = window.location.hash.slice(1);
    loadRecipe(id);
  });
};
init();
