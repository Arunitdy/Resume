const Skills=({profile}:any)=>{

return(

<div className="card shadow border-0 mb-4">

<div className="card-body">

<h4>

Skills

</h4>

<div>

{

profile.skills.map((skill:string)=>(

<span
key={skill}
className="badge bg-primary me-2 mb-2 p-2"
>

{skill}

</span>

))

}

</div>

</div>

</div>

);

};

export default Skills;