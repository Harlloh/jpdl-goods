"use client";
import { BASE_URL } from "@/api/auth/apis";
import Loading from "@/app/components/Loading";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle, FaTimes } from "react-icons/fa";

interface VerifyClientProps {
  params: {
    userId?: string;
  };
}

function VerifyClient({ params }: VerifyClientProps) {
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState("");
  const router = useRouter();
  console.log(params);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        setLoading(true);
        let res = await axios.post(`${BASE_URL}/verify/${params.userId}`);
        setIsVerified(res.data.data.isVerified);
        if (res.data.status_code === 200) {
          toast.success(res.data.message);
        }
        console.log(res);
        console.log(params);
      } catch (error) {
        toast.error("Error verifying your email address");
        console.log(error, "erorrrrrr");
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);
  if (loading) {
    return <Loading />;
  }
  const handleResendMail = () => {};
  return (
    <div>
      {isVerified ? (
        <div className="flex flex-col items-center justify-center h-screen gap-2">
          <FaCheckCircle size={150} color="teal" />
          <h3 className="text-center text-4xl font-bold mt-8">
            Account has been verified!
          </h3>
          <p className="text-center text-2xl mt-4">
            You can now login with your account.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen gap-2">
          <FaTimes color="red" size={150} />
          <h3 className="text-center text-4xl font-bold mt-8">
            Account verification failed!
          </h3>
          <p className="text-center text-2xl mt-4">
            You didn&apos;t receive any email or the link is expired.{" "}
            <span
              className="underline cursor-pointer text-orange-700"
              onClick={handleResendMail}
            >
              Resend
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default VerifyClient;
