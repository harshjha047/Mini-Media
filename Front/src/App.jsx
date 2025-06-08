// npm run dev
import axios from "axios";
import { useState } from "react"

function App() {
const [file,setFile]= useState();
const upload = () => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('caption', "my post")

  axios.post("http://localhost:3000/api/posts/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  })
  .then(res => {
    console.log("Upload success:", res.data)
  })
  .catch(err => {
    console.error("Upload failed:", err)
  })
}


  return (
    <>
   <input type="file" onChange={(e)=>{setFile(e.target.files[0])}} />
   <button onClick={upload}>Upload</button>
    </>
  )
}

export default App
