"use client";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { FaArrowLeft, FaEnvelope } from "react-icons/fa";

const VerificationEmailSentPage = () => {
  const router = useRouter();
  const handleOpenGmail = () => {
    router.push("mailto:?subject=Subject&body=Body&cc=&bcc=&app=gmail");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full flex items-center justify-center flex-col">
        <div className="flex items-center justify-center mb-4 text-green-500">
          <FaEnvelope className="text-4xl mr-2" />
          <span className="text-xl font-semibold">
            Verification Email Sent!
          </span>
        </div>
        <p className="text-gray-700 text-center mb-6">
          We&apos;ve sent a verification email to your email address. Please
          check your inbox and click on the verification link to complete the
          registration process.
        </p>
        <button
          className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={() => handleOpenGmail()}
        >
          Open Gmail App
        </button>
        <span
          className="flex items-center mt-5 cursor-pointer"
          onClick={() => router.push("/register")}
        >
          <FaArrowLeft />
          <p>Go to Signup</p>
        </span>
      </div>
    </div>
  );
};

export default VerificationEmailSentPage;
