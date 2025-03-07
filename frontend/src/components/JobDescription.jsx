import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSinglejob } from "@/redux/JobSlice";
import { toast } from "sonner";

export const JobDecription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant == user?._id
    ) || false;
  const dispatch = useDispatch();
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  const params = useParams();
  const jobId = params.id;

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      console.log(res.data);
      if (res.data.success) {
        setIsApplied(true); //update local state
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSinglejob(updateSingleJob)); //help us to real time ui update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSinglejob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant == user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl ">{singleJob?.title}</h1>
          <div className="flex items-center gap-4 mt-4">
            <Badge className={"text-sky-600 font-bold"} variant="ghost">
              {singleJob?.position} position
            </Badge>
            <Badge className={"text-violet-500-600 font-bold"} variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className={"text-sky-600 font-bold"} variant="ghost">
              {singleJob?.salary}
            </Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={` rounded-full ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed hover:bg-gray-600"
              : "bg-[#ff8931] hover:bg-[#f59a54]"
          }`}
        >
          {isApplied ? <span>Already Applied</span> : "Apply Now"}
        </Button>
      </div>
      <div>
        <h1 className="border-b-2 border-b-gray-400 font-bold py-4 text-xl">
          Job Description
        </h1>
        <div className="my-4">
          <h1 className="font-bold my-1">
            Role :
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.title}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location :
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Description :
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.description}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Experience :
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.experienceLevel}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Salary :
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.salary}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Total Applicants :
            <span className="pl-4 font-normal text-gray-800">
              {" "}
              {singleJob?.applications?.length}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date :
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};
