import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postOrder } from '../state/pizzaFormSlice';

const PizzaForm = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.pizzaOrder.status);
  const error = useSelector((state) => state.pizzaOrder.error);

  const [fullName, setFullName] = useState('');
  const [size, setSize] = useState('');
  const [toppings, setToppings] = useState([]);

  const toggleTopping = (toppingId) => {
    setToppings((prev) =>
      prev.includes(toppingId) ? prev.filter((t) => t !== toppingId) : [...prev, toppingId])
  };


const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(
    postOrder({
      fullName,
      size,
      toppings,
    })
  );
};

return (
  <form>
    <input
      data-testid="fullNameInput"
      placeholder="Enter your full name"
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
    />

    <select
      data-testid="sizeSelect"
      value={size}
      onChange={(e) => setSize(e.target.value)}
      >
      <option value="">Select a size</option>
      <option value="S">S</option>
      <option value="M">M</option>
      <option value="L">L</option>
    </select>

    <label>
      <input
        type="checkbox"
        data-testid="checkPepperoni"
        onChange={() => toggleTopping('1')}
      />
      Pepperoni
    </label>

    <label>
      <input
        type="checkbox"
        data-testid="checkGreenpeppers"
        onChange={() => toggleTopping('2')}
      />
      Green Peppers
    </label>

    <label>
      <input
        type="checkbox"
        data-testid="checkPineapple"
        onChange={() => toggleTopping('3')}
      />
      Pineapple
    </label>

    <label>
      <input
        type="checkbox"
        data-testid="checkMushrooms"
        onChange={() => toggleTopping('4')}
      />
      Mushrooms
    </label>

    <label>
      <input
        type="checkbox"
        data-testid="checkHam"
        onChange={() => toggleTopping('5')}
      />
      Ham
    </label>

    <button data-testid="submit" onClick={handleSubmit}>
      Submit
    </button>

    {status === 'loading' && <p>Order in progress</p>}
    {error && <p>{error}</p>}
  </form>
);
}



export default PizzaForm;


// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateFormField, postOrder } from '../state/pizzaFormSlice';

// const PizzaForm = () => {
//   const dispatch = useDispatch();
//   const { fullName, size, toppings, loading, error, success } = useSelector((state) => state.pizzaOrderForm);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     dispatch(updateFormField({ field: name, value }));
//   };

//   const handleToppingChange = (e) => {
//     const { name, checked } = e.target;
//     dispatch(updateFormField({ field: 'toppings', value: { ...toppings, [name]: checked } }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const orderData = { 
//       fullName, 
//       size, 
//       toppings: Object.keys(toppings).filter((key) => toppings[key]) 
//     };
//     dispatch(postOrder(orderData))
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Pizza Form</h2>
//       {loading && <div>Order in progress...</div>}
//       {error && <div style={{ color: 'red' }}>{error}</div>}
//       {success && <div style={{ color: 'green' }}>Order placed successfully!</div>}

//       <div className="input-group">
//         <label htmlFor="fullName">Full Name</label><br />
//         <input
//           data-testid="fullNameInput"
//           id="fullName"
//           name="fullName"
//           placeholder="Type full name"
//           type="text"
//           value={fullName}
//           onChange={handleInputChange}
//         />
//       </div>

//       <div className="input-group">
//         <label htmlFor="size">Size</label><br />
//         <select data-testid="sizeSelect" id="size" name="size" value={size} onChange={handleInputChange}>
//           <option value="">----Choose size----</option>
//           <option value="S">Small</option>
//           <option value="M">Medium</option>
//           <option value="L">Large</option>
//         </select>
//       </div>

//       <div className="input-group">
//         <label>
//           <input data-testid="checkPepperoni" name="1" type="checkbox" checked={toppings['1'] || false} onChange={handleToppingChange} />
//           Pepperoni<br />
//         </label>
//         <label>
//           <input data-testid="checkGreenpeppers" name="2" type="checkbox" checked={toppings['2'] || false} onChange={handleToppingChange} />
//           Green Peppers<br />
//         </label>
//         <label>
//           <input data-testid="checkPineapple" name="3" type="checkbox" checked={toppings['3'] || false} onChange={handleToppingChange} />
//           Pineapple<br />
//         </label>
//         <label>
//           <input data-testid="checkMushrooms" name="4" type="checkbox" checked={toppings['4'] || false} onChange={handleToppingChange} />
//           Mushrooms<br />
//         </label>
//         <label>
//           <input data-testid="checkHam" name="5" type="checkbox" checked={toppings['5'] || false} onChange={handleToppingChange} />
//           Ham<br />
//         </label>
//       </div>

//       <div>
//         <button data-testid="submit" type="submit" disabled={loading}>
//           Submit
//         </button>
//       </div>
//     </form>
//   );
// };

// export default PizzaForm;
