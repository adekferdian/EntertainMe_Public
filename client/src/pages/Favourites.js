import React from 'react'
import { CardFav } from '../components/CardFav'
import 'react-pro-sidebar/dist/css/styles.css';
import { client } from '../config/client'
import { GET_FAVOURITES } from '../queries/favouritesQuery'

export const Favourites = () => {
    const  {favourites} = client.readQuery({
        query: GET_FAVOURITES
    })
    const styles = {
      row: {
          width: '95%',
          height: '450px',
          overflow: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          margin: 'auto',
          minHeight: '69vh'
      }
    }
    return (
      <>
        <div className="row mb-5">
        <div className="col-10">
          <h1 className="text-white" style={{fontSize:23, fontFamily: 'Impact, Charcoal, sans-serif'}}> Favorited Movies </h1>
        </div>
      </div>
        <div className="row" style={styles.row}>
        {
          favourites.map( movie => {
            return (
              <div className="col-3" key={movie._id}> 
                <CardFav data={movie} path={"movies"}/>
              </div>
              )
            })
        }
        </div>
      </>
    )
}