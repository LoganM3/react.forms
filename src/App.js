
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [title,setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [author,setAuthor] = useState("todd albert")
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [validForm, setValidForm] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")


  useEffect(()=>{
    if (title.length > 3 && description.length > 10){
      setValidForm(true)
    }else {
      setValidForm(false)
    }
  },[title,description,author])

  // console.log(title)

   async function formSubmit(e){
     e.preventDefault();

    if(!validForm){
      setErrorMessage("Not a valid form")
      return
    }
     
    

    try{
    console.log("form submitted")

    // const comment = {
    //     title: title,
    //     description:description,
    //     author:author
    // }
    const comment = {
      title,
      description,
      author,
  }

    console.log(comment)
    //really submit it to an api
    const results = await fetch("https://sql.bocacode.com/comments",{
      method:"POST",
      headers:{
        "Content-Type": "Application/json"
      },
      body:JSON.stringify(comment)
    });
    console.log(results)
    const data = await results.json();

    console.log(data)

    setFormSubmitted(true)
    setErrorMessage("")
    setValidForm(true)
    alert('wow!submitted')
   }
   catch(error){
     console.error(error)
     setErrorMessage("there was an error submitting your comment", + error.toString())
    }
   }
  

  return (
    <div className='app'>
        <form onSubmit={formSubmit}>
           <h1>Comments</h1>
           {/* here goes the title */}
           <label>Title</label>
           <input type="text" 
         
           value={title}
           onChange={(e)=>{setTitle(e.target.value)}}
           />
           <h3>{title}</h3>
          {/* this is the description */}
           <label>Description</label>
           <textarea
           value={description}
           onChange={(e)=>{setDescription(e.target.value)}}/>
           <h3>{description}</h3>
            
          {/* This is the author */}
          <label>Author</label>
          <select value={author}
          onChange={(e)=>{setAuthor(e.target.value)}}>
            <option value="" selected>Choose One</option>
            <option value="todd albert">Doctor Todd</option>
            <option value="ludwigson">Ludwigson</option>
          </select>
          <h3>{author}</h3>

          {!formSubmitted &&
          <button>Submit Form</button>
          }
          {errorMessage && 
             <h1>There was and error:<br/>{errorMessage}</h1>
          }


      </form>

    </div>
  );
}

export default App;
