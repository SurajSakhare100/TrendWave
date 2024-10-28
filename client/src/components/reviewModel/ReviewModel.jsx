import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function ReviewModel() {
    const [rating, setRating] = useState(0);
    const {productId}=useParams();
    const handleRating = (value) => {
        setRating(value);
        handleRatingSubmit(value);
    };
    useEffect(() => {
        document.getElementById('my_modal_5').showModal()
    }, [])

    const handleRatingSubmit = (rating) => {
        axios
          .post(`http://localhost:5000/api/v1/products/${productId}/rate`, {  rating },{withCredentials:true})
      };
    return (
        <div className=''>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box flex flex-col gap-4">
                    <h3 className="font-bold text-lg">Review Our Products!</h3>
                    <div className="rating" >
                        {[1, 2, 3, 4, 5].map((star) => (
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400"
                                key={star}
                                style={{ cursor: "pointer", color: star <= rating ? "gold" : "bg-orange-400" }}
                                onClick={() => handleRating(star)}
                            />
                        ))}
                    </div>
                    <textarea className="textarea textarea-bordered  h-24" placeholder="Bio"></textarea>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    )
}

export default ReviewModel
