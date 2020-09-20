import React from 'react'
import PropTypes from 'prop-types';

const Categories = React.memo(function Categories({activeCategory, items, onClickCategory}) {

    return (

        <div className="categories">
            <ul>
            <li 
                className={activeCategory === null? 'active' : ''}
                onClick={() => onClickCategory(null)}
            >Все</li>
            {items &&
                items.map((item, index) => {
                    return (
                        <li 
                            className={activeCategory === index ? 'active' : ''} 
                            onClick={() => onClickCategory(index)}
                            key={item + "_" + index} 
                        >
                            {item}
                        </li>
                    )
                })
            }
            </ul>
        </div>
    )
})

export default Categories;

Categories.propTypes = {
    activeItem: PropTypes.oneOf([PropTypes.number, null]), 
    items: PropTypes.arrayOf(PropTypes.string), 
    onClickItem: PropTypes.func
}

Categories.defaultProps = {
    activeItem: null,
    items: []
}