import { useRef, useState } from "react";
import { Container, Card, CardTitle, CardBody, Form, Button } from "reactstrap";
import { useUserRecord } from "../context/context";
const Sign = () => {
    const {login, register} = useUserRecord();
    const [active, setActive] = useState(null);
    const nameRef= useRef(null);
    const emailRef= useRef(null);
    const passRef = useRef(null);
  
    const handleSubmit =  (e) => {
  e.preventDefault();
  if (active === 1) {
    const name= nameRef.current.value;
    const email= emailRef.current.value;
    const password = passRef.current.value;
    register( email, password, name)
  setActive(null)
  }
  else{
    const email= emailRef.current.value;
    const password = passRef.current.value;
    login(email, password)
  }
    }
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <Card style={{boxShadow: "10px 10px 20px 5px black"}}>
          <CardTitle className="d-flex justify-content-between mb-0">
            <h3
              className={`text-uppercase fw-bold px-5 mb-0 py-2 ${
                active === 1 ? "active" : ""
              }`}
              style={{ letterSpacing: "5px", cursor: "pointer" }}
              onClick={() => setActive(1)}
            >
              register
            </h3>
            <h3
              className={`text-uppercase fw-bold px-5 mb-0 py-2 ${
                active !== 1 ? "active" : ""
              }`}
              style={{ letterSpacing: "5px", cursor: "pointer" }}
              onClick={() => setActive(2)}
            >
              login
            </h3>
          </CardTitle>
          <CardBody>{active === 1 ? 
          <div className="mt-3">
  <Form onSubmit={handleSubmit}>
  <div className="inputGroup mt-4">
      <input type="text" required  className= "p-3" ref={nameRef} autoComplete="off"/>
      <label  className="p-2">Name</label>
  </div>
  <div className="inputGroup mt-4">
      <input type="email" required  className= "p-3" ref={emailRef} autoComplete="off"/>
      <label  className="p-2">Email</label>
  </div>
  <div className="inputGroup mt-4">
      <input type="password" required  className= "p-3" ref={passRef} autoComplete="off"/>
      <label  className="p-2">Password</label>
  </div>
  <Button className="float-end mt-3 text-dark border-0 fs-4 zoom" outline color="none" style={{fontFamily: "monospace", letterSpacing: "5px"}}>
  Register
  </Button>
  </Form>
          </div> : <>
          <div className="mt-3">
  <Form onSubmit={handleSubmit}>
  
  <div className="inputGroup mt-4">
      <input type="email" required  className= "p-3" ref={emailRef} autoComplete="off"/>
      <label  className="p-2">Email</label>
  </div>
  <div className="inputGroup mt-4">
      <input type="password" required  className= "p-3" ref={passRef} autoComplete="off"/>
      <label  className="p-2">Password</label>
  </div>
  <Button className="float-end mt-3 text-dark border-0 fs-4 zoom" outline color="none" style={{fontFamily: "monospace", letterSpacing: "5px"}} >
  Login
  </Button>
  </Form>
          </div>
          </>}
          </CardBody>
        </Card>
      </div>
    );
  };
  export default Sign;