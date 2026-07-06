import { FaFilePdf } from "react-icons/fa";

const ResumeCard=()=>{

return(

<div className="card shadow border-0 mb-4">

<div className="card-body d-flex justify-content-between align-items-center">

<div>

<h4>

Resume

</h4>

<p>

<FaFilePdf className="text-danger me-2"/>

Resume.pdf

</p>

</div>

<div>

<button className="btn btn-outline-primary me-2">

Preview

</button>

<button className="btn btn-primary">

Upload New

</button>

</div>

</div>

</div>

);

};

export default ResumeCard;