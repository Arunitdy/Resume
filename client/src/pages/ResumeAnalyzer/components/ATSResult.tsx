
import ScoreCard from "./ScoreCard.tsx";
import KeywordList from "./KeywordList.tsx";
import SuggestionCard from "./SuggestionCard.tsx";

import type { ATSResponse } from "../../../services/resumeService";

interface Props{

    result:ATSResponse;

}

const ATSResult=({result}:Props)=>{

return(

<div className="mt-5">

<h2 className="mb-4">

ATS Analysis Result

</h2>

<div className="row">

<div className="col-lg-4">

<ScoreCard score={result.score}/>

</div>

<div className="col-lg-8">

<div className="card shadow-sm border-0">

<div className="card-body">

<h5>

Summary

</h5>

<p>

{result.summary}

</p>

</div>

</div>

</div>

</div>

<div className="row mt-4">

<div className="col-lg-6">

<KeywordList

title="Matched Keywords"

keywords={result.matchedKeywords}

success

/>

</div>

<div className="col-lg-6">

<KeywordList

title="Missing Skills"

keywords={result.missingSkills}

/>

</div>

</div>

<div className="mt-4">

<SuggestionCard

suggestions={result.suggestions}

/>

</div>

</div>

);

};

export default ATSResult;