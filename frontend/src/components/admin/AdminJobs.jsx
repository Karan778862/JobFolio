import  { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Navbar from '../shared/Navbar';
import { AdminJobsTable } from './AdminJobsTable';
import { useGetAllAdminbyId } from '@/hooks/useGetAllAdminbyId';
import { useDispatch } from 'react-redux';
import { setSearchJobByText } from '@/redux/JobSlice';

export const AdminJobs = () => {
  
   useGetAllAdminbyId();
    const [input, setInaput] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    
    useEffect(()=>{
    dispatch(setSearchJobByText(input))
    },[input]);
    return (
      <div>
        <Navbar />
        <div className="max-w-6xl mx-auto my-10">
          <div className="flex items-center justify-between my-5">
            <Input
              className="w-fit"
              placeholder="Filter by Name, role"
              onChange={(e) => setInaput(e.target.value)}
            />
            <Button onClick={()=>navigate("/admin/jobs/create")}>
              New Jobs
            </Button>
          </div>
          <AdminJobsTable/>
        </div>
      </div>
  )
}
