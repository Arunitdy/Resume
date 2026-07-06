interface Props{

title:string;

keywords:string[];

success?:boolean;

}

const KeywordList=({

title,

keywords,

success

}:Props)=>{

return(

<div className="card shadow-sm border-0">

<div className="card-body">

<h5>

{title}

</h5>

{

keywords.length===0

?

<p className="text-success">

None 🎉

</p>

:

<ul>

{

keywords.map((keyword,index)=>(

<li
key={index}
className={
success
?
"text-success"
:
"text-danger"
}
>

{keyword}

</li>

))

}

</ul>

}

</div>

</div>

);

};

export default KeywordList;