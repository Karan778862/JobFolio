import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/JobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

  const [query, setQuery] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = ()=>{
      dispatch(setSearchQuery(query))
     
      navigate("/browse")
  }
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2  rounded-full bg-gray-100 text-[#ff8931] font-medium">
          No. 1 Jobfolio Website
        </span>
        <h1 className="text-5xl font-bold">
          Search, Apply & <br />
          get your<span className="text-[#ff8931]">Dream Jobs</span>
        </h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis
          vero, 
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center mx-auto">
            <input 
            type="text"
            onChange={(e)=>setQuery(e.target.value)}
            placeholder="Find Your dream job"
            className=" outline-none border-none w-full"
             />
             <Button onClick={searchJobHandler} className="rounded-r-full bg-[#ff8931]">
                <Search className="h-5 w-5"/>
             </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
