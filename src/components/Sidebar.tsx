import { FaChartBar } from "react-icons/fa";
import { TbReportSearch } from 'react-icons/tb';
import { CgFileDocument } from 'react-icons/cg';
import { RiFileUserLine } from 'react-icons/ri';
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const sidebarLists = [
    {
        path:"/",
        icon:<FaChartBar className="icon-link"/>,
        title:"Stats"
    },
    {
        path:"/all-job",
        icon:<TbReportSearch className="icon-link"/>,
        title:"All Job"
    },
    {
        path:"/create",
        icon:<CgFileDocument className="icon-link"/>,
        title:"Create Job"
    },
    {
        path:"/profile",
        icon:<RiFileUserLine className="icon-link"/>,
        title:"Profile"
    }
]

const Sidebar = () => {
   const { pathname } = useLocation();

    return (
        <aside className="sidebar">
            <header>
                <Logo/>
            </header>
            <ul className="links-container">
                {sidebarLists.map((item,idx : number) => (
                    <Link to={item.path} key={idx}>
                      <li className={`link-item ${pathname === item.path ? 'active' : ''}`}>
                        {item.icon}
                        <span>{item.title}</span>
                      </li>
                    </Link>
                ))}
            </ul>
        </aside>
    )
}

export default Sidebar;