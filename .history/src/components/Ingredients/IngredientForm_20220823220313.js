import React, { useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  // first parameter is current state snapshot, second parameter is update state
  // const [inputState, setInputState] = useState({ title: '', amount: '' });
  const [enteredTitle, setEnteredTitle] = useState('');
  const [amountState, setAmountState] = useState('');
  
  const submitHandler = event => {
    event.preventDefault();
    // ...
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={inputState.title} onChange={event => {
              const newTitle = event.target.value;
              setInputState(preInputState => (
                { title: newTitle, amount: preInputState.amount }))
            }} />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={inputState.amount} onChange={event => {
              const newAmount = event.target.value;
              setInputState(preInputState => ({ amount: newAmount, title: preInputState.title }))
            }} />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
