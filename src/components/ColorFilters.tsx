import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useItems } from "../core/hooks";
import { Product } from "../core/types";
import { getUniqueValues } from "../core/utils";
import CollapsibleList from "./CollapsibleList";
import FilterToggle from "./FilterToggle";

export default function ColorFilters() {
  const [search, setSearch] = useSearchParams();
  const filteredColors = search.get("colors")?.split(",") ?? [];
  const [colors, setColors] = useState(filteredColors);
  const getItems = useItems();
  const items = getItems.data?.products ?? [];
  const allColors = getUniqueValues<string, Product>(items, "color");
  const groupedItems = allColors
    .map((color: string) => ({
      label: color,
      name: color,
      value: color,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
  const onColorChange = (color: string) => (checked: Checkbox.CheckedState) => {
    let _colors = colors.slice();

    if (checked) {
      _colors.push(color);
    } else {
      _colors = _colors.filter((_color) => _color !== color);
    }

    setColors(_colors);
  };
  const hasFilters = filteredColors.length > 0;

  return (
    <CollapsibleList
      defaultVisible={hasFilters}
      title="Color"
      actionButton={
        <FilterToggle
          visible={colors.length > 0}
          active={hasFilters}
          onApply={() => {
            search.set("colors", colors.join(","));
            setSearch(search, {
              replace: true,
            });
          }}
          onClear={() => {
            search.delete("colors");
            setColors([]);
            setSearch(search, {
              replace: true,
            });
          }}
        />
      }
    >
      {groupedItems
        .filter((f) => {
          if (filteredColors.length === 0) {
            return true;
          }

          return filteredColors.includes(f.value);
        })
        .map((field, key) => (
          <li key={key} className="my-3">
            <div className="flex items-center">
              <Checkbox.Root
                id={field.name}
                name={field.name}
                disabled={hasFilters}
                onCheckedChange={onColorChange(field.value)}
                checked={colors.includes(field.value)}
                className="shadow-violet-600 border-[1px] border-violet-600 hover:bg-violet3 flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] bg-white outline-none focus:shadow-[0_0_0_2px_violet]"
              >
                <Checkbox.Indicator className="text-violet-600">
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label
                className="pl-[15px] text-[15px] leading-none text-black"
                htmlFor={field.name}
              >
                {field.label}
              </label>
            </div>
          </li>
        ))}
    </CollapsibleList>
  );
}
