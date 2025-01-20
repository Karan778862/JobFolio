import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/JobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];
const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchQuery(selectedValue))
  }, [selectedValue]);
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-semibold text-xl">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((item, index) => (
          <div key={index}>
            <h1 className="font-bold">{item.filterType}</h1>
            {item.array.map((item, idx) => {
              const itemId = `id${index} - ${idx}`;
              return (
                <div key={idx} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem className="text-[#ff8931]" value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
