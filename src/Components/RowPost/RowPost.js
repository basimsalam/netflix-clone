import React, { useEffect, useState } from 'react'
import './RowPost.css';
import axios from '../../axios' 
import { API_KEY, imageUrl } from '../../constants/constants';
import Youtube from 'react-youtube'

function RowPost(props) {
  const [movies,setMovies] = useState([])
  const [urlId,seturlId] = useState('')


  useEffect(()=>{
    axios.get(props.url).then((response)=>{
      
      setMovies(response.data.results)
    }).catch(err=>{
      alert('Network Error')
    }, [props.url]);


  })
  const opts ={
    height:'390',
    width:'100%',
    playerVars:{
      autoplay:1,
    },
  };

  const handleMovie=(id)=>{
    console.log(id)
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
      console.log(response.data)
      if(response.data.results.length!==0){
        seturlId(response.data.results[0])
      }
      else{
        console.log("No Trailer Available")
      }
    })
  }

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'> 
        {movies.map((obj)=>
          <img onClick={()=>handleMovie(obj.id)} className={ props.isSmall ? "smallposter": "poster"} src={`${imageUrl+obj.backdrop_path}`} alt="poster" />

        )}
        
      </div>
      { urlId && <Youtube opts={opts} videoId={urlId.key}/>}
    </div>
  )
}

export default RowPost
