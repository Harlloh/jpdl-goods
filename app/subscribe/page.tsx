// pages/subscription.js
import React from "react";

function Subscription() {
  return (
    <div className="max-w-2xl mx-auto my-8 p-8 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-6">
        Welcome to Our Furniture Store Subscription Service!
      </h1>

      <p className="text-lg mb-6">
        By subscribing to our service, you agree to abide by the following terms
        and conditions:
      </p>

      <ol className="list-decimal pl-6 mb-6">
        <li className="mb-4">
          <strong>Subscription Plans:</strong> We offer various subscription
          plans with different features and durations. Please select the plan
          that best suits your needs.
        </li>
        <li className="mb-4">
          <strong>Subscription Fees:</strong> Subscription fees are clearly
          outlined at the time of purchase. Fees may vary depending on the
          selected plan and any applicable discounts or promotions.
        </li>
        <li className="mb-4">
          <strong>Billing Cycle:</strong> Subscriptions are billed on a
          recurring basis according to the selected billing cycle (monthly,
          quarterly, annually, etc.). Your subscription will automatically renew
          unless you cancel it before the renewal date.
        </li>
        <li className="mb-4">
          <strong>Payment Methods:</strong> We accept major credit cards and
          other payment methods as specified on our website. Payment information
          is securely processed through our payment gateway.
        </li>
        <li className="mb-4">
          <strong>Cancellation and Refunds:</strong> You may cancel your
          subscription at any time. However, refunds are subject to our refund
          policy, which may vary depending on the circumstances. Please refer to
          our refund policy for more details.
        </li>
        <li className="mb-4">
          <strong>Changes to Subscription Plans:</strong> We reserve the right
          to modify, suspend, or discontinue any subscription plan or service at
          any time without prior notice. Any changes will be communicated to
          subscribers in advance.
        </li>
        <li className="mb-4">
          <strong>Account Responsibility:</strong> You are responsible for
          maintaining the security of your account and login credentials. Please
          notify us immediately of any unauthorized access or suspicious
          activity.
        </li>
        <li className="mb-4">
          <strong>Usage Rights:</strong> Subscriptions grant you access to our
          furniture store services and resources for personal use only.
          Redistribution or commercial use of our content is strictly
          prohibited.
        </li>
        <li className="mb-4">
          <strong>Termination:</strong> We reserve the right to terminate or
          suspend your subscription without prior notice if we suspect
          fraudulent activity, violation of our terms of service, or for any
          other reason at our discretion.
        </li>
        <li>
          <strong>Privacy Policy:</strong> Your privacy is important to us.
          Please review our privacy policy to understand how we collect, use,
          and safeguard your personal information.
        </li>
      </ol>

      <p className="text-lg mb-6">
        By subscribing to our service, you acknowledge that you have read,
        understood, and agree to comply with these Terms of Subscription. If you
        have any questions or concerns, please don’t hesitate to contact our
        customer support team.
      </p>

      <p className="text-lg">Happy subscribing! 🛋️</p>
    </div>
  );
}

export default Subscription;
