import { useState , useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import Card from "./Card";

const Cards = (props) => {
    let courses = props.courses;
    let Category = props.Category;

    const[LikedCourses , setLikedCourses] = useState([]);
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        if (scrollTop > 200) { 
            setShowScrollToTop(true);
        } else {
            setShowScrollToTop(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    function getCourses(){
        if(Category === "All") {
            let allcourses = [];
            Object.values(courses).forEach(array => {
                array.forEach(courseData => {
                    allcourses.push(courseData);
                })
            })
            return allcourses;
        }
        else {
            // main sirf specific category kaa data pass karunga
            return courses[Category] || []; // Added a fallback in case courses[Category] is undefined
        }
    }

    return (
        <div>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
                {
                    getCourses().map((course) => (
                        <Card
                            key={course.id}
                            course={course}
                            LikedCourses={LikedCourses}
                            setLikedCourses={setLikedCourses}
                        />
                    ))
                }
            </div>
            {showScrollToTop && (
                <button className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full" onClick={scrollToTop}>
                    <FaArrowUp /> 
                </button>
            )}
        </div>
    )
}

export default Cards;
