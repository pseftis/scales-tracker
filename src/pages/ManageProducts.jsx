import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addProduct,
  updateProduct,
  deleteProduct,
} from '../store/productsSlice';

export default function ManageProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;

    dispatch(
      addProduct({
        name: newProduct.name,
        price: parseFloat(newProduct.price),
      })
    );

    setNewProduct({ name: '', price: '' });
  };

  const handleEditProduct = (product) => {
    setIsEditing(true);
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
    });
  };

  const handleUpdateProduct = () => {
    dispatch(
      updateProduct({
        id: editingProduct.id,
        name: newProduct.name,
        price: parseFloat(newProduct.price),
      })
    );

    setIsEditing(false);
    setEditingProduct(null);
    setNewProduct({ name: '', price: '' });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Manage Products</h1>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            placeholder="Product Name"
            className="bg-gray-700 text-white rounded-lg px-4 py-2"
          />

          <input
            type="number"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            placeholder="Price"
            className="bg-gray-700 text-white rounded-lg px-4 py-2"
          />

          <button
            onClick={isEditing ? handleUpdateProduct : handleAddProduct}
            className="bg-lime-500 text-white rounded-lg px-4 py-2"
          >
            {isEditing ? 'Update Product' : 'Add Product'}
          </button>
        </div>

        <div className="mt-6">
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Price</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-700">
                  <td className="py-2">{product.name}</td>
                  <td className="py-2">${product.price.toFixed(2)}</td>
                  <td className="py-2 space-x-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-blue-500 hover:text-blue-400"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => dispatch(deleteProduct(product.id))}
                      className="text-red-500 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}