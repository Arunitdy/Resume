const Education=({

editing,

profile,

handleChange

}:any)=>{

return(

<div className="card shadow border-0 mb-4">

<div className="card-body">

<h4>

Education

</h4>

<div className="row g-3">

{

["college","degree","department","graduationYear"]

.map((field)=>(

<div className="col-md-6" key={field}>

<label>

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

export default Education;