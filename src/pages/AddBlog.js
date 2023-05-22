import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
} from "reactstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import {
  uploadBytesResumable,
  getDownloadURL,
  ref as ref_Storage,
} from "firebase/storage";
import { readAndCompressImage } from "browser-image-resizer";
import { storage } from "../Firebase";
import { BlogDetails } from "../Config/StoreData";
import { useUserRecord } from "../context/context";
const AddBlog = () => {
  const { token, displayBlog } = useUserRecord();
  const [active, setActive] = useState(false);
  const toggle = () => {
    setActive(!active);
  };
  const titleRef = useRef(null);
  const blogRef = useRef(null);
  const metaRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [click, setClick] = useState([]);
  const genre = [
    "Sports",
    "Travel",
    "Finance",
    "Nature",
    "Education",
    "Global",
    "Technology",
  ];
  const imageConfig = {
    quality: 0.2,
    maxWidth: 800,
    maxHeight: 600,
    autoRotate: true,
  };

  const discard = (id) => {
    const find = click.find((item) => item === id);
    if (find !== id) {
      setClick([...click, genre[id]]);
    } else {
      const filter = click.filter((item) => item !== id);
      setClick(filter);
    }
  };
const clear = () => {
titleRef.current.value=null;
blogRef.current.value=null;
metaRef.current.value=null;
setDownloadUrl(null);
setClick([]);
}
const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const navigate= useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const blog = removeTags(blogRef.current.value);
    const image = downloadUrl;
    const meta = metaRef.current.value;
    if (title && blog) {
      BlogDetails(token, title, blog, image, meta, click, date, navigate);
      displayBlog();
    } else {
      alert("Incomplete details of the Blog");
    }
  };

  const removeTags = (str) => {
    return str.replace(/<[^>]+>/g, "");
  };

  const imagePicker = async (e) => {
    // TODO: upload image and set D-URL to state
    try {
      //Here we are grabing the upload file from files and taking array index 0 to get the upload path.
      const file = e.target.files[0];
      //Metadata of the image.
      var metadata = {
        contentType: file.type,
      };
      // Resizing the uploaded image.
      let resizeImage = await readAndCompressImage(file, imageConfig);

      //Store the image in the Firebase storage by grabbing the reference.

      const storageRef = ref_Storage(storage, "images/" + file.name);

      var uploadTask = uploadBytesResumable(storageRef, resizeImage, metadata);

      //Using the Firebase On event to make changes on any change in the upload.

      uploadTask.on(
        "state-changed",
        (snapshot) => {
          setIsUploading(true);
          // Keeping the progress of the uploading
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              setIsUploading(false);
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
          //Checking if the file is uploaded or not.
          if (progress === 100) {
            setIsUploading(false);
            toast("Image uploaded", { type: "success" });
          }
        },
        // Error will be thrown if there is no snapshot at State change.
        (error) => {
          toast("Something went wrong while uploading", { type: "error" });
        },
        // Firebase allows you to have callback function to do further task after file uploading.
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            // Here we are generating a download url of the image and storing it in our state
            .then((download) => {
              setDownloadUrl(download);
              console.log("File available at", download);
            });
        }
      );
    } catch (error) {
      console.error(error);
      toast("Something went wrong", { type: "error" });
    }
  };
  return (
    <Container className="  w-75 pb-5">
      <div className="pb-5">
        <Button className={`px-3 rounded  bg-success me-5`} onClick={handleSubmit}>Save</Button>
        <Button className={`px-3 rounded  bg-danger`} onClick={clear}>Discard</Button>
      </div>
      <div>
        <h5 className="ms-md-3 pb-3">Title</h5>
        <Input
          type="text"
          placeholder="Title of the Blog"
          className="py-2 border-dark border border-1"
          innerRef={titleRef}
          required
        />
        <h5 className="ms-md-3 py-3">Meta Description</h5>
        <Input
          type="textarea"
          placeholder="Write a short meta description for your blog"
          className="py-2 border-dark border border-1"
          innerRef={metaRef}
          required
        />
        <h5 className="ms-md-3 py-3">Write your blog here</h5>
        <ReactQuill
          ref={blogRef}
          required
          className="bg-white border-dark border border-1"
        />
        <div className="d-sm-flex  my-4">
          <div className=" w-100">
            <Card className="border border-4 border-white rounded bg-transparent ms-md-3 p-3 ">
              <CardTitle className="fs-5 fw-bold text-center">
                Add Image
              </CardTitle>
              <CardBody className="mx-auto">
                {isUploading ? (
                  <Spinner type="grow" color="primary" />
                ) : (
                  <div>
                    <label>
                      <img
                        src={downloadUrl}
                        alt=""
                        className="border border-4 border-dark rounded"
                        style={{ width: "200px", height: "120px" }}
                      />
                      <input
                        type="file"
                        name="image"
                        id="imagepicker"
                        accept="image/*"
                        multiple={false}
                        onChange={(e) => imagePicker(e)}
                        className="d-none"
                        required
                      />
                    </label>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
          <div className="  w-100 mt-4 mt-sm-0">
            <Card className="border border-4 border-white rounded bg-transparent ms-md-3 p-3 ">
              <CardTitle className="fs-5 fw-bold text-center">Genre</CardTitle>
              <CardBody className=" d-flex flex-wrap">
                {genre.map((item, index) => (
                  <div key={index}>
                    <FormGroup>
                      <Input
                        type="checkbox"
                        onChange={() => discard(index)}
                        required
                      />
                      <Label className="px-3"> {item}</Label>
                    </FormGroup>
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default AddBlog;
