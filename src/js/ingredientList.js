import icons from "../img/icons.svg"

export const ingredientList = ({ ingredients }) => {
  return `
    <div class="recipe__ingredients">
                <h2 class="heading--2">Recipe ingredients</h2>
                <ul class="recipe__ingredient-list">
                    ${ingredients
                      .map(
                        ({ quantity, description, unit }) =>
                          `<li class="recipe__ingredient">
                        <svg class="recipe__icon">
                        <use href="${icons}#icon-check"></use>
                        </svg>
                        <div class="recipe__quantity">${quantity || ''}</div>
                        <div class="recipe__description">
                            <span class="recipe__unit">${unit}</span>
                            ${description}
                        </div>
                    </li>`
                      )
                      .join('')}
                </ul>
            </div>
    `;
};
