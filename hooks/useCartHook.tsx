import { BASE_URL } from "@/api/auth/apis";
import { cartProductType } from "@/app/product/[productId]/ProductDetails";
import { wishProductType } from "@/app/wishlist/ItemContent";
import axios from "axios";
import { AnyRecord } from "dns";
import { useRouter } from "next/navigation";
import { AnyNode } from "postcss";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";

//create the context and pass the value you want to be accessible to all component

interface SignUpTypes {
  first_name: string;
  last_name: string;
  password: string;
  email: string;
}
interface SignInTypes {
  password: string;
  email: string;
}

type cartContextType = {
  userData: any | null;
  isAdmin: any | null;
  userToken: string | null;
  cartTotalQty: number;
  wishTotalQty: number;
  cartTotalAmount: number;
  wishTotalAmount: number;
  cartProducts: cartProductType[] | null;
  wishProducts: cartProductType[] | null;
  userOrders: any[];
  userSubs: any[];
  handleAddProductToCart: (product: cartProductType, token: any) => void;
  handleAddProductToWish: (product: cartProductType, token: any) => void;
  handleRemoveProductFromCart: (product: cartProductType, token: any) => void;
  handleRemoveProductFromWish: (product: wishProductType, token: any) => void;
  handleCartQtyIncrease: (product: cartProductType) => void;
  handleCartQtyDecrease: (product: cartProductType) => void;
  handleClearCart: (token: any) => void;
  handleClearWish: (token: any) => void;
  handleLogOut: () => void;
  handleSignUp: (formData: SignUpTypes) => void;
  handleSignIn: (formData: SignInTypes) => void;
  fetchUserProducts: (token: any) => void;
};
export const cartContext = createContext<cartContextType | null>(null);

// create a provider for the context
interface PropsType {
  [propName: string]: any;
}

export const CartContextProvider = (props: PropsType) => {
  const [userData, setUserData] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  const router = useRouter();

  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [wishTotalQty, setWishTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [wishTotalAmount, setWishTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<cartProductType[] | null>(
    null
  );
  const [wishProducts, setWishProducts] = useState<cartProductType[] | null>(
    null
  );
  const [userOrders, setUserOrders] = useState<any | null>(null);
  const [userSubs, setUserSubs] = useState<any | null>(null);

  const handleSignUp = useCallback(async (formData: SignUpTypes) => {
    try {
      const req = await axios.post(`${BASE_URL}/onboard`, formData);
      toast.success(req.data.message);
      const res = req.data;
      setUserData(res);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }, []);

  const handleSignIn = useCallback(async (formData: SignInTypes) => {
    try {
      const req = await axios.post(`${BASE_URL}/auth`, formData);
      const res = req.data;
      const Token = req?.data?.data?.token;
      setUserToken(Token);
      setUserData(res);
      localStorage.setItem("user", Token);
      fetchUserProducts(Token);

      const adminStatus = await checkAdminStatus(Token);
      const encryptedAdminStatus = btoa(adminStatus);

      localStorage.setItem("isAdmin", encryptedAdminStatus);
      setIsAdmin(adminStatus);
      toast.success("Logged in succefully!");
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw new Error();
    }
  }, []);

  const checkAdminStatus = async (token: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/get`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response, "jsdfksdfjasdfsadkjfksd");

      const isAdmin = response.data.data.isAdmin;
      return isAdmin;
    } catch (error) {
      // Handle error fetching admin status
      console.error("Error checking admin status", error);
    }
  };

  const handleLogOut = () => {
    setUserData(null);
    setUserToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    toast.success("Logged out succefully!");
    router.push("/");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("user");

    if (storedToken) {
      fetchUserProducts(storedToken);
    }
  }, []);

  const fetchUserProducts = async (Token: any) => {
    try {
      const res = await axios.get(`${BASE_URL}/get`, {
        headers: {
          Authorization: Token,
        },
      });

      // const wishResponse = await axios.get('${BASE_URL}/wishlist', {
      //   headers: {
      //     'Authorization': userToken,
      //   },
      // });
      const cartItems: cartProductType[] | null = await res.data.data
        .cart_items;
      const wishItems: cartProductType[] | null = await res.data.data
        .favourites;
      const orders: any[] | null = await res.data.data.orders;
      const subs: any[] | null = await res.data.data.subscriptions;

      setCartProducts(cartItems);
      setWishProducts(wishItems);
      setUserOrders(orders);
      setUserSubs(subs);

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("wishItems", JSON.stringify(wishItems));
    } catch (error) {
      console.error("Error fetching cart items", error);
      toast.error("Error fetching cart items");
    }
  };

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (accumulator, item) => {
            const itemTotal = item.price * item.quantity;

            accumulator.total += itemTotal;

            accumulator.qty += item.quantity;

            return accumulator;
          },
          { total: 0, qty: 0 }
        );
        setCartTotalQty(qty);
        setCartTotalAmount(total);
      }
      if (wishProducts) {
        const { total, qty } = wishProducts?.reduce(
          (accumulator, item) => {
            const itemTotal = item.price * item.quantity;

            accumulator.total += itemTotal;

            accumulator.qty += item.quantity;

            return accumulator;
          },
          { total: 0, qty: 0 }
        );
        setWishTotalQty(qty);
        setWishTotalAmount(total);
      } else {
        // If wishProducts is null or undefined, set wishTotalQty and wishTotalAmount to 0
        setWishTotalQty(0);
        setWishTotalAmount(0);
      }
    };
    getTotals();
  }, [cartProducts]);

  const handleAddProductToCart = useCallback(
    async (product: cartProductType, token: any) => {
      try {
        // Make a request to your server API to add the product to the user's cart
        await axios.put(`${BASE_URL}/product/cart/add`, [product], {
          headers: {
            Authorization: token,
          },
        });
        // Update the local state and storage
        setCartProducts((prev) => {
          let updatedCart;
          if (prev) {
            updatedCart = [...prev, product];
          } else {
            updatedCart = [product];
          }
          toast.success("Items added to cart!");
          localStorage.setItem("cartItems", JSON.stringify(updatedCart));
          return updatedCart;
        });
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
    []
  );

  const handleAddProductToWish = useCallback(
    async (product: cartProductType, token: any) => {
      try {
        await axios.put(
          `${BASE_URL}/product/wish-list/add/${product.id}`,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setWishProducts((prev) => {
          let updateWish;
          if (prev) {
            updateWish = [...prev, product];
          } else {
            updateWish = [product];
          }
          toast.success("Items added to wishlist!");
          localStorage.setItem("wishItems", JSON.stringify(updateWish));
          return updateWish;
        });
      } catch (error: any) {
        console.error("Error adding product to wish list", error);
        toast.error(error.response.data.message || error.message);
      }
    },
    []
  );

  const handleRemoveProductFromCart = useCallback(
    async (product: cartProductType, token: any) => {
      try {
        await axios.put(
          `${BASE_URL}/product/cart/remove?productID=${product.id}`,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );
      } catch (error: any) {}
      if (cartProducts) {
        const filteredProduct = cartProducts.filter((item) => {
          return item.id !== product.id;
        });
        setCartProducts(filteredProduct);
        toast.success("products removed from cart!");
        localStorage.setItem("cartItems", JSON.stringify(filteredProduct));
      }
    },
    [cartProducts]
  );

  const handleRemoveProductFromWish = useCallback(
    async (product: wishProductType, token: any) => {
      try {
        await axios.put(
          `${BASE_URL}/product/wish-list/remove/${product.id}`,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );
      } catch (error: any) {}
      if (wishProducts) {
        const filteredProduct = wishProducts.filter((item) => {
          return item.id !== product.id;
        });
        setWishProducts(filteredProduct);
        toast.success("products removed from wish!");
        localStorage.setItem("wishItems", JSON.stringify(filteredProduct));
      }
    },
    [wishProducts]
  );

  const handleCartQtyIncrease = useCallback(
    (product: cartProductType) => {
      let updatedCart;
      if (product.quantity === 99) {
        return toast.error("Oops maximum reached");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingProductIndex = updatedCart.findIndex(
          (item) => item.id === product.id
        );
        if (existingProductIndex > -1) {
          updatedCart[existingProductIndex].quantity += 1;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleCartQtyDecrease = useCallback(
    (product: cartProductType) => {
      let updatedCart;
      if (product.quantity === 1) {
        return toast.error("Oops minimum reached");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingProductIndex = updatedCart.findIndex(
          (item) => item.id === product.id
        );
        if (existingProductIndex > -1) {
          updatedCart[existingProductIndex].quantity -= 1;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(
    async (token: any) => {
      try {
        const res = await axios.put(
          `${BASE_URL}/product/cart/remove?clearAll=${true}`,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (res.status) {
          setCartProducts(null);
          setCartTotalQty(0);
          localStorage.removeItem("cartItems");
        } else {
          toast.error("Failed to clear cart. Please try again.");
        }
      } catch (error: any) {
        console.error("Error clearing cart", error);
        toast.error(error.response.data.message);
      }
    },
    [cartProducts]
  );

  const handleClearWish = useCallback(
    async (token: any) => {
      try {
        const res = await axios.put(
          `${BASE_URL}/product/wish-list/remove?clearAll=${true}`,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (res.status) {
          setWishProducts(null);
          setWishTotalQty(0);
          localStorage.removeItem("wishItems");
        } else {
          toast.error("Failed to clear wishlist. Please try again.");
        }
      } catch (error: any) {
        console.error("Error clearing wish list", error);
        toast.error(error.response.data.message);
      }
    },
    [wishProducts]
  );

  const value = {
    userData,
    userToken,

    isAdmin,
    cartTotalQty,
    wishTotalQty,
    cartTotalAmount,
    wishTotalAmount,
    cartProducts,
    wishProducts,
    userOrders,
    userSubs,
    handleAddProductToCart,
    handleAddProductToWish,
    handleRemoveProductFromCart,
    handleRemoveProductFromWish,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    handleClearWish,
    handleSignIn,
    handleSignUp,
    handleLogOut,
    fetchUserProducts,
  };
  return <cartContext.Provider value={value} {...props} />;
};

//this down part is not really neccessary it is just to send and check if the context value is empty or not and is used to access it too
export const useCart = () => {
  const context = useContext(cartContext);
  if (context === null) {
    throw new Error("useCart must be used withing a cartContext provider");
  }
  return context;
};
