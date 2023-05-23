import { Card, CardTitle , CardBody, Button} from "reactstrap";
import {AiFillEdit, AiFillDelete} from "react-icons/ai"
import { useUserRecord } from "../context/context";
import { Link } from "react-router-dom";

const Displayblog = (props) => {
  const {updatebtnClick} = useUserRecord();
return(
    <Card className="d-flex flex-row bg-transparent rounded  border border-dark border-4">
    
        <img src={props.image} alt="blog-image" className="rounded border border-dark listimg" />
        <div className="ms-sm-5">
        <CardTitle className=" fw-bold text-dark mt-2 fs-4 "
                        style={{ fontFamily: "serif" }}>
            {props.title}
        </CardTitle>
        <CardBody className="p-0">
            <div className="d-flex justify-content-between ">
              <div className="me-5">
              <p className="fw-bold text-uppercase" style={{fontSize: "12px"}}>by {props.author} posted on {props.date}</p>
              </div>  
            <p className="fw-bold ms-5">
                          Genre: 
                          <i className="fw-normal ms-3">
                           
                            {/* {props.genre.map((genre, index) => (
                              <span key={index}>
                                {genre}
                                {index + 1 === props.genre.length
                                  ? ""
                                  : ", "}
                              </span>
                            ))} */}
                          </i>
                        </p>
            </div>
       
                        <p>{props.meta} <span className="text-decoration-underline" style={{cursor: "pointer"}}> <i> Read more... </i></span></p>
            
        </CardBody>
        </div>
        <div className="my-md-auto ms-auto">
            <Button className="fs-4 text-info rounded me-3 border-0 bg-transparent" outline onClick={()=> updatebtnClick(props.blogkey)} tag={Link} to= "/add-blog">
                <AiFillEdit/>
            </Button>
            <Button className="fs-4 text-danger rounded me-3 border-0 bg-transparent" outline>
<AiFillDelete/>
            </Button>
        </div>
       
    </Card>
)
}
export default Displayblog;