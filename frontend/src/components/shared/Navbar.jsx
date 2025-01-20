import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import logo from "../../assets/logo3.png";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-white shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 ">
        <div className="flex items-center gap-3 ">
          <div className=" rounded-full">
            <img className=" " src={logo} alt="" width={200} height={100} />
          </div>
          {/* <h1 className="text-2xl font-bold">
            Job<span className="text-[#ff8931]">Folio</span>
          </h1> */}
        </div>

        <div className="flex items-center gap-12">
          <ul className="flex font-medium  items-center gap-5">
            {user && user.role == "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Company</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-[#ff8931] hover:bg-[#ff8931] hover:text-white"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="outline"
                  className="border-[#ff8931] hover:bg-[#ff8931] hover:text-white"
                >
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className=" cursor-pointer border border-gray-500">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 items-center">
                  <Avatar className=" border border-gray-500">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                {/* view profile codeing */}
                <div className="flex flex-col text-gray-600">
                  {
                    user && user.role == "student" && (
                      <>
                       <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2 />
                    <Button variant="link">
                      {" "}
                      <Link to="/Profile">view Profile</Link>
                    </Button>
                  </div>
                      </>
                    )
                  }
                 
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      <Link>LogOut</Link>
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
