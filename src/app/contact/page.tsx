import React from "react";
// import Header from "../Header";

const ContactUs = () => {
  return (
    <div>
      {/* <Header/> */}
    <div className="bg-black text-white py-10">
      {/* Breadcrumb */}
      <div className="text-center text-green-400">
        <p>Home &gt; Pages &gt; Contact Us</p>
      </div>

      {/* Title */}
      <h1 className="text-center text-4xl font-bold my-4 text-green-400">Contact Us</h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 md:px-4">
        {/* Contact Form */}
        <div>
          <h2 className="text-3xl font-bold text-green-400 mb-6">Let&apos;s Connect</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium">
                First name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="First name"
                className="w-full mt-1 p-2 border-2 border-green-400 rounded bg-gray-800 text-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="abc@company.com"
                className="w-full mt-1 p-2 border-2 border-green-400 rounded bg-gray-800 text-white"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone number
              </label>
              <input
                type="text"
                id="phone"
                placeholder="Phone number"
                className="w-full mt-1 p-2 border-2 border-green-400 rounded bg-gray-800 text-white"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                Description
              </label>
              <textarea
                id="message"
                placeholder="How can we help?"
                rows={4}
                className="w-full mt-1 p-2 border-2 border-green-400 rounded bg-gray-800 text-white"
              ></textarea>
            </div>
            <p className="text-xs text-gray-400">
              This site is protected by reCAPTCHA and the Google Privacy Policy and
              Terms of Service apply.
            </p>
            <button
              type="submit"
              className="w-full bg-green-400 text-gray-900 font-bold py-2 rounded-md mt-2"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="flex items-center justify-center">
          <img 
            src="/contact.jpg"
            alt="Team Photo"
            className="rounded-md w-full h-auto"
          />
        </div>
      </div>
    </div>
    </div>

  );
};

export default ContactUs;
{/* "https://gaming-workdo.myshopify.com/cdn/shop/files/about-info-img3.png?v=1721795867"*/}