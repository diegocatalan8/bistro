"use client"
import React, { useContext } from "react";

export const OrderContext = React.createContext(null);

export function useOrderContext() {
  const { localRouteOrder, setLocalRouteOrder } = useContext(OrderContext);
  return { localRouteOrder, setLocalRouteOrder };
}

export function OrderProvider({ children }) {
  const [localRouteOrder, setLocalRouteOrder] = React.useState({createOrder:true, cartOrder:false});

  return (
    <OrderContext.Provider value={{ localRouteOrder, setLocalRouteOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
