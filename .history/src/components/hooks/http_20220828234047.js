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



 };

export default useHttp;