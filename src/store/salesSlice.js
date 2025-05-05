import { createSlice } from '@reduxjs/toolkit';
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    sales: [],
    currentSaleGroup: [],
  },
  reducers: {
    addSaleGroup: (state, action) => {
      const timestamp = new Date().toISOString();
      const groupId = crypto.randomUUID();
      const salesWithMetadata = action.payload.sales.map(sale => ({
        ...sale,
        timestamp,
        id: crypto.randomUUID(),
        groupId,
      }));
      
      state.sales.push({
        groupId,
        groupName: action.payload.groupName,
        timestamp,
        sales: salesWithMetadata,
        totalAmount: salesWithMetadata.reduce(
          (sum, sale) => sum + (sale.price * sale.quantity * (1 - sale.discount / 100)),
          0
        ),
      });
      state.currentSaleGroup = [];
    },
    addToCurrentGroup: (state, action) => {
      state.currentSaleGroup.push({
        ...action.payload,
        tempId: crypto.randomUUID(),
      });
    },
    removeFromCurrentGroup: (state, action) => {
      state.currentSaleGroup = state.currentSaleGroup.filter(
        sale => sale.tempId !== action.payload
      );
    },
    deleteSaleGroup: (state, action) => {
      state.sales = state.sales.filter(group => group.groupId !== action.payload);
    },
  },
});

export const {
  addSaleGroup,
  addToCurrentGroup,
  removeFromCurrentGroup,
  deleteSaleGroup,
} = salesSlice.actions;
export default salesSlice.reducer;