import React, { useState,useEffect} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const [enteredFilter, setEnteredFilter] = useState('');
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
   
    });
   },[enteredFilter])



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
