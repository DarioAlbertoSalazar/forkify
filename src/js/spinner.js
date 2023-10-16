import icons from "../img/icons.svg"

export const renderSpinner = (parentEl) => {
    const spinnerHTML = `
    <div class="spinner">
        <svg>
            <use href="${icons}#icon-loader"></use>
        </svg>
    </div>`;

    parentEl.insertAdjacentHTML('afterbegin', spinnerHTML)
}