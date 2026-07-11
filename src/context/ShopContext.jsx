import { createContext, useEffect, useState } from "react";
import { products } from "../../assets/frontend_assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cartItems');
            return savedCart ? JSON.parse(savedCart) : {};
        } catch {
            return {};
        }
    });
    const [orders, setOrders] = useState(() => {
        try {
            const savedOrders = localStorage.getItem('orders');
            return savedOrders ? JSON.parse(savedOrders) : [];
        } catch {
            return [];
        }
    });
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('user');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const addToCart = (productId, size) => {
        setCartItems((currentItems) => ({
            ...currentItems,
            [productId]: {
                ...currentItems[productId],
                [size]: (currentItems[productId]?.[size] || 0) + 1
            }
        }));
    }

    const getCartCount = () => Object.values(cartItems).reduce(
        (total, sizes) => total + Object.values(sizes).reduce(
            (sizeTotal, quantity) => sizeTotal + quantity,
            0
        ),
        0
    );

    const updateCartQuantity = (productId, size, quantity) => {
        setCartItems((currentItems) => {
            const nextItems = { ...currentItems };
            const nextSizes = { ...nextItems[productId] };

            if (quantity <= 0) {
                delete nextSizes[size];
            } else {
                nextSizes[size] = quantity;
            }

            if (Object.keys(nextSizes).length === 0) {
                delete nextItems[productId];
            } else {
                nextItems[productId] = nextSizes;
            }

            return nextItems;
        });
    }

    const removeFromCart = (productId, size) => {
        updateCartQuantity(productId, size, 0);
    }

    const getCartSubtotal = () => Object.entries(cartItems).reduce(
        (total, [productId, sizes]) => {
            const product = products.find((item) => item._id === productId);
            if (!product) return total;

            const productQuantity = Object.values(sizes).reduce(
                (sum, quantity) => sum + quantity,
                0
            );
            return total + product.price * productQuantity;
        },
        0
    );

    const placeOrder = ({ customer, paymentMethod }) => {
        const orderItems = Object.entries(cartItems).flatMap(([productId, sizes]) => {
            const product = products.find((item) => item._id === productId);
            if (!product) return [];

            return Object.entries(sizes)
                .filter(([, quantity]) => quantity > 0)
                .map(([size, quantity]) => ({
                    productId,
                    name: product.name,
                    image: product.image[0],
                    price: product.price,
                    size,
                    quantity
                }));
        });

        if (orderItems.length === 0) return null;

        const subtotal = getCartSubtotal();
        const order = {
            id: `ORD-${Date.now().toString().slice(-8)}`,
            date: new Date().toISOString(),
            status: 'Order placed',
            customer,
            paymentMethod,
            items: orderItems,
            subtotal,
            delivery: delivery_fee,
            total: subtotal + delivery_fee
        };

        setOrders((currentOrders) => [order, ...currentOrders]);
        setCartItems({});
        return order;
    };

    const loginUser = ({ name, email }) => {
        const nextUser = { name: name || email.split('@')[0], email };
        setUser(nextUser);
        return nextUser;
    };

    const logoutUser = () => setUser(null);

     const value = {
            products , currency , delivery_fee,
            search,setSearch,showSearch,setShowSearch,
            cartItems,setCartItems,addToCart,getCartCount,
            updateCartQuantity,removeFromCart,getCartSubtotal,
            orders,placeOrder,user,loginUser,logoutUser
     }

     return (
        <ShopContext.Provider value={value}>
               {props.children}
        </ShopContext.Provider>
     )
}

export default ShopContextProvider;
