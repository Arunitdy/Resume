import { FaUserCircle } from "react-icons/fa";

interface Props{

    editing:boolean;

    onEdit:()=>void;

    onSave:()=>void;

    onCancel:()=>void;

}

const ProfileHeader=({

editing,

onEdit,

onSave,

onCancel

}:Props)=>{

return(

<div className="card shadow border-0 mb-4">

<div className="card-body d-flex justify-content-between align-items-center">

<div className="d-flex align-items-center">

<FaUserCircle size={80} className="text-primary"/>

<div className="ms-4">

<h3>Arun M</h3>

<p className="text-muted">

Software Engineer

</p>

<div className="progress" style={{height:"8px"}}>

<div
className="progress-bar"
style={{width:"82%"}}
/>

</div>

<small>

Profile Completion 82%

</small>

</div>

</div>

{

!editing?

<button
className="btn btn-primary"
onClick={onEdit}
>

Edit Profile

</button>

:

<div>

<button
className="btn btn-success me-2"
onClick={onSave}
>

Save

</button>

<button
className="btn btn-secondary"
onClick={onCancel}
>

Cancel

</button>

</div>

}

</div>

</div>

);

};

export default ProfileHeader;