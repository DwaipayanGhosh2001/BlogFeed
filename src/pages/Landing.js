import React, { useEffect, useState } from "react";
import { Container, ListGroupItem, Card, CardBody, CardTitle, CardFooter, Button, Spinner } from "reactstrap";
import { useUserRecord } from "../context/context";
import { hover } from "@testing-library/user-event/dist/hover";
import { Link } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
const Home = () =>
{
    const {blogs} = useUserRecord();
 
return(
    <div>
 {blogs ?  (
        <Container fluid>
        <h2 className=" mt-3 mb-3 ps-sm-5 ps-2">Latest Blog Feed</h2>
<Container fluid>
    {blogs.map((item, index) => (
<ListGroupItem className="my-4  mx-auto wid">
<Card className="d-flex flex-md-row  rounded  border border-info border-3 mx-auto mx-md-0 text-white pb-2 pb-sm-0 px-3 px-sm-0" style={{backgroundColor : "rgba(0,0,0,0.5)"}}>
    
    <img src={item[1].imageURL} alt="blog-image" title={item[1].blog_title} className=" border border-white border-2 rounded-end landimg mx-auto mx-md-0 mt-2 mt-md-0" />
    <div className="ms-sm-5 my-md-auto mx-auto">
    <CardTitle className=" fw-bold  mt-2 fs-5 "
                    style={{ fontFamily: "inherit" }}>
        {item[1].blog_title}
    </CardTitle>
    <CardBody className="p-0">
        <div className="d-md-flex justify-content-between ">
          <div className="me-md-5">
          <p className="fw-bold text-uppercase pt-1" style={{fontSize: "12px"}}>-by <i className="text-blue"> {item[1].author}</i> posted on {item[1].date}</p>
          </div>  
        <p className="fw-bold ">
                      Genre: 
                      <i className="fw-normal ms-3">
                       
                         {item[1].genre && item[1].genre.map((genre, index) => (
                          <span key={index}>
                            {genre}
                            {index + 1 === item[1].genre.length
                              ? ""
                              : ", "}
                          </span>
                        ))} 
                      </i>
                    </p>
        </div>
   
                    <p>{item[1].meta_tag}</p>
                    <p className=""><AiFillLike/> {item[1].likeCount}</p>
        
    </CardBody>
    </div>
    <Button className="my-auto rounded text-white border-3 border me-3 border-danger mx-auto " tag={Link} to={`blog-details/${item[0]}`} outline style={{backgroundColor:hover="transparent"}}>
        Read More
    </Button>
</Card> 
</ListGroupItem>


))}
    

</Container>
    </Container>
    ): (
        <>
        
        <h5 className="text-center mt-5 pt-5">
        <Spinner className="me-3"/>
            Loading...</h5>
        </>
    ) }
    </div>
   
   
)
}
export default Home;