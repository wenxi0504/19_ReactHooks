import React, { useEffect ,useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI//ErrorModal';
import Search from './Search';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

 
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
 
  const filteredIngredientsHandler = useCallback((filterIngredients) => {
    setUserIngredients(filterIngredients);
  }, []);


 
 
  const addIngredientHandler = ingredient => { 
    setIsLoading(true);
    fetch('https:xxx.firebase.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify({ ingredient }),
      headers: {'Content-Type':'application/json'}   
    }).then(response => { 
      setIsLoading(false);
      return response.json();
    }).then(responseData => { 
       response.json();
       setUserIngredients(preIngredient => [...preIngredient, {
      id: responseData.name,...ingredient
    }]);

    });
  }

  const removeIngredientHandler = ingredient => { 
    setIsLoading(true);
    fetch(`https:xxx.firebase.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE',
       
    }).then(response => {
      setIsLoading(false);
      setUserIngredients(preIngredient => preIngredient.id != ingredient.id)
    }).catch(error => { 
      setError(error.message);

    });

  }
  
  
  return (
    <div className="App">
      {error && <ErrorModal>{error}</ErrorModal>};
        
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler } />
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredients} onRemoveItem={ removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
