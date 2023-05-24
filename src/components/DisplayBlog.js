import { Card, CardTitle , CardBody, Button, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {AiFillEdit, AiFillDelete} from "react-icons/ai"
import { useUserRecord } from "../context/context";
import { Link } from "react-router-dom";
import { deleteBlog } from "../Config/StoreData";

const Displayblog = (props) => {
  const {updatebtnClick, displayBlog} = useUserRecord();


   
    
  

return(
    <Card className="d-flex flex-md-row bg-transparent rounded  border border-dark border-4 mx-auto mx-md-0">
    
        <img src={props.image} alt="blog-image" className=" border border-white border-2  rounded-end listimg mx-auto mx-md-0 mt-2 mt-md-0" />
        <div className="ms-sm-5 my-md-auto">
        <CardTitle className=" fw-bold text-dark mt-2 fs-5 "
                        style={{ fontFamily: "serif" }}>
            {props.title}
        </CardTitle>
        <CardBody className="p-0">
            <div className="d-flex justify-content-between ">
              <div className="me-5">
              <p className="fw-bold text-uppercase pt-1" style={{fontSize: "12px"}}>-by <i className="text-blue"> {props.author}</i> posted on {props.date}</p>
              </div>  
            <p className="fw-bold ms-5">
                          Genre: 
                          <i className="fw-normal ms-3">
                           
                             {props.genre && props.genre.map((genre, index) => (
                              <span key={index}>
                                {genre}
                                {index + 1 === props.genre.length
                                  ? ""
                                  : ", "}
                              </span>
                            ))} 
                          </i>
                        </p>
            </div>
       
                        <p>{props.meta} <span className="text-decoration-underline" style={{cursor: "pointer"}}> <i> Read more... </i></span></p>
            
        </CardBody>
        </div>
        <div className="my-md-auto ms-auto d-flex">
            <Button className="fs-4 text-info rounded me-3 border-0 bg-transparent" outline onClick={()=> updatebtnClick(props.blogkey)} tag={Link} to= "/add-blog">
                <AiFillEdit/>
            </Button>
            {/* <Button className="fs-4 text-danger rounded me-3 border-0 bg-transparent" outline onClick={()=> deleteBlog(props.blogkey)}>
<AiFillDelete/>
            </Button> */}
              <UncontrolledDropdown
      className="me-2"
      direction="up"
    >
      <DropdownToggle className="bg-transparent text-danger border-0 fs-4"
      >
        <AiFillDelete/>
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => {deleteBlog(props.blogkey); displayBlog()}}>
          Confirm Delete
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown> 
        </div>
       
    </Card>
)
}
export default Displayblog;