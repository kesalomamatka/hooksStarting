import React, {useState, useEffect, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList'

import ErrorModal from '../UI/ErrorModal';


const Ingredients=() => {

    const [userIngredients, setUserIngredients]=useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [error, setError] = useState();


    const filteredIngredientsHandler = useCallback((filteredIngredients) => {
        setUserIngredients(filteredIngredients);
    },[]);

    const addIngredientHandler = (ingredient) => {
        setIsLoading(true);
        fetch('https://monitor-d5c9a.firebaseio.com/ingredient.json',{
            method:'POST',
            body:JSON.stringify(ingredient),
            headers:{'Content-Type':'application/json'}
        }).then(response => {
            setIsLoading(false);

            return response.json();
        }).then(responseBody => {
            setUserIngredients(prevIngredients=>[
                ...prevIngredients,
                {id: responseBody.name, ...ingredient}
            ]);
        });


    };

    const removeIngredientHandler = (ingredientId) => {
        setIsLoading(true);

        fetch(`https://monitor-d5c9a.firebaseio.com/ingredient/${ingredientId}.json`,{
            method:'Delete'
        }).then(response => {
            setIsLoading(false);

            setUserIngredients(prevIngredients =>
                prevIngredients.filter(ingredient => ingredient.id !== ingredientId))
        }).catch(error => {
            setError("Something went wrong!");
        });

    };

    const clearError  = () => {
        setError(null);
        setIsLoading(false);
    }

    
  return (
    <div className="App">
        {error && <ErrorModal onClose = {clearError }>{error}</ErrorModal>}
      <IngredientForm
          onAddIngredient={addIngredientHandler}
          loading={isLoading}
      />

      <section>
        <Search onLoadIngredients = {filteredIngredientsHandler}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
