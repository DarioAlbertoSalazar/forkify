import icons from '../img/icons.svg';

export const recipePage = ({ source_url }) => {
  return `
  <div class="recipe__directions">
  <h2 class="heading--2">How to cook it</h2>
  <p class="recipe__directions-text">
    This recipe was carefully designed and tested by
    <span class="recipe__publisher">The Pioneer Woman</span>. Please check out
    directions at their website.
  </p>
  <a
    class="btn--small recipe__btn"
    href=${source_url}
    target="_blank"
  >
    <span>Directions</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </a>
</div>
  `;
};
