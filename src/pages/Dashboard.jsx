// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { format, startOfDay, endOfDay, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
// import { DateRangePicker } from '../components/DateRangePicker';

// export default function Dashboard() {
//   const [timeframe, setTimeframe] = useState('daily');
//   const [dateRange, setDateRange] = useState([new Date(), new Date()]);
//   const sales = useSelector((state) => state.sales.sales);
//   const products = useSelector((state) => state.products.products);

//   const getFilteredSales = () => {
//     const [start, end] = dateRange;
//     let startDate, endDate;

//     switch (timeframe) {
//       case 'daily':
//         startDate = startOfDay(new Date());
//         endDate = endOfDay(new Date());
//         break;
//       case 'monthly':
//         startDate = startOfMonth(new Date());
//         endDate = endOfMonth(new Date());
//         break;
//       case 'yearly':
//         startDate = startOfYear(new Date());
//         endDate = endOfYear(new Date());
//         break;
//       case 'custom':
//         startDate = startOfDay(start);
//         endDate = endOfDay(end);
//         break;
//       default:
//         startDate = startOfDay(new Date());
//         endDate = endOfDay(new Date());
//     }

//     return sales.filter(
//       (sale) =>
//         new Date(sale.timestamp) >= startDate &&
//         new Date(sale.timestamp) <= endDate
//     );
//   };

//   const filteredSales = getFilteredSales();
//   const totalRevenue = filteredSales.reduce(
//     (sum, sale) => sum + sale.price * (1 - sale.discount / 100),
//     0
//   );

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-white">Dashboard</h1>
//         <div className="flex space-x-4">
//           <select
//             value={timeframe}
//             onChange={(e) => setTimeframe(e.target.value)}
//             className="bg-gray-700 text-white rounded-lg px-4 py-2"
//           >
//             <option value="daily">Daily</option>
//             <option value="monthly">Monthly</option>
//             <option value="yearly">Yearly</option>
//             <option value="custom">Custom</option>
//           </select>
//           {timeframe === 'custom' && (
//             <DateRangePicker
//               dateRange={dateRange}
//               onChange={setDateRange}
//             />
//           )}
//         </div>
//       </div>

//       <div className="bg-gray-800 rounded-lg p-6">
//         <h2 className="text-xl font-bold text-white mb-4">
//           Total Revenue: ${totalRevenue.toFixed(2)}
//         </h2>
//         <div className="overflow-x-auto">
//           <table className="w-full text-white">
//             <thead>
//               <tr className="border-b border-gray-700">
//                 <th className="text-left py-2">Date</th>
//                 <th className="text-left py-2">Product</th>
//                 <th className="text-left py-2">Price</th>
//                 <th className="text-left py-2">Discount</th>
//                 <th className="text-left py-2">Final Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredSales.map((sale) => (
//                 <tr key={sale.id} className="border-b border-gray-700">
//                   <td className="py-2">
//                     {format(new Date(sale.timestamp), 'MM/dd/yyyy')}
//                   </td>
//                   <td className="py-2">
//                     {products.find((p) => p.id === sale.productId)?.name}
//                   </td>
//                   <td className="py-2">${sale.price.toFixed(2)}</td>
//                   <td className="py-2">{sale.discount}%</td>
//                   <td className="py-2">
//                     ${(sale.price * (1 - sale.discount / 100)).toFixed(2)}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { format, startOfDay, endOfDay, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { DateRangePicker } from '../components/DateRangePicker';

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState('daily');
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [expandedGroups, setExpandedGroups] = useState(new Set());
  const sales = useSelector((state) => state.sales.sales);
  const products = useSelector((state) => state.products.products);

  const toggleGroup = (groupId) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const getFilteredSales = () => {
    const [start, end] = dateRange;
    let startDate, endDate;

    switch (timeframe) {
      case 'daily':
        startDate = startOfDay(new Date());
        endDate = endOfDay(new Date());
        break;
      case 'monthly':
        startDate = startOfMonth(new Date());
        endDate = endOfMonth(new Date());
        break;
      case 'yearly':
        startDate = startOfYear(new Date());
        endDate = endOfYear(new Date());
        break;
      case 'custom':
        startDate = startOfDay(start);
        endDate = endOfDay(end);
        break;
      default:
        startDate = startOfDay(new Date());
        endDate = endOfDay(new Date());
    }

    return sales.filter(
      (group) =>
        new Date(group.timestamp) >= startDate &&
        new Date(group.timestamp) <= endDate
    );
  };

  const filteredSales = getFilteredSales();
  const totalRevenue = filteredSales.reduce((sum, group) => sum + group.totalAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="flex space-x-4">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-gray-700 text-white rounded-lg px-4 py-2"
          >
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="custom">Custom</option>
          </select>
          {timeframe === 'custom' && (
            <DateRangePicker dateRange={dateRange} onChange={setDateRange} />
          )}
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">
          Total Revenue: ${totalRevenue.toFixed(2)}
        </h2>
        <div className="space-y-4">
          {filteredSales.map((group) => (
            <div key={group.groupId} className="border border-gray-700 rounded-lg">
              <div
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-700"
                onClick={() => toggleGroup(group.groupId)}
              >
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {group.groupName}
                  </h3>
                  <p className="text-gray-400">
                    {format(new Date(group.timestamp), 'MM/dd/yyyy HH:mm')} - 
                    Total: ${group.totalAmount.toFixed(2)}
                  </p>
                </div>
                {expandedGroups.has(group.groupId) ? (
                  <ChevronUpIcon className="h-5 w-5 text-white" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-white" />
                )}
              </div>
              
              {expandedGroups.has(group.groupId) && (
                <div className="p-4 border-t border-gray-700">
                  <table className="w-full text-white">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-2">Product</th>
                        <th className="text-left py-2">Price</th>
                        <th className="text-left py-2">Discount</th>
                        <th className="text-left py-2">Final Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.sales.map((sale) => (
                        <tr key={sale.id} className="border-b border-gray-700">
                          <td className="py-2">
                            {products.find((p) => p.id === sale.productId)?.name}
                          </td>
                          <td className="py-2">${sale.price.toFixed(2)}</td>
                          <td className="py-2">{sale.discount}%</td>
                          <td className="py-2">
                            ${(sale.price * (1 - sale.discount / 100)).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
