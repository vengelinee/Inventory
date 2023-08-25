import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const PRODUCTS = [
  { category: "Fruits", price: "$3", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: false, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Fruits", price: "$2", stocked: true, name: "Pineapple" },
  { category: "Fruits", price: "$2", stocked: true, name: "Lemon" },
  { category: "Fruits", price: "$4", stocked: true, name: "Kiwi" },
  { category: "Fruits", price: "$2", stocked: false, name: "Avocado" },
  { category: "Fruits", price: "$2", stocked: true, name: "Plum" },
  { category: "Fruits", price: "$8", stocked: true, name: "Watermelon" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Tomato" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Onion" },
  { category: "Vegetables", price: "$2", stocked: false, name: "Mushroom" },
  { category: "Vegetables", price: "$3", stocked: true, name: "Celery" },
  { category: "Vegetables", price: "$2", stocked: false, name: "Radish" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2"> 
        {category} 
      </th> 
    </tr> /* fruits and vegetable */
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr class="text-left">
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }

    if (inStockOnly && !product.stocked) {
      return;
    }

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) {
  return (
    <form class="mb-3">
      <input 
        type="text" 
        class="border border-gray-30 text-m rounded-xl pl-5 p-2.5 w-full mb-3" 
        value={filterText} 
        placeholder="Search ..."
        onChange={(e) => onFilterTextChange(e.target.value)} /> 
        
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
          name="bordered-checkbox" 
          class="w-4 h-4" />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div class="flex w-full flex-col rounded-3xl min-w-450px max-w-lg border-2 border-sky-600 p-10">
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable 
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

export default function App() {
  return (
    <div class="flex w-full justify-center ">
      <FilterableProductTable products={PRODUCTS} />
    </div>
  );
}
