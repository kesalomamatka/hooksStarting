import React, {useState, useEffect, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList'

const Ingredients=() => {

    const [userIngredients, setUserIngredients]=useState([]);



    const filteredIngredientsHandler = useCallback((filteredIngredients) => {
        setUserIngredients(filteredIngredients);
    },[]);

    const addIngredientHandler = (ingredient) => {
        fetch('https://monitor-d5c9a.firebaseio.com/ingredient.json',{
            method:'POST',
            body:JSON.stringify(ingredient),
            headers:{'Content-Type':'application/json'}
        }).then(response => {
            return response.json();
        }).then(responseBody => {
            setUserIngredients(prevIngredients=>[
                ...prevIngredients,
                {id: responseBody.name, ...ingredient}
            ]);
        });


    };

    const removeIngredientHandler = (ingredientId) => {
         setUserIngredients(prevIngredients =>
         prevIngredients.filter(ingredient => ingredient.id !== ingredientId))
    };

    
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search onLoadIngredients = {filteredIngredientsHandler}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
