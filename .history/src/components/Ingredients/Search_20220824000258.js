import React, { useState,useEffect} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const {onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');

  useEffect(() => {
    setTimeout(() => { 
       const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
    fetch('https:xxx.firebase.com/ingredients.json'+query).then(response => { 
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
   //....
   onLoadIngredients(loadedIngredients);
   
    });

    }, 500);

   
   },[enteredFilter,onLoadIngredients])



  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={enteredFilter} onChange={
            event => { setEnteredFilter(event.target.value)}
           } />
        </div>
      </Card>
    </section>
  );
});

export default Search;
