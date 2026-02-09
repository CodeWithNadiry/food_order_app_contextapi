import React, { useContext } from 'react'
import Button from './UI/Button';
import CartContext from '../store/CartContext';

const MealItem = ({ data }) => {
    const {addItem} = useContext(CartContext)
    const {id, name, price, description, image } = data;

    function handleAddMealToCart() {
        addItem(data);
    }
    return (
        <li className='meal-item' key={id}>
            <article>
                <img src={image} alt={name} />
                <div>
                    <h3>{name}</h3>
                    <p className="meal-item-price">{price}</p>
                    <p className="meal-item-description">{description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddMealToCart}>Add To Cart</Button>
                </p>
            </article>
        </li>
    )
}


export default MealItem