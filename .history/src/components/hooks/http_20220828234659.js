import { useReducer } from 'react';


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


const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, {
        loading: false,
        error:null
    })

    const sendRequest = (url,method,body) => { 
        fetch(
            url, {
                method: method,
                body:body,
       
    }).then(response => {
      dispatchHttp({ type: 'RESPONSE' });
      // setIsLoading(false);
      // setUserIngredients(preIngredient => preIngredient.id != ingredient.id)
      dispatch({type:'Delete',id:ingredientId});
    
    }).catch(error => { 
      dispatchHttp({ type: 'ERROR',errorData:error.message });
      
    }
    );

    }

   

 };

export default useHttp;