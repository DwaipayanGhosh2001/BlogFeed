import { Card, CardTitle , CardBody, Button} from "reactstrap";
import {AiFillEdit, AiFillDelete} from "react-icons/ai"

const Displayblog = (props) => {
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
                <p className="me-5">{props.date}</p>
            <p className="fw-bold">
                          Genre:
                          <i className="fw-normal ms-3">
                            {props.genre.map((genre, index) => (
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
        <div className="my-md-auto ms-auto">
            <Button className="fs-4 text-info rounded me-3 border-0 bg-transparent" outline >
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