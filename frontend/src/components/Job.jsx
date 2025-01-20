import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import microsoft from "../assets/microsoft.png";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200">
      <div className="flex  items-center justify-between ">
        <p>
          {daysAgoFunction(job?.createdAt) == 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" className="rounded-full" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-semibold">{job?.company?.name}</h1>
          <p>India</p>
        </div>
      </div>
      <div>
        <h1 className=" font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Badge className={"text-sky-600 font-bold"} variant="ghost">
          {job?.position} position
        </Badge>
        <Badge className={"text-violet-500-600 font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-sky-600 font-bold"} variant="ghost">
          {job?.salary}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Details
        </Button>
        <Button variant="outline" className="bg-[#ff8931] hover:bg-[#f59a54]">
          Save For latter
        </Button>
      </div>
    </div>
  );
};

export default Job;
