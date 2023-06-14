import "../../assets/scss/pages/stats.scss";
import "chart.js/auto";

import { FaBriefcase,FaCalendarCheck,FaBug } from 'react-icons/fa';
import { useState,useEffect } from "react";
import { Loading } from "../../components";
import { IStatsInterface,IChartState } from "../../interfaces/useStateInterfaces";
import { Bar } from "react-chartjs-2";

import useAuthStore from "../../store/useAuthStore";
import APIJobCall from "../../api/APIJob";

const Stats = () => {
   const { token } : any = useAuthStore();

   const [loading,setLoading] = useState<boolean>(false);
   const [stats,setStats] = useState<IStatsInterface | null>(null);
   const [chart,setChart] = useState<IChartState>({
      labels:[],
      datasets:[]
   });

   const APIJob = APIJobCall(token);

   const fetchStats = async () => {
    setLoading(true);
       try {
        const { data } = await APIJob.get(`/stats`);
        if(data && data.statusCode >= 200) {
            setStats(data.data.scoreCard);
            setChart({
                labels:data.data.chart.labels,
                datasets:[{
                    label:"Job Count",
                    data:data.data.chart.data,
                    backgroundColor:["#2cb1bc"]
                }]
            });
            setLoading(false);
        }

       } catch(err) {
         setLoading(false);
         return err;
       }
   }

   useEffect(() => {
     fetchStats();
   } ,[])

   if(loading) {
     return (
         <Loading 
           type=""
           width="80px"
           height="80px"
           color="#14919b"
         />
     )
   }

    return (
        <div className="stats-container">
            <section className="stats-grid">
                 <div className="stats-grid-item pending">
                     <div className="stats-count">
                        <h2>{stats?.pending}</h2>
                        <article>
                            <FaBriefcase/>
                        </article>
                     </div>
                    <h4>Pending Application</h4>
                 </div>
                 <div className="stats-grid-item interview">
                     <div className="stats-count">
                        <h2>{stats?.interview}</h2>
                        <article>
                            <FaCalendarCheck/>
                        </article>
                     </div>
                    <h4>Interview Schedule</h4>
                 </div>
                 <div className="stats-grid-item declined">
                     <div className="stats-count">
                        <h2>{stats?.declined}</h2>
                        <article>
                            <FaBug/>
                        </article>
                     </div>
                    <h4>Jobs Declined</h4>
                 </div>
            </section>
            <section className="chart">
                 <Bar data={chart} />
            </section>
        </div>
    )
}

export default Stats;