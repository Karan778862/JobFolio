import  { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/redux/JobSlice";
import { useGetAllJobs } from "@/hooks/useGetAllJobs";

// const randomJobs = [1, 2, 3];
const Browse = () => {
  useGetAllJobs();
  const dipatch = useDispatch()
  const {allJobs} = useSelector(store=>store.job)

  useEffect(()=>{
      return ()=>{
          dipatch(setSearchQuery(""));
      }
  },[])
  return (
    <div>
      <Navbar />
      <div  className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">search Result ({allJobs.length}) </h1>
        <div className=" grid grid-cols-3 gap-4 ">
            {
                allJobs.map((job)=>(
                    <Job key={job._id} job={job}/>
                ))
            }
        </div>
        
      </div>
    </div>
  );
};

export default Browse;
