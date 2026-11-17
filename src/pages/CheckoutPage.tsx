import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  User,
  ShoppingBag,
  CreditCard,
  Truck,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

import { useCart } from "../context/useCart";

type PaymentMethod = "cod" | "bkash";

const CheckoutPage = () => {
  const { cartItems } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    area: "",
    postalCode: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const deliveryCharge = subtotal >= 1000 ? 0 : 60;
  const total = subtotal + deliveryCharge;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cartItems.length === 0) return;

    // Frontend demo only.
    // Connect your backend API here later.
    console.log("Checkout Information:", {
      customer: formData,
      items: cartItems,
      paymentMethod,
      subtotal,
      deliveryCharge,
      total,
    });

    setSubmitted(true);
  };

  if (cartItems.length === 0) {
    return (
      <section className="flex min-h-[65vh] flex-col items-center justify-center px-4">
        <ShoppingBag size={55} className="text-green-600" />

        <h2 className="mt-5 text-2xl font-bold text-gray-900">
          Your cart is empty
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Add some fresh products before checkout.
        </p>

        <Link
          to="/products"
          className="mt-6 rounded-xl bg-green-700 px-7 py-3 font-bold text-white hover:bg-green-800"
        >
          Explore Products
        </Link>
      </section>
    );
  }

  if (submitted) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
          <CheckCircle2 size={65} className="mx-auto text-green-600" />

          <h2 className="mt-5 text-2xl font-extrabold text-gray-900">
            Checkout Submitted!
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Your checkout information has been collected in this frontend demo.
            No actual order has been placed yet.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-flex rounded-xl bg-green-700 px-7 py-3 font-bold text-white hover:bg-green-800"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-green-700"
          >
            <ArrowLeft size={17} />
            Back to Cart
          </Link>

          <span className="block text-sm font-bold uppercase tracking-widest text-green-600">
            Almost There!
          </span>

          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Complete your information and get fresh products delivered to your
            doorstep.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-3">
            {/* Left: Customer Information */}
            <div className="space-y-6 lg:col-span-2">
              {/* Delivery Information */}
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    <MapPin size={21} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Delivery Information
                    </h2>
                    <p className="text-xs text-gray-500">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Full Name *
                    </label>

                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Mobile Number *
                    </label>

                    <div className="relative">
                      <Phone
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        pattern="01[3-9][0-9]{8}"
                        title="Enter a valid 11-digit Bangladesh mobile number"
                        placeholder="01XXXXXXXXX"
                        className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    />
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Full Delivery Address *
                    </label>

                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={3}
                      placeholder="House number, road, village or street address..."
                      className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      District *
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Barishal"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    />
                  </div>

                  {/* Area */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Area / Upazila *
                    </label>

                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      required
                      placeholder="Enter your area"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    />
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Postal Code
                    </label>

                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="Optional"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Delivery Notes
                    </label>

                    <input
                      type="text"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Optional instructions"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    <CreditCard size={21} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Payment Method
                    </h2>
                    <p className="text-xs text-gray-500">
                      Select your preferred payment method.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Cash on Delivery */}
                  <label
                    className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                      paymentMethod === "cod"
                        ? "border-green-600 bg-green-50/70"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="h-4 w-4 accent-green-700"
                    />

                    <Truck size={24} className="text-green-700" />

                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900">
                        Cash on Delivery
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Pay when your products arrive.
                      </p>
                    </div>

                    {paymentMethod === "cod" && (
                      <CheckCircle2 className="text-green-600" size={20} />
                    )}
                  </label>

                  {/* bKash */}
                  <label
                    className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                      paymentMethod === "bkash"
                        ? "border-pink-500 bg-pink-50/50"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bkash"
                      checked={paymentMethod === "bkash"}
                      onChange={() => setPaymentMethod("bkash")}
                      className="h-4 w-4 accent-pink-600"
                    />

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-600 text-sm font-extrabold text-white">
                      b
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900">
                        bKash Payment
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Online payment (integration pending).
                      </p>
                    </div>

                    {paymentMethod === "bkash" && (
                      <CheckCircle2 className="text-pink-600" size={20} />
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
              <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                <h2 className="text-lg font-extrabold text-gray-900">
                  Your Order
                </h2>

                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                  Items
                </span>
              </div>

              {/* Products */}
              <div className="my-5 max-h-72 space-y-4 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-xl bg-gray-50 object-cover"
                      />

                      <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-700 text-[10px] font-bold text-white">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-sm font-semibold text-gray-800">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-xs text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm font-bold text-gray-900">
                      ৳{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div className="space-y-4 border-t border-gray-100 pt-5 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ৳{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-500">
                  <span>Delivery Charge</span>
                  <span className="font-semibold text-gray-900">
                    {deliveryCharge === 0 ? "FREE" : `৳${deliveryCharge}`}
                  </span>
                </div>

                {deliveryCharge === 0 && (
                  <p className="rounded-lg bg-green-50 p-2 text-xs text-green-700">
                    Congratulations! You have unlocked free delivery.
                  </p>
                )}

                <div className="flex justify-between border-t border-gray-100 pt-4 text-base font-extrabold text-gray-900">
                  <span>Grand Total</span>
                  <span className="text-xl text-green-700">
                    ৳{total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Place Order */}
              <button
                type="submit"
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 py-4 text-sm font-bold text-white shadow-lg shadow-green-700/20 transition hover:bg-green-800 hover:shadow-green-700/30 active:scale-[0.98]"
              >
                <ShoppingBag size={19} />
                Place Order
              </button>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
                <ShieldCheck size={16} className="text-green-600" />
                Secure checkout experience
              </div>

              <Link
                to="/cart"
                className="mt-5 block text-center text-xs font-semibold text-green-700 hover:underline"
              >
                Edit Shopping Cart
              </Link>
            </aside>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutPage;
