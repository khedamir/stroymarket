import { createContext, FC, ReactNode, useEffect, useMemo, useState } from 'react';

const CartContext = createContext({
  init: false,
  productsCount: 0,
  products: new Map(),
  addProduct: (id: number) => {},
  increaseProductQt: (id: number, value: number) => {},
  decreaseProductQt: (id: number, value: number) => {},
  setProductQt: (id: number, value: number) => {},
  removeProduct: (id: number) => {},
  clearCart: () => {},
});

type cartContextProps = {
  children: ReactNode;
};
export enum QT_OPERATION {
  Increase = 0,
  Decrease = 1,
  Set = 2,
}

export const CartContextProvider: FC<cartContextProps> = ({ children }) => {
  const [products, setProducts] = useState<Map<number, number>>(new Map());
  const [init, setInit] = useState<boolean>(false);

  const productsCount = useMemo<number>(() => products.size, [products]);
  //Сохраняем количество товаров в корзине в кэше и получаем его из кэша
  useEffect(() => {
    const cart = window.localStorage.getItem('cart');
    if (cart) {
      setProducts(new Map(JSON.parse(cart)));
      setInit(true);
    }
  }, []);
  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(Array.from(products.entries())));
    return () => {
      window.localStorage.removeItem('cart');
    };
  }, [products]);
  //Добавляем товар в корзину
  const addProduct = (id: number) => {
    setInit(false);
    const newMap = new Map([...products, [id, 1]]);
    setProducts(newMap);
  };
  // Обновляем количество товаров в корзине
  const updateQt = (id: number, value: number, operation: QT_OPERATION) => {
    const existingCount = products.get(id);
    if (!existingCount) {
      return;
    }
    let newCount = 0;
    switch (operation) {
      case QT_OPERATION.Decrease:
        newCount = existingCount - value;
        break;
      case QT_OPERATION.Increase:
        newCount = existingCount + value;
        break;
      case QT_OPERATION.Set:
        newCount = value;
        break;
    }
    if (newCount <= 0) {
      removeProduct(id);
      return;
    }
    const newMap = new Map([...products, [id, newCount]]);
    setProducts(new Map(newMap));
  };
  //Увеличиваем количество товаров в корзине
  const increaseProductQt = (id: number, value: number) => {
    updateQt(id, value, QT_OPERATION.Increase);
  };
  //Уменьшаем количество товаров в корзине
  const decreaseProductQt = (id: number, value: number) => {
    updateQt(id, value, QT_OPERATION.Decrease);
  };
  //Устанавливаем количество товаров в корзин
  const setProductQt = (id: number, value: number) => {
    updateQt(id, value, QT_OPERATION.Set);
  };
  //Удаляем товар из корзины
  const removeProduct = (id: number) => {
    const newMap = new Map(products);
    newMap.delete(id);
    setProducts(newMap);
  };
  //Очистка корзины
  const clearCart = () => {
    setProducts(new Map());
  };

  const value = {
    init,
    productsCount,
    products,
    addProduct: addProduct,
    increaseProductQt: increaseProductQt,
    decreaseProductQt: decreaseProductQt,
    removeProduct: removeProduct,
    setProductQt: setProductQt,
    clearCart: clearCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
