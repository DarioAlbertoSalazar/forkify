// model.js

// Objeto state con un objeto recipe vacío
const state = {
    recipe: {},
  };
  
  // Función asíncrona para cargar la receta
  const loadRecipe = async (id) => {
    try {
      // Realizar la solicitud de la receta a la API
      const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
      const data = await res.json();
  
      // Validar el estado de la respuesta
      if (!res.ok) {
        throw new Error(`Could not fetch recipe data for id: ${id}`);
      }
  
      // Extraer la receta de la respuesta
      const { recipe } = data.data;
  
      // Actualizar el objeto state con la receta
      state.recipe = recipe;
  
      // Imprimir la receta en la consola
      console.log(state.recipe);
    } catch (err) {
      // Manejar errores
      alert(`Error fetching recipe: ${err.message}`);
    }
  };
  
  // Exportar el estado y la función loadRecipe
  export { state, loadRecipe };
  