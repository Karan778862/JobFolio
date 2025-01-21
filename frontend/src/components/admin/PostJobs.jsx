import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../components/ui/input";
import { useSelector } from "react-redux";
import { Select } from "../ui/select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const companyArray = [0];

export const PostJobs = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const ChangeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() == value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Length": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-400 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={ChangeEventHandler}
                className=" focus-visible:ring-offset-0 focus-visible:ring-0 my-1 "
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={ChangeEventHandler}
                className=" focus-visible:ring-offset-0 focus-visible:ring-0 my-1 "
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={ChangeEventHandler}
                className=" focus-visible:ring-offset-0 focus-visible:ring-0 my-1 "
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={ChangeEventHandler}
                className=" focus-visible:ring-offset-0 focus-visible:ring-0 my-1 "
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={ChangeEventHandler}
                className=" focus-visible:ring-offset-0 focus-visible:ring-0 my-1 "
              />
            </div>
            <div>
              <Label>JobType</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={ChangeEventHandler}
                className=" focus-visible:ring-offset-0 focus-visible:ring-0 my-1 "
              />
            </div>
            <div>
              <Label>Experience Lavel</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={ChangeEventHandler}
                className=" focus-visible:ring-offset-0 focus-visible:ring-0 my-1 "
              />
            </div>
            <div>
              <Label>No Of Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={ChangeEventHandler}
                className=" focus-visible:ring-offset-0 focus-visible:ring-0 my-1 "
              />
            </div>

            {companies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => {
                      return (
                        <SelectItem
                          key={company._id}
                          value={company?.name?.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          {loading ? (
            <Button className="w-full my-4 bg-[#ff8931] hover:bg-[#f89e59]">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin " /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 bg-[#ff8931] hover:bg-[#f89e59]">
              post New Jobs
            </Button>
          )}
          {companies.length == 0 && (
            <p className="text-red-400 font-bold text-center my-3">
              Please Register a Cpmany befour post job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
