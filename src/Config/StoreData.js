import { ref, set, update } from "firebase/database";
import { database } from "../Firebase";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUserRecord } from "../context/context";


export async function StoreUser (uid, name, email) {
   
        await set(ref(database, 'users/'+uid), {
            username: name,
            email:email
        })

}

export async function BlogDetails (uid, title, blog, image, meta ,genre, date, navigate) {
   
    try {
        await set(ref(database, `blogs/`+v4()), {
            uid: uid,
            blog_title: title,
            blog_data:blog,
            imageURL: image,
            meta_tag: meta,
            genre:genre,
            date:date,
        })
navigate("/my-blogs")
         toast("Blog added successfully", {type: "success"})
    } catch (error) {
        return toast("Blog upload failed", {type: "error"})
    }
   

}
export async function UpdateBlogDetails (title, blog, image, meta ,genre, date, navigate, blogid) {
const {setIsUpdate} = useUserRecord();
    try {

        const updateRef= ref(database, 'blogs/' + blogid)
        console.log(updateRef)
     await update(updateRef, 
        {
            
            blog_title: title,
            blog_data:blog,
            imageURL: image,
            meta_tag: meta,
            genre:genre,
            date:date,
        }
        )
        navigate("/my-blogs")
        setIsUpdate(false)
         toast("Blog updated successfully", {type: "success"})
        
      } 
      catch (error) {
        console.log(error)
        toast("Blog Update Failed",{type:"error"})
      }
}
