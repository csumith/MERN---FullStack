import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

function MovieApi({props}) {
    
    const [movie, setMovie] = useState([])
    const [data,setData] = useState([0])
    

    const increaseCounter = ()=> {
       // setVoting(voting+1)
       alert("hii")
    }
    
    useEffect(()=>{
        const getData = async () => {
            const inputParams = {
                category: "movies",
                language: "kannada",
                genre: "all",
                sort: "voting"
            }
         await  axios.post(`https://hoblist.com/api/movieList`, inputParams)
            .then((res) => {
                console.log(res.data.result);
                setMovie(res.data.result);
              })
              .catch((err) => toast.error(err.message));
        }

        
        

        getData()
      },[]);

      const handleVote =  ( x, type, movie) => {
        
        const dataTemp  =  data.map((id,movie) =>
       
        id === x
         ? {
             ...movie,
             totalVoted: type === "increment" ? movie.totalVoted + 1 : movie.totalVoted - 1,
           }
         : movie
       )
      
       setData(dataTemp)
      };

       const handler=()=>{
         prompt("my world")
       }
    
  return (
    <div className="container">
        <div className="row">
            <div className="col mt-5">
               
                <h1 className="text-center">
                    Movies List
                </h1>
            </div>
        </div>
        <div className="row">
            
           {
             movie.map((item,index)=> {
                const {language, _id, genre, title, director, stars, poster, voting, pageViews, releasedDate} = item
                return (
                    <div className="col-md-6" key={index}>
                    <div className="card" >

                        <div>sumit</div>
                        <div className="">
                            <div className='d-flex'>

                                <div className="d-flex align-content-center ">
                                    <button className='increment' onClick={()=>handleVote(_id, 'increment',item)}><i className="bi bi-arrow-up-circle-fill"></i>1</button>
                                    <h3 className='align-self-center p-3'>{voting}</h3>
                                    <button className='decrement' onClick={()=>handleVote(_id, 'decrement',item)}><i className="bi bi-arrow-down-circle-fill"></i>2</button>
                                </div>

                                <img src={poster} alt="" className="img-fluid p-2"  />

                                <div>
                                <div className="col" onClick={()=>handler()}><h2>{title}</h2></div>
                                <div className="col">Genre: {genre}</div>
                                <div className="col">Director: {director}</div>
                                <div className="col">Starring: {stars}</div>

                                <div className='d-flex'>
                                    <div className="col">Mins | {language} | {new Date(releasedDate).toDateString()}</div>                                    
                                </div>

                                <div>1</div>

                                <div className='d-flex'>
                                    <div className="col">{pageViews} Views | Voted by {voting} people</div>                                    
                                </div>

                                <div>2</div>

                                </div>

                            </div>
                        </div>
                        
                        

                        <button className="btn btn-primary">Watch Trailer</button>

                        
                        <div>sumit</div>
                    
                    </div>
                </div>
                )
            })
           }
        </div>
        
    </div>
  )
}

export default MovieApi