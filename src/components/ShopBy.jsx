// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import HorSlider from "./HorSlider";

// const ShopBy = ({ filter, title }) => {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_BASE_URL}/api/filter/${filter}`
//         );
//         if (isMounted) {
//           setProducts(res.data);
//           setLoading(false);
//         }
//       } catch (err) {
//         if (isMounted) {
//           console.error(`Error while fetching products: ${err.message}`);
//           setError(err);
//           setLoading(false);
//         }
//       }
//     };
//     fetchData();
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   return (
//     <>
//       <div className="mt-10 mb-2 text-2xl">{title}</div>
//       <div className="overflow-x-auto overflow-y-hidden md:max-w-full scroll-container mb-10 mx-auto relative scroll-container">
//         {loading && <p>Loading...</p>}
//         {error && <p>Error while fetching: {error.message}</p>}

//         <div className="flex flex-nowrap space-x-4">
//           {/* Ensure products is always an array */}
//           {(Array.isArray(products) ? products : []).map((elem) => (
//             <HorSlider
//               product={elem}
//               key={elem._id || elem.id} // fallback if _id is missing
//               className="inline-block"
//               home={true}
//             />
//           ))}
//         </div>
       
//       </div>
//     </>
//   );
// };

// export default ShopBy;




import axios from "axios";
import React, { useEffect, useState } from "react";
import HorSlider from "./HorSlider";
import { useNavigate } from "react-router-dom";

const ShopBy = ({ filter, title }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // GenInfo Data
  const infoData = [
    { src: "/GenInfo/free-shipping.png", title: "Free Shipping", text: "On all orders" },
    { src: "/GenInfo/coins.png", title: "Payment Options", text: "COD, cards, mobile payments" },
    { src: "/GenInfo/product-return.png", title: "Free Returns", text: "Refunds within 7 days" },
    { src: "/GenInfo/support.png", title: "24/7 Support", text: "Always here to help" },
  ];

  // Brands Data
  const brandData = [
    { src: "/GenInfo/adidas.jpg", name: "Adidas", to: "/search/adidas" },
    { src: "/GenInfo/nike.png", name: "Nike", to: "/search/nike" },
    { src: "/GenInfo/skechers.jpg", name: "Skechers", to: "/search/skechers" },
    { src: "/GenInfo/puma.jpg", name: "Puma", to: "/search/puma" },
  ];

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/filter/${filter}`
        );
        if (isMounted) {
          setProducts(res.data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error(`Error while fetching products: ${err.message}`);
          setError(err);
          setLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [filter]); // filter change হলে যাতে ডাটা আপডেট হয়

  return (
    <>
      {/* Product Slider Section (e.g., Best Sellers) */}
      <div className="mt-10 mb-2 text-center text-2xl font-bold">{title}</div>
      <div className="overflow-x-auto overflow-y-hidden md:max-w-full scroll-container mb-10 mx-auto relative">
        {loading && <p className="text-center py-10">Loading...</p>}
        {error && <p className="text-red-500 text-center">Error: {error.message}</p>}

        <div className="flex flex-nowrap space-x-4">
          {(Array.isArray(products) ? products : []).map((elem) => (
            <HorSlider
              product={elem}
              key={elem._id || elem.id}
              className="inline-block"
              home={true}
            />
          ))}
        </div>
      </div>

      {/* <hr className="my-10 border-gray-200" /> */}

      {/* General Info Section */}
      {/* <div className="flex justify-center items-center my-20">
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-screen-lg">
          {infoData.map((elem, id) => (
            <li className="flex flex-col items-center bg-white p-4" key={id}>
              <div className="flex-shrink-0 mb-2">
                <img
                  src={elem.src}
                  alt={elem.title}
                  className="h-16 w-16 rounded-full bg-slate-200 object-contain p-2"
                />
              </div>
              <div className="text-center">
                <p className="text-sm uppercase font-semibold">{elem.title}</p>
                <p className="text-xs text-gray-500">{elem.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div> */}

      {/* Top Brands Section */}
      <div className="flex flex-col items-center my-16 w-full">
        <div className="flex flex-wrap justify-center gap-6">
          {brandData.map((elem, id) => (
            <div
              key={id}
              className="relative w-[280px] h-[280px] md:w-[340px] md:h-[340px] overflow-hidden group cursor-pointer"
            >
              <div className="absolute w-full flex justify-center items-center top-4 z-10">
                <p className="bg-white/80 px-4 py-1 rounded-full font-semibold shadow-sm">{elem.name}</p>
              </div>
              <img
                src={elem.src}
                alt={elem.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <button
                onClick={() => navigate(elem.to)}
                className="absolute inset-0 flex items-center justify-center
                           bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold text-lg"
              >
                Explore {elem.name} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopBy;