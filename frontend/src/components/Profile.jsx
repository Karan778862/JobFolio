import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import microsoft from "../assets/microsoft.png";
import { Button } from "./ui/button";
import {  Contact, Mail, Pen } from "lucide-react";

import { Label } from "@radix-ui/react-label";
import { AppliedJobTable } from "./AppliedJobTable";
import { useState } from "react";
import { UpdateProfiletable } from "./UpdateProfiletable";
import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import { useGetAppliedJobs } from "@/hooks/useGetAppliedJobs";


// const skill = ["HTML","CSS","JAVASCRIPT","REACT"]
const isResume = true
const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false)
  const {user} = useSelector(store=>store.auth)
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border broder-gray-200 rounded-2xl my-5 p-8 ">
        <div className="flex justify-between gap-4">
          <div className="flex items-center gap-4 ">
            <Avatar>
              <AvatarImage src={user?.profile.profilePhoto} className="h-10 w-10" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>
               {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button onClick={()=> setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div>
            <h1>Skill</h1>
            <div className="flex items-center gap-2 my-2">

            {
              user?.profile?.skills.length != 0 ?  user?.profile?.skills.map((item, index)=>(
                    <Badge key={index} variant="outline">{item}</Badge>
                )) : <span>NA</span>
            }
            </div>
        </div>
        <div className="grid w-full max-w-sm items-center mx-auto gap-1.5">
            <Label className="text-md font-bold">Resume</Label>
            {
              isResume ? <a target="blank" download={true} href={user?.profile?.resume} className="text-blue-500 hover:underline cursor-pointer">{user?.profile?.resumeOriginalName}</a> : <span>Na</span>
            }
        </div>
        <div className=" max-w-4xl mx-auto rounded-2xl">
          <h1 className="my-5 text-2xl font-bold">Applied Job</h1>
              {/* Appliction Table */}
              <AppliedJobTable/>
        </div>
      </div>
      <UpdateProfiletable open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
