export const imageRecipe = ({ image_url, title }) => {
  return `
    <figure class="recipe__fig">
          <img src=${image_url} alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${title}</span>
          </h1>
        </figure>
    `;
};
