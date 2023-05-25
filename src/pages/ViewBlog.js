import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUserRecord } from "../context/context";
import { Container } from "reactstrap";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { ToggleStar } from "../Config/StoreData";
import { toast } from "react-toastify";
const ViewBlog = () => {
  const [data, setData] = useState(null);
  const [isClick, setIsClick] = useState(false);
  const { blogs, displayBlog, isLike, setIsLike, token } = useUserRecord();
  const { blogid } = useParams();
  const BlogDetails = () => {
    if (blogs && blogid) {
      const Details = blogs.filter((id, index) => blogs[index][0] === blogid);
      setData(Details[0][1]);
    }
  };
  useEffect(() => {
    BlogDetails();
   
  }, [blogid]);


  const toggle = () => {
    
    if (token) {
      setIsClick(!isClick)
      if(!isClick && data){
        setIsLike({ blogid: blogid, likestatus: true });
        const likes = data.likeCount+1;
        ToggleStar(blogid, likes)
        displayBlog();
      }
      else{
        setIsLike({ blogid: blogid, likestatus: false});
        const likes = data.likeCount-1;
        ToggleStar(blogid, likes)
        displayBlog();
      }
    }
   else {
    toast("User is not logged In", {type: "error"})
   }
    
  };
 console.log(isLike)
 console.log(isClick)
  return (
    <Container className="pt-3">
      {blogid && (
        <div>
          <h2 className="text-center text-capitalize pb-2">
            {" "}
            {data.blog_title}
          </h2>

          <p
            className="fw-bold text-uppercase text-center py-3"
            style={{ fontSize: "14px" }}
          >
            -by <i className="text-blue"> {data.author}</i> posted on{" "}
            {data.date}
          </p>

          <div className="d-flex justify-content-center mt-3">
            <img
              src={data.imageURL}
              alt="blog image"
              title={data.blog_title}
              className="rounded-2 viewimg"
              style={{ maxWidth: "600px", maxHeight: "400px" }}
            />
          </div>

          <p className="fw-bold text-center mt-4">
            Genre:
            <i className="fw-normal ms-3 text-blue">
              {data.genre &&
                data.genre.map((genre, index) => (
                  <span key={index}>
                    {genre}
                    {index + 1 === data.genre.length ? "" : " | "}
                  </span>
                ))}
            </i>
          </p>

          <p className=" mt-4 fs-5"> {data.blog_data}</p>

          <p className=" fst-italic fs-5">
            {isLike ? "Liked :": " Like :"}
           {blogid && (
            <span className="fs-2 ms-5" style={{ cursor: "pointer" }} onClick={toggle} >
              {isLike.blogid === blogid && isLike.likestatus? <AiFillLike className="text-blue"/> : <AiOutlineLike />} 
            </span>
           )}
          </p>

          {/* <h3>Comments</h3> */}

        </div>
      )}
    </Container>
  );
};
export default ViewBlog;
