import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postOrder } from '../state/pizzaApie'
import { setLoading, addOrder, fetchOrders } from '../state/orderHistorySlice'

const initialFormState = {
  fullName: "",
  size: "",
  toppings: [],
};

export default function PizzaForm() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.orderHistory.loading)
  const [formData, setForm] = useState(initialFormState)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setForm((prevFormData) => {
        const updatedToppings = checked
          ? [...prevFormData.toppings, name]
          : prevFormData.toppings.filter((topping) => topping !== name);
        return { ...prevFormData, toppings: updatedToppings };
      });
    } else {
      setForm((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, size, toppings } = formData;

    if (!fullName.trim()) {
      setError('fullName is required');
      return;
    }
    if (fullName.length < 3) {
      setError('fullName must be at least 3 characters')
      return;
    }
    if (!['S', 'M', 'L'].includes(size)) {
      setError('size must be one of the following values: S, M, L');
      return;
    }

    setError("");
    dispatch(setLoading(true));

    try {
      const toppingMap = {
        Pepperoni: 1,
        Greenpeppers: 2,
        Pineapple: 3,
        Mushrooms: 4,
        Ham: 5,
      };

      const toppingIds = toppings.map((topping) => toppingMap[topping]).filter(Boolean);


      // try {
      //   const toppingIds = toppings.map((topping) => {
      //     switch (topping) {
      //       case "Pepperoni": return 1;
      //       case "Greenpeppers": return 2;
      //       case "Pineapple": return 3;
      //       case "Mushrooms": return 4;
      //       case "Ham": return 5;
      //       default: return null;
      //     }
      // }).filter(Boolean);



      const updatedFormData = { fullName, size, toppings: toppingIds };
      const response = await dispatch(postOrder(updatedFormData));

      if (response.error) {
        throw new Error(response.error.message || "Failed to submit order")
      }
      dispatch(addOrder({ ...formData, id: Date.now() }));
      // dispatch(fetchOrders());
      setForm(initialFormState);
    } catch (err) {
      setError(err.message || "Failed to submit order");
    } finally {
      dispatch(setLoading(false))
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {loading && <div className='pending'>Order in progress...</div>}
      {error && <div className='failure'>Order failed:{error}</div>}

      <div className="input-group">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Type full name"
          required />
      </div>

      <div className="input-group">
        <label htmlFor="size">Size</label><br />
        <select id="size" name="size" value={formData.size} onChange={handleChange}>
          <option value="">----Choose size----</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
        </select>
      </div>

      <div className="input-group">
        {["Pepperoni", "Greenpeppers", "Pineapple", "Mushrooms", "Ham"].map((topping) => (
          <label key={topping}>
            <input
              type="checkbox"
              name={topping}
              checked={formData.toppings.includes(topping)}
              onChange={handleChange}
            />
            {topping}
            <br />
          </label>
        ))}
      </div>

      <input data-testid="submit" type="submit" value="Submit Order" />
    </form>
  );
}



{/* <input data-testid="checkPepperoni" name='Pepperoni' type="checkbox" checked=
                {formData.toppings.includes('Pepperoni')} onChange={handleChange} />
              Pepperoni<br /></label>

            <label>
              <input data-testid="checkGreenpeppers" name='Greenpeppers' type="checkbox" checked=
                {formData.toppings.includes('Greenpeppers')} onChange={handleChange} />
              Greenpeppers<br /></label>

            <label>
              <input data-testid="checkPineapple" name='Pineapple' type="checkbox" checked=
                {formData.toppings.includes('Pineapple')} onChange={handleChange} />
              Pineapple<br /></label>

            <label>
              <input data-testid="checkMushrooms" name='Mushrooms' type="checkbox" checked=
                {formData.toppings.includes('Mushrooms')} onChange={handleChange} />
              Mushrooms<br /></label>

            <label>
              <input data-testid="checkHam" name='Ham' type="checkbox" checked=
                {formData.toppings.includes('Ham')} onChange={handleChange} />
              Ham<br /></label>
          </div>
          <input data-testid="submit" type="submit" />
        </form>
        )
}
}
 */}
