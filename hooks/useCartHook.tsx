import { cartProductType } from "@/app/product/[productId]/ProductDetails";
import { wishProductType } from "@/app/wishlist/ItemContent";
import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";

//create the context and pass the value you want to be accessible to all component

interface SignUpTypes{
  first_name:string;
  last_name:string;
  password:string;
  email:string

}
interface SignInTypes{

  password:string;
  email:string

}

type cartContextType = {
  userData: any |null,
  isAdmin: any |null,
  userToken: string |null,
  cartTotalQty: number;
  wishTotalQty: number;
  cartTotalAmount: number;
  wishTotalAmount: number;
  cartProducts: cartProductType[] | null;
  wishProducts: cartProductType[] | null;
  handleAddProductToCart: (product: cartProductType) => void;
  handleAddProductToWish: (product: cartProductType) => void;
  handleRemoveProductFromCart: (product: cartProductType) => void;
  handleRemoveProductFromWish: (product: wishProductType) => void;
  handleCartQtyIncrease: (product: cartProductType) => void;
  handleCartQtyDecrease: (product: cartProductType) => void;
  handleClearCart: () => void;
  handleClearWish: () => void;
  handleLogOut: () => void;
  handleSignUp: (formData: SignUpTypes) => void;
  handleSignIn: (formData: SignInTypes) => void;
};
export const cartContext = createContext<cartContextType | null>(null);

// create a provider for the context
interface PropsType {
  [propName: string]: any;
}

export const CartContextProvider = (props: PropsType) => {
  const [userData, setUserData] = useState(null)
  const [userToken, setUserToken] = useState(null)
  const [isAdmin, setIsAdmin] = useState(null)



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

    const handleSignUp = useCallback(async(formData:SignUpTypes)=>{
      
      try {
       const req= await axios.post('https://store-api-pyo1.onrender.com/onboard', formData)
       toast.success(req.data.message)
       const res = req.data
       setUserData(res)
       toast.success('Signed up succesfully')
      } catch (error:any) {
       toast.error('Signed up failed')

        throw new Error(error)
      }
    },[])

    const handleSignIn = useCallback(async(formData:SignInTypes)=>{
      
      try {
       const req= await axios.post('https://store-api-pyo1.onrender.com/auth', formData)
       const res = req.data
       const Token = req?.data?.data?.token;
       setUserToken(Token)
       setUserData(res)
       localStorage.setItem('user', Token)

       const adminStatus = await checkAdminStatus(Token);
       const encryptedAdminStatus = btoa(adminStatus);

       localStorage.setItem('isAdmin',encryptedAdminStatus)
       setIsAdmin(adminStatus);
       toast.success('Logged in succefully!')
      } catch (error:any) {
        toast.error('Error while logging in')
        throw new Error
      }
    },[])

    const checkAdminStatus = async (token: string) => {
      try {
        const response = await axios.get('https://store-api-pyo1.onrender.com/get', {
          headers: {
            Authorization: token,
          },
        });
        console.log(response,"jsdfksdfjasdfsadkjfksd")
  
        const isAdmin = response.data.data.isAdmin;
        return isAdmin
      } catch (error) {
        // Handle error fetching admin status
        console.error('Error checking admin status', error);
      }
    };

    const handleLogOut = () =>{
      setUserData(null);
      setUserToken(null);
      localStorage.removeItem('user');
      localStorage.removeItem('isAdmin');
      toast.success('Logged out succefully!')
    }







  useEffect(() => {
    const cartItems: any = localStorage.getItem("cartItems");
    const wishItems: any = localStorage.getItem("wishItems");
    const cProducts: cartProductType[] | null = JSON.parse(cartItems);
    const wProducts: cartProductType[] | null = JSON.parse(wishItems);

    setCartProducts(cProducts);
    setWishProducts(wProducts);
  }, []);


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

  const handleAddProductToCart = useCallback((product: cartProductType) => {
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
  }, []);

  const handleAddProductToWish = useCallback((product: cartProductType) => {
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
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: cartProductType) => {
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
    (product: wishProductType) => {
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

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    localStorage.removeItem("cartItems");
  }, [cartProducts]);

  const handleClearWish = useCallback(() => {
    setWishProducts(null);
    setWishTotalQty(0);
    localStorage.removeItem("wishItems");
  }, [wishProducts]);

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
    handleLogOut
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
