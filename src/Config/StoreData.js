import { ref, set } from "firebase/database";
import { database } from "../Firebase";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


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
            date:date
        })
navigate("/my-blogs")
         toast("Blog added successfully", {type: "success"})
    } catch (error) {
        return toast("Blog upload failed", {type: "error"})
    }
   

}
