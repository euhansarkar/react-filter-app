import * as Slider from "@radix-ui/react-slider";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CollapsibleList from "./CollapsibleList";
import FilterToggle from "./FilterToggle";

function PriceFilter({ maxPrice }: { maxPrice: number }) {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useSearchParams();
  const defaultValues = [
    parseInt(search.get("minPrice") ?? "0"),
    parseInt(search.get("maxPrice") ?? `${maxPrice}`),
  ];
  const [values, setValues] = useState(defaultValues);
  const filterActive = search.get("minPrice") !== null;
  const onApplyFilter = () => {
    search.set("minPrice", `${values[0]}`);
    search.set("maxPrice", `${values[1]}`);
    setSearch(search, {
      replace: true,
    });
  };

  return (
    <CollapsibleList
      title="Price"
      actionButton={
        <FilterToggle
          visible={visible}
          active={filterActive}
          onApply={onApplyFilter}
          onClear={() => {
            search.delete("minPrice");
            search.delete("maxPrice");
            // clear local state
            setValues([0, maxPrice]);

            // clear url state
            setSearch(search, {
              replace: true,
            });
          }}
        />
      }
    >
      <li>
        <div className="mv2">
          <div className="flex">
            <div className="flex-auto">
              <div className="flex mb-2 justify-center fw5">
                ${values[0]} - ${values[1]}
              </div>
              <Slider.Root
                onValueChange={(values) => {
                  setValues([values[0], values[1]]);
                  setVisible(true);
                }}
                className="relative flex items-center select-none touch-none w-full h-5"
                value={values}
                min={0}
                max={maxPrice}
                step={50}
                minStepsBetweenThumbs={1}
              >
                <Slider.Track className="bg-slate-300 relative grow rounded-full h-[3px]">
                  <Slider.Range className="absolute bg-purple-600 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-purple-600 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-purple-600"/>
                <Slider.Thumb className="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-purple-600 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-purple-600" />
              </Slider.Root>
            </div>
          </div>
        </div>
      </li>
    </CollapsibleList>
  );
}

export default function PriceFilterContainer({
  maxPrice,
}: {
  maxPrice: number;
}) {
  if (maxPrice === 0) return null;

  return <PriceFilter maxPrice={maxPrice} />;
}
