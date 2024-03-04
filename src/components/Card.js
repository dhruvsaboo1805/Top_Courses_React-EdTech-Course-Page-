import React from 'react'
import {FcLike , FcLikePlaceholder} from "react-icons/fc";
import { toast } from 'react-toastify';

const Card = (props) => {
    let course = props.course;
    let LikedCourses = props.LikedCourses;
    let setLikedCourses = props.setLikedCourses;

    const clickHandler = () => {
        if(LikedCourses.includes(course.id))
        {
            // then liked
           setLikedCourses( (prev) => prev.filter( (cid) => (cid !== course.id)));
           toast.warning("Like Removed");
           
        }
        else
        {
            //not liked
            // insert karna jo liked nhi hain
            if(LikedCourses.length === 0)
            {
                setLikedCourses([course.id]);
            }
            else{
                setLikedCourses((prev) => [...prev, course.id]);
            }
            toast.success("Like Successfully");
        }
    }
  return (
    <div className = "w-[300px] bg-bgDark bg-opacity-80 rounded-md overflow-hidden">
        <div className = "relative">
            <img src={course.image.url} alt="" />
        
            <div className = "w-[40px] h-[40px] bg-white rounded-full absolute right-2 bottom-2 grid place-items-center">
                <button onClick = {clickHandler}>
                   {
                       !LikedCourses.includes(course.id) ? (<FcLikePlaceholder fontSize = "1.75em"/>) : (<FcLike fontSize = "1.75em"/>)
                   }
                </button>
            </div>
        </div>
        <div className = "p-4">
            <p className = "text-white font-semibol text-lg leading-6">{course.title}</p>
            <p className = "text-white mt-2">
                {
                    course.description.length > 100 ? (course.description.substr(0 , 100)) + "..." : (course.description)
                }
            </p>
        </div>
    </div>
  )
}

export default Card
