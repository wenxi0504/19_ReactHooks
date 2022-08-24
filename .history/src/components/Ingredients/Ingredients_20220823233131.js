import React, { useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
 
  useEffect(() => {
     fetch('https:xxx.firebase.com/ingredients.json').then(response => { 
      return response.json();
 }).then(responseData => { 
   const loadedIngredients = [];
   for (const key in responseData) { 
     loadedIngredients.push(
       {
         id: key,
         title: responseData[key].title,
         amount:responseData[key].amount
       } );
   }
   setUserIngredients(loadedIngredients)
    });
   },[]);
 
  const filteredIngredientsHandler = (filterIngredients) => {
    setUserIngredients(filterIngredients);
   }


 
 
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
      id: responseData.name,...ingredient
    }]);

    });


   
  }
  
  
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={ } />
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredients} onRemoveItem={ ()=>{}} />
      </section>
    </div>
  );
}

export default Ingredients;
