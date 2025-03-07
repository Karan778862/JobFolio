import React, { useState } from "react";
import { Dialog, DialogFooter, DialogHeader } from "./ui/dialog";
import { DialogContent, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

export const UpdateProfiletable = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills,
    file: user?.profile,
  });

  const dispatch = useDispatch();
  const onChnageEvent = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
console.log(input)
  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally{
      setLoading(false)
    }
    setOpen(false);
    console.log(input);
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={SubmitHandler}>
            <div className="grid grid-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4 my-2">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="fullName"
                  type="text"
                  value={input.fullname}
                  onChange={onChnageEvent}
                  className="col-span-3 outline-none"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 my-2">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={onChnageEvent}
                  className="col-span-3 outline-none"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 my-2">
                <Label htmlFor="number" className="text-right">
                  Number
                </Label>
                <Input
                  id="number"
                  name="number"
                  type="number"
                  value={input.phoneNumber}
                  onChange={onChnageEvent}
                  className="col-span-3 outline-none"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 my-2">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={onChnageEvent}
                  className="col-span-3 outline-none"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 my-2">
                <Label htmlFor="skills" className="text-right">
                  Skill
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={onChnageEvent}
                  className="col-span-3 outline-none"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 my-2">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                  className="col-span-3 outline-none"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4 bg-[#ff8931]">
                  <Loader2 className=" mr-2 h-4 w-4 animate-spin" /> please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4 bg-[#ff8931]">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
