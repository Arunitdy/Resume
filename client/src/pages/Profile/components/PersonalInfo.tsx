interface Props{

editing:boolean;

profile:any;

handleChange:any;

}

const PersonalInfo=({

editing,

profile,

handleChange

}:Props)=>{

return(

<div className="card shadow border-0 mb-4">

<div className="card-body">

<h4 className="mb-4">

Personal Information

</h4>

<div className="row g-3">

{

["firstName","lastName","email","phone","city","state","country"]

.map((field)=>(

<div className="col-md-4" key={field}>

<label className="form-label">

{field}

</label>

{

editing?

<input
className="form-control"
name={field}
value={profile[field]}
onChange={handleChange}
/>

:

<p>{profile[field]}</p>

}

</div>

))

}

</div>

</div>

</div>

);

};

export default PersonalInfo;