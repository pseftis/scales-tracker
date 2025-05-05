// import { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   addToCurrentGroup,
//   removeFromCurrentGroup,
//   addSaleGroup,
// } from '../store/salesSlice';

// export default function SaleEntry() {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.products.products);
//   const currentGroup = useSelector((state) => state.sales.currentSaleGroup);

//   const [selectedProduct, setSelectedProduct] = useState('');
//   const [discount, setDiscount] = useState(0);

//   const handleAddToGroup = () => {
//     if (!selectedProduct) return;

//     const product = products.find((p) => p.id === selectedProduct);
//     if (!product) return;

//     dispatch(
//       addToCurrentGroup({
//         productId: product.id,
//         price: product.price,
//         discount: parseFloat(discount),
//       })
//     );

//     // Reset form
//     setSelectedProduct('');
//     setDiscount(0);
//   };

//   const handleSubmitGroup = () => {
//     if (currentGroup.length === 0) return;
//     dispatch(addSaleGroup(currentGroup));
//   };

//   const calculateFinalPrice = (price, discountPercentage) => {
//     return price * (1 - discountPercentage / 100);
//   };

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold text-white">Sale Entry</h1>

//       <div className="bg-gray-800 rounded-lg p-6">
//         <div className="grid grid-cols-3 gap-4">
//           <select
//             value={selectedProduct}
//             onChange={(e) => setSelectedProduct(e.target.value)}
//             className="bg-gray-700 text-white rounded-lg px-4 py-2"
//           >
//             <option value="">Select Product</option>
//             {products.map((product) => (
//               <option key={product.id} value={product.id}>
//                 {product.name} - ${product.price}
//               </option>
//             ))}
//           </select>

//           <input
//             type="number"
//             min="0"
//             max="100"
//             value={discount}
//             onChange={(e) => setDiscount(e.target.value)}
//             placeholder="Discount %"
//             className="bg-gray-700 text-white rounded-lg px-4 py-2"
//           />

//           <button
//             onClick={handleAddToGroup}
//             className="bg-lime-500 text-white rounded-lg px-4 py-2"
//           >
//             Add to Group
//           </button>
//         </div>

//         {currentGroup.length > 0 && (
//           <div className="mt-6">
//             <h3 className="text-lg font-bold text-white mb-4">Current Group</h3>
//             <table className="w-full text-white">
//               <thead>
//                 <tr className="border-b border-gray-700">
//                   <th className="text-left py-2">Product</th>
//                   <th className="text-left py-2">Original Price</th>
//                   <th className="text-left py-2">Discount</th>
//                   <th className="text-left py-2">Final Price</th>
//                   <th className="text-left py-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentGroup.map((item) => {
//                   const product = products.find((p) => p.id === item.productId);
//                   return (
//                     <tr key={item.tempId} className="border-b border-gray-700">
//                       <td className="py-2">{product?.name}</td>
//                       <td className="py-2">${item.price.toFixed(2)}</td>
//                       <td className="py-2">{item.discount}%</td>
//                       <td className="py-2">
//                         ${calculateFinalPrice(item.price, item.discount).toFixed(2)}
//                       </td>
//                       <td className="py-2">
//                         <button
//                           onClick={() =>
//                             dispatch(removeFromCurrentGroup(item.tempId))
//                           }
//                           className="text-red-500 hover:text-red-400"
//                         >
//                           Remove
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>

//             <div className="mt-4 flex justify-end">
//               <button
//                 onClick={handleSubmitGroup}
//                 className="bg-lime-500 text-white rounded-lg px-6 py-2"
//               >
//                 Submit Group
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToCurrentGroup,
  removeFromCurrentGroup,
  addSaleGroup,
} from '../store/salesSlice';

export default function SaleEntry() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const currentGroup = useSelector((state) => state.sales.currentSaleGroup);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [discount, setDiscount] = useState(0);
  const [quantity, setQuantity] = useState(1); // Add quantity state
  const [groupName, setGroupName] = useState('');

  const handleAddToGroup = () => {
    if (!selectedProduct) return;

    const product = products.find((p) => p.id === selectedProduct);
    if (!product) return;

    dispatch(
      addToCurrentGroup({
        productId: product.id,
        price: product.price,
        discount: parseFloat(discount),
        quantity: parseInt(quantity, 10), // Include quantity
      })
    );

    // Reset form
    setSelectedProduct('');
    setDiscount(0);
    setQuantity(1); // Reset quantity
  };

  const handleSubmitGroup = () => {
    if (currentGroup.length === 0) return;
    if (!groupName.trim()) {
      alert('Please provide a name for this sale group');
      return;
    }

    dispatch(
      addSaleGroup({
        groupName: groupName.trim(),
        sales: currentGroup,
      })
    );

    // Reset group name
    setGroupName('');
  };

  const calculateFinalPrice = (price, discountPercentage) => {
    return price * (1 - discountPercentage / 100);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Sale Entry</h1>

      <div className="bg-gray-800 rounded-lg p-6">
        {/* Group Name Input */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter Group Name"
            className="bg-gray-700 text-white rounded-lg px-4 py-2"
          />
        </div>

        {/* Product Selection */}
        <div className="grid grid-cols-4 gap-4">
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="bg-gray-700 text-white rounded-lg px-4 py-2"
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} - ${product.price}
              </option>
            ))}
          </select>

          {/* Quantity Input */}
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            className="bg-gray-700 text-white rounded-lg px-4 py-2"
          />

          {/* Discount Input */}
          <input
            type="number"
            min="0"
            max="100"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Discount %"
            className="bg-gray-700 text-white rounded-lg px-4 py-2"
          />

          {/* Add to Group Button */}
          <button
            onClick={handleAddToGroup}
            className="bg-lime-500 text-white rounded-lg px-4 py-2"
          >
            Add to Group
          </button>
        </div>

        {/* Display Current Group */}
        {currentGroup.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-white mb-4">
              Current Group: {groupName || 'Unnamed Group'}
            </h3>
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2">Product</th>
                  <th className="text-left py-2">Quantity</th> {/* Added column */}
                  <th className="text-left py-2">Original Price</th>
                  <th className="text-left py-2">Discount</th>
                  <th className="text-left py-2">Final Price</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentGroup.map((item) => {
                  const product = products.find((p) => p.id === item.productId);
                  return (
                    <tr key={item.tempId} className="border-b border-gray-700">
                      <td className="py-2">{product?.name}</td>
                      <td className="py-2">{item.quantity}</td> {/* Display quantity */}
                      <td className="py-2">${item.price.toFixed(2)}</td>
                      <td className="py-2">{item.discount}%</td>
                      <td className="py-2">
                        $
                        {(
                          calculateFinalPrice(item.price, item.discount) *
                          item.quantity
                        ).toFixed(2)}
                      </td>
                      <td className="py-2">
                        <button
                          onClick={() =>
                            dispatch(removeFromCurrentGroup(item.tempId))
                          }
                          className="text-red-500 hover:text-red-400"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Submit Group Button */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSubmitGroup}
                className="bg-lime-500 text-white rounded-lg px-6 py-2"
              >
                Submit Group
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

