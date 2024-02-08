// pages/subscription.js
"use client";
import Link from "next/link";
import React from "react";

function Subscription() {
  return (
    <div className="max-w-[800px] mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Subscription Program</h1>

      <p className="text-lg mb-6">
        Welcome to JPDL-GOODS Subscription Program! 🎉 Our Subscription Program
        is designed to make your shopping experience more convenient and
        cost-effective. When you subscribe to your favorite products,
        you&apos;ll enjoy the following benefits:
      </p>

      <h2 className="text-2xl font-bold mb-2">
        What is the Subscription Program?
      </h2>
      <ul className="list-disc pl-8 mb-6">
        <li>
          Regular Deliveries: Receive your chosen products on a monthly basis
          without the need to reorder.
        </li>
        <li>
          Exclusive Discounts: Subscribers enjoy special discounts and
          promotions on selected items.
        </li>
        <li>
          Flexibility: You have the flexibility to customize, skip, or cancel
          your subscription at any time. We&apos;re here to adapt to your needs.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-2">How it Works</h2>
      <ol className="list-decimal pl-8 mb-6">
        <li>
          Choose Your Products: Select the items you love and want to subscribe
          to. Look for the &apos;Subscribe & Save&apos; option on eligible
          products.
        </li>
        <li>
          Delivery Frequency: We offer <b>EXCLUSIVELY</b> monthly subscription
          plans.
        </li>
        <li>
          Save with Exclusive Discounts: Subscribers unlock exclusive discounts
          on their chosen products, giving you the best value for your money.
        </li>
        <li>
          Automatic Payments: Your subscription will be automatically renewed
          each month, and you&apos;ll be billed accordingly.
        </li>
      </ol>

      <h2 className="text-2xl font-bold mb-2">Manage Your Subscription</h2>
      <p className="text-lg mb-4">
        Managing your subscription is easy! Log in to your account to:
      </p>
      <ul className="list-disc pl-8 mb-6">
        <li>Customize Products: Add or remove items from your subscription.</li>
        {/* <li>
          Adjust Delivery Frequency: Change how often you receive your products.
        </li> */}
        <li>
          Skip Deliveries: Going on vacation? No worries! Skip upcoming
          deliveries with a click.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
      <div className="mb-4">
        <p className="text-lg font-semibold mb-1">
          Q: Can I cancel my subscription at any time?
        </p>
        <p>
          A: Absolutely! You have full control over your subscription. Cancel
          anytime without any hidden fees.
        </p>
      </div>

      <div className="mb-4">
        <p className="text-lg font-semibold mb-1">
          Q: How do I update my billing information?
        </p>
        <p>
          A: Simply log in to your account and update your payment details under
          the &apos;Subscription&apos; section.
        </p>
      </div>

      <div className="mb-4">
        <p className="text-lg font-semibold mb-1">
          Q: Is there a minimum commitment period?
        </p>
        <p>
          A: No, there&apos;s no minimum commitment. You&apos;re free to cancel
          or modify your subscription whenever you need to.
        </p>
      </div>

      <p className="text-lg mb-6">
        Ready to enjoy the benefits of our Subscription Program?{" "}
        {/* <Link href="/">
          <a className="text-orange-500 underline hover:text-orange-700">
            Click here
          </a>
        </Link>{" "} */}
        to explore our products and subscribe to a product today!
      </p>

      <p className="text-lg">Happy shopping! 🛍️</p>
    </div>
  );
}

export default Subscription;
