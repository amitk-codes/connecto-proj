import { useContext, useEffect } from "react";
import Post from "./home-posts";
import SideList from "./sideList";


const Home = () => {
  
  // setProgress(progress + 20)

  return (
    <>
      <div className="container-lg row row-cols-1 row-cols-lg-2 home-container d-flex justify-content-evenly">
        <SideList />
        <div className="ms-2 ms-lg-0">
          <Post />
        </div>
      </div>
    </>
  )
}
export default Home;