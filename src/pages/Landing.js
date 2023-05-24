import React from "react";
import { Container, ListGroupItem, Card, CardBody, CardTitle, CardFooter, Button } from "reactstrap";
import { useUserRecord } from "../context/context";
import { hover } from "@testing-library/user-event/dist/hover";
import { Link } from "react-router-dom";
const Home = () =>
{
    const {blogs} = useUserRecord();
    console.log(blogs)
return(
    <div>
 {blogs ?  (
        <Container>
        <h1 className="text-center mt-5"style={{fontFamily:"serif"}}>Latest Blog Feed</h1>
<Container >
    { blogs.map((item, index) => (
<ListGroupItem className="my-4  mx-auto wid">
<Card className="d-flex flex-md-row  rounded  border border-dark border-2 mx-auto mx-md-0 text-white" style={{backgroundColor : "rgba(0,0,0,0.5)"}}>
    
    <img src={item[1].imageURL} alt="blog-image" title={item[1].blog_title} className=" border border-white border-2  rounded-end landimg mx-auto mx-md-0 mt-2 mt-md-0" />
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
        
    </CardBody>
    </div>
    <Button className="my-auto rounded text-white border-3 border me-3 border-danger mx-auto" tag={Link} to={`blog-details/${item[0]}`} outline style={{backgroundColor:hover="transparent"}}>
        Read More
    </Button>
</Card> 
</ListGroupItem>


))}
    

</Container>
    </Container>
    ): (
        <>
        <h1>Loading...</h1>
        </>
    ) }
    </div>
   
   
)
}
export default Home;