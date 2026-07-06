interface Props{

suggestions:string[];

}

const SuggestionCard=({

suggestions

}:Props)=>{

return(

<div className="card shadow-sm border-0">

<div className="card-body">

<h5>

Suggestions

</h5>

<ul>

{

suggestions.map((suggestion,index)=>(

<li key={index}>

{suggestion}

</li>

))

}

</ul>

</div>

</div>

);

};

export default SuggestionCard;