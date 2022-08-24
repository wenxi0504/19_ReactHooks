import React from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  const addIngredientHandler = ingredient => { 

    fetch('https:xxx.firebase.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify({ ingredient }),
      headers: {'Content-Type':'application/json'}   
    }).then(response => { 
      return response.json();
    }).then(responseData => { 
       response.json();
       setUserIngredients(preIngredient => [...preIngredient, {
      id: Math.random().toString(),...ingredient
    }]);

    });


   
  }
  
  
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredients} onRemoveItem={ ()=>{}} />
      </section>
    </div>
  );
}

export default Ingredients;
