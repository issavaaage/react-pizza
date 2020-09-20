import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {fetchPizzas} from '../redux/actions/pizzas';

import {Categories, SortPopup, PizzaBlock, PizzaLoadingBlock} from './../components';
import {setCategory, setSortBy} from './../redux/actions/filters';
import {addPizzaToCart} from './../redux/actions/cart';

const categoryNames = [
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые"
]

const sortItems = [
  {name: "популярности", type: "rating", order: "desc"},
  {name: "цене", type: "price", order: "desc"},
  {name: "алфавиту", type: "name", order: "asc"}
]


function Home() {

  const dispatch = useDispatch();

  const items = useSelector(({pizzas}) => pizzas.items);
  const cartItems = useSelector(({cart}) => cart.items);
  const isLoaded = useSelector(({pizzas}) => pizzas.isLoaded);
  const {category, sortBy} = useSelector(({filters}) => filters);

  
  React.useEffect(() => {
    dispatch(fetchPizzas(category, sortBy))
  }, [category, sortBy]);

  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  const onSelectSort = React.useCallback((catObj) => {
    dispatch(setSortBy(catObj))
  }, []);

  const handleAddPizzaToCart = obj => {
    dispatch(addPizzaToCart(obj));
  }
  
  return (
      <div className="container">
        <div className="content__top">
          <Categories
            activeCategory={category}
            onClickCategory={(index) => onSelectCategory(index)}
            items={categoryNames}
          />
          <SortPopup
            activeSortBy={sortBy.type}
            onClickSortType={(catName) => onSelectSort(catName)}
            items={sortItems}
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoaded &&
            items.map(item => (
              <PizzaBlock onClickAddPizza={handleAddPizzaToCart} key={item.id} addedCount={cartItems[item.id] && cartItems[item.id].items.length} {...item} />
            ))
          }
          {!isLoaded &&
            Array(12).fill(0).map((_, index) => (
              <PizzaLoadingBlock key={index} />
            ))
          }
        </div>
      </div>
  )
}

export default Home
