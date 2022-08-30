import React, { useReducer, suseEffect ,useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI//ErrorModal';
import Search from './Search';
import useHttp from '../hooks/http'

const ingredientReducer = (currentIngredients, action) => { 
  switch (action.type) { 
    case 'SET': return action.ingredient;
    case 'ADD': return [...currentIngredients, action.ingredient];
    case 'DELETE': return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there!');

  }
};

const httpReducer = (curHttpState, action) => { 
  switch (action.type) { 
    case 'SEND': return { loading: true, error: null };
    case 'RESPONSE':
      return {...curHttpState, loading:false }
    case 'ERROR':
      return { loading: false, error: action.errorData };
    case 'CLEAR':
      return {...curHttpState, error:null }
      default:throw new Error('Should not be reached!')

  }

}

function Ingredients() {
  //dispatch the option
  const [userIngredients,dispatch]=useReducer(ingredientReducer,[]);
  // const [userIngredients, setUserIngredients] = useState([]);
  
  // const [httpState,dispatchHttp ] = useReducer(httpReduce, {loading:false,error:null});
  const { isLoading,error,data,sendRequest} =useHttp();

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  useEffect(() => { 


  },[data])

 
  //build a custom hook http.js
//   useEffect(() => {
//      fetch('https:xxx.firebase.com/ingredients.json').then(response => { 
//       return response.json();
//  }).then(responseData => { 
//    const loadedIngredients = [];
//    for (const key in responseData) { 
//      loadedIngredients.push(
//        {
//          id: key,
//          title: responseData[key].title,
//          amount:responseData[key].amount
//        } );
//    }
//    setUserIngredients(loadedIngredients)
//     });
//    },[]);
 
  
  const filteredIngredientsHandler = useCallback((filterIngredients) => {
    // setUserIngredients(filterIngredients);
    dispatch({ type: 'SET', ingredients:filterIngredients});
  }, []);
 
 
  const addIngredientHandler = ingredient => { 
    // setIsLoading(true);
    dispatchHttp({ type: 'SEND' });
    fetch('https:xxx.firebase.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify({ ingredient }),
      headers: {'Content-Type':'application/json'}   
    }).then(response => { 
       dispatchHttp({ type: 'RESPONSE' });
      return response.json();
    }).then(responseData => { 
    //    response.json();
    //    setUserIngredients(preIngredient => [...preIngredient, {
    //   id: responseData.name,...ingredient
    // }]);
      dispatch({ type: 'ADD', ingredient: {id: responseData.name,...ingredient} })

    });
  }

  const removeIngredientHandler = useCallback(ingredientId => {
    sendRequest(`https://xxxx/ingredients/${ingredientId}.json`,'DELETE',null,ingredientId)


    // dispatchHttp({ type: 'DELETE' });
    // fetch(`https:xxx.firebase.com/ingredients/${ingredientId}.json`, {
    //   method: 'DELETE',
       
    // }).then(response => {
    //   dispatchHttp({ type: 'RESPONSE' });
    //   // setIsLoading(false);
    //   // setUserIngredients(preIngredient => preIngredient.id != ingredient.id)
    //   dispatch({ type: 'Delete', id: ingredientId });
    
    // }).catch(error => {
    //   dispatchHttp({ type: 'ERROR', errorData: error.message });
      
    // }
    // );

  }, [sendRequest]);
  const clearError = () => { 
    // setError(null);
    // setIsLoading(false);
    dispatchHttp({ type: 'CLEAR' });
  }
  
  
  return (
    <div className="App">
      {/* {httpState && <ErrorModal onClose={ clearError}>{error}</ErrorModal>};
         */}
      {error&& <ErrorModal onClose={ clearError}>{error}</ErrorModal>};
        
      <IngredientForm onAddIngredient={addIngredientHandler}
        loading={ isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler } />
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredients} onRemoveItem={ removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
