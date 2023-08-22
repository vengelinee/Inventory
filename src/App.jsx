import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const PRODUCTS = [
  { category: "Fruits", price: "$3", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: true, name: "Passionfruit" },
  { category: "Fruits", price: "$2", stocked: true, name: "Pineapple" },
  { category: "Fruits", price: "$2", stocked: true, name: "Lemon" },
  { category: "Fruits", price: "$2", stocked: false, name: "Avocado" },
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
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
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
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar() {
  return (
    <form>
      <input type="text" class="border border-gray-30 text-m rounded-xl pl-5 p-2.5 w-full mb-3" placeholder="Search ..."/> 
        
      <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4"/>
      <label for="bordered-checkbox-1" class="w-full py-4 ml-2 text-m font-regular">Only show products in stock</label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  return (
    <div class="flex w-full flex-col rounded-3xl min-w-450px max-w-lg border-2 border-sky-600 p-10">
      <SearchBar />
      <ProductTable products={products} />
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
