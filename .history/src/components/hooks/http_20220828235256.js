import { useReducer } from 'react';


const httpReducer = (curHttpState, action) => { 
  switch (action.type) { 
    case 'SEND': return { loading: true, error: null,data:null };
    case 'RESPONSE':
      return {...curHttpState, loading:false,data:action.responseData }
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
        error: null,
        data:null
    })

    const sendRequest = (url, method, body) => { 
        dispatch({ typeL: 'SEND' });
        fetch(
            url, {
                method: method,
                body: body,
                headers: {
                    'Content-Type': 'application/json',
                    
                    }
       
    }).then(response => {
        return response.json();
    
    }).then(
        responseData => { 
            dispatchHttp({ type: 'RESPONSE' });
        }
    ).catch(error => { 
      dispatchHttp({ type: 'ERROR',errorData:error.message });
      
    }
    );

    }

   

 };

export default useHttp;