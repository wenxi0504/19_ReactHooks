import React from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  return (
    <div className="App">
      <IngredientForm />

      <section>
        <Search />
        {/* Need to add list here! */}
        <IngredientList ingredients={ userIngredients} />
      </section>
    </div>
  );
}

export default Ingredients;
