import React, { useReducer, suseEffect ,useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI//ErrorModal';
import Search from './Search';

const ingredientReducer = (currentIngredients, action) => { 
  switch (action.type) { 
    case 'SET': return action.ingredient;
    case 'ADD': return [...currentIngredients, action.ingredient];
    case 'DELETE': return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there!');

  }
};

const httpReducer = (httpState, action) => { 
  switch (action.type) { 
    case 'SEND': return {}
    case 'RESPONSE':
    case 'ERROR':
      default:throw new Error('Should not be reached!')

  }

}

function Ingredients() {
  //dispatch the option
  const [userIngredients,dispatch]=useReducer(ingredientReducer,[]);
  // const [userIngredients, setUserIngredients] = useState([]);
  
  const [] = useReducer(httpReduce, {loading:false,error:null});

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
    // setUserIngredients(filterIngredients);
    dispatch({ type: 'SET', ingredients:filterIngredients});
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
    //    response.json();
    //    setUserIngredients(preIngredient => [...preIngredient, {
    //   id: responseData.name,...ingredient
    // }]);
      dispatch({ type: 'ADD', ingredient: {id: responseData.name,...ingredient} })

    });
  }

  const removeIngredientHandler = ingredient => { 
    setIsLoading(true);
    fetch(`https:xxx.firebase.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE',
       
    }).then(response => {
      setIsLoading(false);
      // setUserIngredients(preIngredient => preIngredient.id != ingredient.id)
      dispatch({type:'Delete',id:ingredientId});
    
    }).catch(error => { 
      setError(error.message);
      
    }
    );

  }
  const clearError = () => { 
    setError(null);
    setIsLoading(false);
  }
  
  
  return (
    <div className="App">
      {error && <ErrorModal onClose={ clearError}>{error}</ErrorModal>};
        
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
