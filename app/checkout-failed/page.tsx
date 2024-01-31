"use client"
import { useRouter } from "next/navigation"
import Button from "../components/Button"
import NullData from "../components/NullData"
import Container from "../components/Container"
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"

const CheckoutFailed = () => {
  const router = useRouter()
    return (
        <Container>
        <div className="w-25 flex justify-between items-center flex-col m-auto mt-11 gap-2" style={{width:'25%'}}>
            <FaTimesCircle color="red" size={250}/>
        <h1>Order failed</h1>
        <Button lable="Go back to cart" handleClick={()=> router.push('/cart')} outline/>
        </div>
        </Container>
        )
}
export default CheckoutFailed