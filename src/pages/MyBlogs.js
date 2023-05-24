import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Button,
  Container,
  ListGroup,
  ListGroupItem,
  Spinner,
} from "reactstrap";
import { useUserRecord } from "../context/context";
import Displayblog from "../components/DisplayBlog";
import { checkCollectionExists } from "../Config/StoreData";
const UserBlogs = () => {
  const [userblogs, setUserBlogs] = useState([]);
  const { blogs, token, user } = useUserRecord();

  const fetchUserBlogs = () => {
    if (blogs && token) {
      const element = blogs.filter(
        (id, index) => blogs[index][1]?.uid === token
      );

      setUserBlogs(element);
    }
  };

  useEffect(() => {
    fetchUserBlogs();
  }, [blogs, token]);

  
  return (
    <div>
      <Container className="d-flex justify-content-between">
        <h2 className=""> Your Blogs</h2>
      </Container>
      {blogs && user ? (
        <div>
          {userblogs.length === 0 ? (
            <h1 className={`text-center`}>No blogs available</h1>
          ) : (
            <>
              <Container className={`mt-4`}>
                {userblogs.map((item, index) => (
                  <ListGroupItem key={index} className="py-3 mx-auto">
                    <Displayblog
                      title={userblogs[index][1]?.blog_title}
                      image={userblogs[index][1]?.imageURL}
                      content={userblogs[index][1]?.blog_data}
                      meta={userblogs[index][1]?.meta_tag}
                      genre={userblogs[index][1]?.genre}
                      date={userblogs[index][1]?.date}
                      blogkey={userblogs[index][0]}
                      author={userblogs[index][1]?.author}
                    />
                  </ListGroupItem>
                ))}
              </Container>
            </>
          )}
        </div>
      ) : (
        <>
        {blogs === null ? (
           <h1 className={`text-center`}>No blogs available</h1>
        ): (<>
         <div className="d-flex justify-content-center mt-5 pt-5">
            <Spinner>Loading...</Spinner>
          </div>
        </>)}
         
        </>
      )}

      <Container></Container>
    </div>
  );
};
export default UserBlogs;
