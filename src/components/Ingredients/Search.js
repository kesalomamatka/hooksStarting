import React,{useEffect, useState, useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
    const { onLoadIngredients } = props;
    const [enteredFilter, setEnteredFilter] = useState('');
    const inputRef = useRef();
    useEffect(()=>{
        const timer = setTimeout(() =>{
            if ( enteredFilter === inputRef.current.value){

                const query = enteredFilter.length===0 ? '' :
                    `?orderBy="title"&equalTo="${enteredFilter}"`;
                fetch('https://monitor-d5c9a.firebaseio.com/ingredient.json'+query)
                    .then(response =>response.json())
                    .then(responsecoData => {
                        console.log(responsecoData);
                        const loadIngredients=[];

                        for (const key in responsecoData) {
                            loadIngredients.push({
                                id:key,
                                title:responsecoData[key].title,
                                amount:responsecoData[key].amount
                            })}
                        onLoadIngredients(loadIngredients);
                    })
            }

        },500);
        return ()=>{
            clearTimeout(timer);
        };
    },[enteredFilter, onLoadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
              ref={ inputRef }
              type="text"
              value={enteredFilter}
              onChange={event => setEnteredFilter(event.target.value)
          }/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
