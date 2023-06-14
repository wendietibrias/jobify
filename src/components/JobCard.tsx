import { IJobState } from "../interfaces/useStateInterfaces";
import { FaLocationArrow,FaBriefcase,FaCalendarDay } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

interface IJobCardProps {
    job : IJobState,
    onDelete:(id : string) => void
}

const JobCard = ({
    job,
    onDelete
} : IJobCardProps) => {
    const navigate = useNavigate();

    const onUpdate = () => {
        return navigate("/update/" + job?._id);
    }

    return (
        <article className="job-card">
            <header>
                <span className="job-profile">{job?.company?.charAt(0)}</span>
                <div className="job-desc">
                    <h4>{job?.position}</h4>
                    <h5>{job?.company}</h5>
                </div>
            </header>
            <div className="job-detail">
              <div className="job-detail-item">
                 <FaLocationArrow/>
                 <span>{job?.jobLocation}</span>
              </div>
                 <div className="job-detail-item">
                 <FaCalendarDay/>
                 <span>{new Date(job?.createdAt).toDateString()}</span>
              </div>
                <div className="job-detail-item">
                 <FaBriefcase/>
                 <span>{job?.jobType}</span>
              </div>
              <div className="job-detail-item">
                <button className={`${job?.status?.toLowerCase()}`}>{job?.status}</button>
              </div>
            </div>
            <div className="job-action-button">
                <button onClick={onUpdate} className="edit">Edit</button>
                <button onClick={() => onDelete(job?._id)} className="delete">Delete</button>
            </div>
        </article>
    )
}

export default JobCard;