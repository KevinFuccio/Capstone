import { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating"

const RatingStar = ({onRatingChange,resetRating}:{onRatingChange:any,resetRating:boolean})=>{
    const [rating,setRating] = useState(0)
    const handleRating = (rate:number)=>{
        setRating(rate);
        onRatingChange(rate)
    }
    useEffect(()=>{
        if(resetRating){
            setRating(0)
        }

    },[resetRating])


    return(
        <div>
            <Rating
                onClick={handleRating}
                disableFillHover={true}
                initialValue={rating}
            />
        </div>
    )
}
export default RatingStar;