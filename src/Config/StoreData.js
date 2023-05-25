import { ref, remove, set, update, get , runTransaction } from "firebase/database";
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

export async function BlogDetails (uid, title, blog, image, meta ,genre, date, author , likeCount, navigate) {
   
    try {
        await set(ref(database, `blogs/`+v4()), {
            uid: uid,
            blog_title: title,
            blog_data:blog,
            imageURL: image,
            meta_tag: meta,
            genre:genre,
            date:date,
            author: author, 
            likeCount: likeCount
        })
navigate("/my-blogs")
         toast("Blog added successfully", {type: "success"})
    } catch (error) {
        return toast("Blog upload failed", {type: "error"})
    }
   

}
export async function UpdateBlogDetails (title, blog, image, meta , date, navigate, blogid) {
    try {

        const updateRef= ref(database, 'blogs/' + blogid)
        console.log(updateRef)
     await update(updateRef, 
        {
            
            blog_title: title,
            blog_data:blog,
            imageURL: image,
            meta_tag: meta,
            date:date,
        }
        )
        navigate("/my-blogs")
         toast("Blog updated successfully", {type: "success"})
        
      } 
      catch (error) {
        console.log(error)
        toast("Blog Update Failed",{type:"error"})
      }
}

export async function deleteBlog (blogid) {
try {
    const deleteRef = ref(database, 'blogs/' + blogid)
    await remove(deleteRef)
    toast("Blog deleted", {type: "success"})
} catch (error) {
    toast("Blog deletion failed", {type: "error"})
}
}
// export async function checkCollectionExists(collectionName) {
//     try {
//       const collectionRef = ref(database, collectionName);
//       const dataSnapshot = await get(collectionRef);
//       return dataSnapshot.exists(); // Returns true if the collection exists and has data
//     } catch (error) {
//       console.error('Error checking collection existence:', error);
//       // Handle the error appropriately
//     }
//   }


export async function ToggleStar(blogid, likes) {

  try {
  const postRef = ref( database, 'blogs/' + blogid );
  await update(postRef, 
    {
        
        likeCount: likes
    }
    )
    
  } 
  catch (error) {
    console.log(error)
  }

}