import { BiChevronsLeft,BiChevronsRight } from "react-icons/bi";

interface IPaginationProps {
    total:number;
    current_page:number;
    per_page:number;
    onChangePage:(totalPage : number,page : number) => void
}

const Pagination = ({
    total,
    current_page,
    per_page,
    onChangePage
} : IPaginationProps) => {
   const pages : any = [];
   const totalPage : number = Math.ceil((total / per_page));
 
   for(let i = 0; i < totalPage; i++) {
      pages.push(i+1);
   }

   if(!Array.isArray(pages) && pages.length < 1 ) {
       return null;
   }

  return (
    <div className="pagination-content">
        <button className="prev-btn">
            <BiChevronsLeft/>
            Prev
        </button>
        <div className="pagination-items">
            {pages.map((page : number, idx : number) => (
                 <button onClick={() => onChangePage(totalPage,page)} className={`${current_page === page ? 'active' : ''}`} key={idx}>{page}</button>
            ))}
        </div>
        <button className="next-btn">
            Next
            <BiChevronsRight/>
        </button>
    </div>
  )
}

export default Pagination