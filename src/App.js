import React from "react";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import { useState } from "react";
import { apiUrl, filterData } from "./data";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Spinner from "./components/Spinner";

const App = () => {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Category , setCategory] = useState(filterData[0].title)

  async function FetchData() {
    setLoading(true);
    try {
      let response = await fetch(apiUrl);
      let output = await response.json();

      setCourses(output.data);
    }
    catch (error) {
      toast.error("Something Went Wrong");
    }
    setLoading(false);
  }

  useEffect(() => {
    FetchData();
  }, []);

  // const emptycourse = []; checking id courses is empty then
  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div className=""><Navbar></Navbar></div>

      <div className = "">
        <div><Filter Category = {Category} filterData={filterData} setCategory = {setCategory} /></div>

        <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
          {
            loading ? (<Spinner />) : (<Cards courses={courses} Category = {Category} />)
          }
        </div>
      </div>
    </div>
  )
};

export default App;
