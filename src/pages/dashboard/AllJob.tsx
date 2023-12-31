import "../../assets/scss/pages/allJob.scss";
import { ChangeEvent, useCallback,useEffect, useMemo, useState } from 'react';
import { Input, Select,JobCard,Loading, Pagination } from "../../components";
import APIJobCall from "../../api/APIJob";
import useAuthStore from "../../store/useAuthStore";
import { IJobState, IPaginationState } from "../../interfaces/useStateInterfaces";
import { debounce } from "lodash"

const AllJob = () => {
   const { token } : any = useAuthStore();
   const APIJob = APIJobCall(token);
   
   const [pagination,setPagination] = useState<IPaginationState>({
    current_page:1,
    total:0,
    per_page:0
   })
   const [loading,setLoading] = useState<boolean>(false);
   const [jobs,setJobs] = useState<IJobState[]>([]);
   const [form,setForm] = useState({
      search:"",
      status:"",
      type:"",
      sort:"latest"
   });

   const changePage = (totalPage : number ,page : number) => {

    if(pagination.current_page === page) {
        return false;
    }
      setPagination({
        ...pagination,
        current_page:page
      });
   }  

   const fetchAllJob = useCallback(async (search : string = "") => {
    setLoading(true);
      try {
        const { data } = await APIJob.get(`/all-job?search=${search}&type=${form.type}&status=${form.status}&sort=${form.sort}&page=${pagination?.current_page}&per_page=${pagination?.per_page}`);

        if(data && data.statusCode === 200) {
           setJobs(data.data.data);
           setPagination({
              total:data.data.total,
              current_page:data.data.current_page,
              per_page:data.data.per_page
           });

           setLoading(false);
        }

      } catch(err) {
        setLoading(false);
         return err;
      }
   }
,[APIJob,form,pagination])


   const sendSearchRequest = useCallback((value : string) => {
       fetchAllJob(value);
   } ,[fetchAllJob]);

   const debounceFn = useMemo(() =>  {
       return debounce(sendSearchRequest, 1000);
   },[sendSearchRequest])

   const searchHandler = (e : ChangeEvent<HTMLInputElement>) => {
       setForm({
        ...form,
        search:e.target.value
       });
    
       debounceFn(e.target.value);
   }

   const filterHandler = async (e : any) => {
        const value = e.target.value;
        const name = e.target.name;

        setForm({
            ...form,
            [name]:value
        });

        let params = ""

        switch(name) {
           case "type" :
            params = `type=${value}&status=${form.status}&search=${form.search}&sort=${form.sort}`
           break;

           case "status" :
            params = `status=${value}&type=${form.type}&search=${form.search}&sort=${form.sort}`
           break;

           case "sort" :
            params = `sort=${value}&type=${form.type}&search=${form.search}&status=${form.status}`
           break;
        }

        setLoading(true);

        try {

        const { data } = await APIJob.get(`/all-job?${params}&page=${pagination?.current_page}&per_page=${pagination?.per_page}`);

        if(data && data.statusCode === 200) {
           setJobs(data.data.data);
           setPagination({
              total:data.data.total,
              current_page:data.data.current_page,
              per_page:data.data.per_page
           });

           setLoading(false);
        }

        } catch(err) {
          setLoading(false);
          return err;
        }
   }

      const deleteJob = async (id : string) => {
       try {
         const { data } = await APIJob.delete(`/delete/${id}`);

         if(data && data.statusCode === 200) {
            fetchAllJob();

         }

       } catch(err) {
          return err;
       }
   }
   
   const clearFilter = () => {
       return setForm({
          search:"",
          sort:"",
          type:"",
          status:""
       });
   }

    const nextPrevHandler = (type : string, totalPage : number) => {
     let page : number = pagination.current_page;

     if(totalPage === 1) return;

     switch(type) {
         case "next":
         if(pagination.current_page >= totalPage) {
              page = 1;
          } else {
             page = pagination.current_page + 1;
          }
          break;
         case "prev":
          if(pagination.current_page <= 1) {
              page = totalPage;
          } else {
              page = pagination.current_page - 1;
          }
          break;
     }

       setPagination({
          ...pagination,
         current_page:page
       });
   }


   useEffect(() => {
     fetchAllJob("");
   },[pagination.current_page]);

    return (
        <div className="all-job-container">
            <section className="all-job-filter-box">
                <h2>Filter Job</h2>
                <form className="all-job-filter-form">
                    <div className="form-control">
                        <label>Search</label>
                        <Input name="search" value={form.search} changeEvent={searchHandler} type="text"/>
                    </div>
                    <div className="form-control">
                        <label>Status</label>
                        <Select value={form.status} name="status" changeEvent={filterHandler} options={["All","Pending",'Interview','Declined']}  />
                    </div>
                      <div className="form-control">
                        <label>Type</label>
                        <Select value={form.type} name="type" changeEvent={filterHandler} options={["All","Full-Time",'Part-Time','Remote']}  />
                    </div>
                    <div className="form-control">
                        <label>Sort</label>
                        <Select value={form.sort} name="sort" changeEvent={filterHandler} options={["latest","oldest", "a-z","z-a"]}  />
                    </div>
                    <button type="button" onClick={clearFilter} className="submit-button">Clear Filters</button>
                </form>
            </section>

           {loading ? (
            <Loading type="" width="50px" height="50px" color="#14919b" />
           ) : (
             <section className="all-job-content">
                 {Array.isArray(jobs) && jobs.length > 0 ? (
                    <h2>{pagination?.total} Jobs Found</h2>
                 ) : (
                    <h2>No Jobs To Display...</h2>
                 )}
                 {Array.isArray(jobs) && jobs.length > 0 && (
                   <div className="job-card-container">
                    {jobs.map((job : IJobState , idx : number) => <JobCard key={idx} job={job} onDelete={deleteJob} />)}
                   </div>
                 )}
            </section>
           )}
           {Array.isArray(jobs) && jobs.length > 0 &&  loading === false && (
             <section className="pagination-container">
             <Pagination onChangePage={changePage} nextPrevHandler={nextPrevHandler} total={pagination.total} per_page={pagination.per_page} current_page={pagination.current_page} />
           </section>
           )}
        </div>
    )
}

export default AllJob;