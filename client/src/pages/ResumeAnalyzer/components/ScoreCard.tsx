interface Props{

score:number;

}

const ScoreCard=({score}:Props)=>{

const color=

score>=80

?

"success"

:

score>=60

?

"warning"

:

"danger";

return(

<div className={`card border-${color} shadow-sm`}>

<div className="card-body text-center">

<h6>

ATS Score

</h6>

<h1
className={`text-${color}`}
>

{score}%

</h1>

</div>

</div>

);

};

export default ScoreCard;