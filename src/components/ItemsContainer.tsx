import { BarLoader } from "react-spinners";
import { useItems } from "../core/hooks";

export default function ItemsContainer() {
  const getProducts = useItems();
  const products = getProducts.data?.products ?? [];

  if (getProducts.isLoading) {
    return (
      <div className="flex w-75">
        <BarLoader height={8} width="100%" />
      </div>
    );
  }

  return (
    <div className="w-75">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto w-11/12 h-full">
        {products.map((product) => {
          return (
            <div
              key={product.name}
              className="w-64 bg-white shadow-md rounded-lg overflow-hidden my-4"
            >
              <a className="hover:text-purple-500" href="/t">
                <div className="flex flex-col h-full">
                  <img
                    alt=""
                    loading="lazy"
                    className="w-full h-48 object-cover"
                    src={product.src}
                  />

                  <div className="p-4">
                    <b className="text-2xl font-bold mb-2">{product.name}</b>
                    <i className="text-lg text-gray-600">
                      {product.color.join(", ")}
                    </i>
                    <p className="text-black">${product.price / 100}</p>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
