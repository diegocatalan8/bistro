'use client'
import React, { useContext } from "react";

export const OrderIdContext = React.createContext(null);

export function useOrderIdContext() {
  const { orderId, setOrderId } = useContext(OrderIdContext);
  return { orderId, setOrderId };
}

export function OrderIdProvider({ children }) {
  const [orderId, setOrderId] = React.useState(null);

  return (
    <OrderIdContext.Provider value={{orderId, setOrderId}}>
      {children}
    </OrderIdContext.Provider>
  );
}
