

import LatestJobcards from './LatestJobcards'
import { useSelector } from 'react-redux'



const LatestJobs = () => {
  const {allJobs} = useSelector(store=>store.job)
 
  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className=' text-2xl text-center md:text-left md:text-4xl font-bold'><span className='text-[#ff8931]'>Latest & top</span>Job Openings</h1>
      <div className='grid md:grid-cols-3 grid-cols-1 ga-4 my-5'>
      {
           allJobs.length <= 0 ? <span>No Job Availble</span> : allJobs.slice(0,6).map((job)=> <LatestJobcards   key={job._id} job={job}/>)
        }
      </div>
       
    </div>
  )
}

export default LatestJobs
