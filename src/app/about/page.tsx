import React from "react";

// import Header from "../Header";

const AboutUs = () => {
  return (
    <div>
      {/* <Header/> */}
    
    <div className="bg-black text-green-500 py-10">
      {/* Breadcrumb */}
      <div className="text-center">
        <p className="text-green-400">Home &gt; Pages &gt; About Us</p>
      </div>

      {/* Title */}
      <h1 className="text-center text-4xl font-bold my-4 text-white">About Us</h1>

      {/* Statistics */}
      <div className="flex justify-center gap-10 my-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">400+</h2>
          <p>Worldwide Delivery</p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">200+</h2>
          <p>Gaming Products</p>
        </div>
      </div>

      {/* Section: Making History Together */}
      <div className="text-center my-8">
        <h2 className="text-3xl font-bold text-green-400">Making History Together</h2>
        <p className="text-gray-300 mt-2">
          Gaming worldwide delivery, expert team members, and smooth gaming product
          quality provide the best customer experience and consistent growth.
        </p>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Section 1 */}
        <div>
          <img
            src="/1.jpg"
            alt="Gaming headquarters"
            className="rounded-md w-full ml-4"
          />
        </div>
        <div>
          <h3 className="text-3xl font-bold text-green-400 mt-24">
          Your One-Stop Online Shop
          </h3>
          <p className="text-gray-300 mt-2">
          Discover a seamless shopping experience with cutting-edge technology and a user-friendly interface. From gadgets to daily essentials, we provide the best products tailored to your needs.
          </p>
        </div>

        {/* Section 2 */}
        <div className="md:order-2">
          <img
            src="/2.webp"
            alt="Expert team members"
            className="rounded-md w-full pr-7"
          />
        </div>
        <div className="md:order-1">
          <h3 className="text-3xl font-bold text-green-400 mt-24 ml-4">High-Quality Products</h3>
          <p className="text-gray-300 mt-2 ml-4">
          Our products are designed for reliability and performance, ensuring top-notch quality for every customer.
          </p>
        </div>

        {/* Section 3 */}
        <div>
          <img
            src="/3.jpeg"
            alt="Smooth gaming experience"
            className="rounded-md w-full ml-4"
          />
        </div>
        <div>
          <h3 className="text-3xl font-bold text-green-400 mt-24">
          Expert Team Behind Every Purchase
          </h3>
          <p className="text-gray-300 mt-2">
          Our dedicated team works tirelessly to ensure every product is delivered with care and precision, making your shopping experience smooth and delightful
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
