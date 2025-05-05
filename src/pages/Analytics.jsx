import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import { DateRangePicker } from '../components/DateRangePicker';

export default function Analytics() {
  const [dateRange, setDateRange] = useState([
    startOfMonth(new Date()),
    endOfMonth(new Date()),
  ]);
  
  const sales = useSelector((state) => state.sales.sales);
  const products = useSelector((state) => state.products.products);

  const filteredSales = sales.filter(group => 
    isWithinInterval(new Date(group.timestamp), {
      start: dateRange[0],
      end: dateRange[1]
    })
  );

  const getProductSales = () => {
    const productSales = {};
    filteredSales.forEach((group) => {
      group.sales.forEach((sale) => {
        const product = products.find((p) => p.id === sale.productId);
        if (product) {
          if (!productSales[product.id]) {
            productSales[product.id] = {
              name: product.name,
              revenue: 0,
              quantity: 0,
            };
          }
          productSales[product.id].revenue +=
            sale.price * sale.quantity * (1 - sale.discount / 100);
          productSales[product.id].quantity += sale.quantity;
        }
      });
    });
    return Object.values(productSales);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  const productSalesData = getProductSales();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <DateRangePicker dateRange={dateRange} onChange={setDateRange} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Revenue by Product
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productSalesData}>
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#82ca9d" name="Revenue ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Sales Quantity Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productSalesData}
                dataKey="quantity"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {productSalesData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}