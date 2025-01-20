import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";


const LatestJobcards = ({job}) => {
  const navigate = useNavigate()
  return (
    <div onClick={()=>navigate(`/description/${job?._id}`)} className="p-5 rounded-md shadow-xl my-3 mx-3  bg-white border border-gray-300 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">india</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{
      job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Badge className={'text-sky-600 font-bold'} variant="ghost">
          {job?.position} position
        </Badge>
        <Badge className={'text-violet-500-600 font-bold'} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={'text-sky-600 font-bold'} variant="ghost">
          {job?.salary}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobcards;
