import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ColorFilters from "./components/ColorFilters";
import ItemsContainer from "./components/ItemsContainer";
import PriceFilter from "./components/PriceFilter";
import SearchBar from "./components/SearchBar";
import Select from "./components/Select";
import { useItems } from "./core/hooks";

export default function App() {
  const [search, setSearch] = useSearchParams();
  const getItems = useItems();
  const items = useMemo(() => getItems.data?.products ?? [], [getItems.data]);
  const itemCounts = useMemo(
    () =>
      items.reduce<Record<string, number>>((initial, item) => {
        if (!isNaN(initial[item.category])) {
          initial[item.category] += 1;
        } else {
          initial[item.category] = 1;
        }

        return initial;
      }, {}),
    [items]
  );
  const maxPrice = (getItems.data?.maxPrice ?? 0) / 100;

  return (
    <div className="">
      <div className="flex justify-between items-center my-5 pb-5 border-b-2 mx-6 ">
        <h1 className="font-bold text-4xl">New arrivals</h1>

        <div className="justify-between flex">
          <SearchBar />
          <Select
            onChange={(e) => {
              search.set("sort", e.target.value);
              setSearch(search, {
                replace: true,
              });
            }}
            label="Sort by"
            name="sort"
            options={[
              {
                label: "Name",
                value: "name",
              },
              {
                label: "Price High",
                value: "priceDesc",
              },
              {
                label: "Price Low",
                value: "priceAsc",
              },
            ]}
          />
        </div>
      </div>

      <div className="flex">
        <aside className="h-screen hidden md:block w-4/12 sticky top-6 bg-gray-200 overflow-auto">
          <div className="sticky top-5 ">
            <ul className="flex flex-col pa0 border-b-2 border-teal-200 ma0 pb3 bb b--black-10 w-10/12 mx-auto">
              <li className="text-slate-400">
                <div className="flex justify-between">
                  Filters
                  <span>{items.length} Products</span>
                </div>
              </li>
              <li className="my-2 flex justify-between">
                <button className="btn bn fw5 pa0 pv2 w-100 tl bg-transparent hover-light-purple flex justify-between">
                  Bags
                </button>
                <span>{itemCounts["bags"] ?? 0}</span>
              </li>
              <li className="my-2 flex justify-between">
                <button className="btn bn fw5 pa0 pv2 w-100 tl bg-transparent hover-light-purple flex justify-between">
                  Shoes
                </button>
                <span>{itemCounts["shoes"] ?? 0}</span>
              </li>
              <li className="my-2 flex justify-between">
                <button className="btn bn fw5 pa0 pv2 w-100 tl bg-transparent hover-light-purple flex justify-between">
                  Jackets
                </button>
                <span>{itemCounts["jackets"] ?? 0}</span>
              </li>
            </ul>

            <div className="border-b-2 border-teal-200 py-3 w-10/12 mx-auto">
              <ColorFilters />
            </div>

            <div className="border-b-2 border-teal-200 py-3 w-10/12 mx-auto">
            <PriceFilter maxPrice={maxPrice} />
            </div>
          </div>
        </aside>

        <main className="bg-gray-200 w-full h-full">
          <ItemsContainer />
        </main>
      </div>
    </div>
  );
}
