import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Link, useParams, useLocation, useHistory } from 'react-router-dom'
import { GET_ONE_MOVIE, GET_MOVIES, DELETE_MOVIE } from '../queries/moviesQuery'
import { GET_ONE_TVSERIES } from '../queries/tvSeriesQuery'
import { GET_FAVOURITES } from '../queries/favouritesQuery'
import { client } from '../config/client'
import { GiSelfLove } from 'react-icons/gi'
import { FaRegSave, FaRegTrashAlt, FaTags } from 'react-icons/fa'
import { RiStarSmileLine } from 'react-icons/ri'
import Swal from 'sweetalert2'

export const Details = () => {
    const { id } = useParams()
    const history = useHistory()
    const location = useLocation()

    const { loading, data } = useQuery(
        location.pathname.includes('/movies') ? GET_ONE_MOVIE : GET_ONE_TVSERIES
        , { variables: { selectedId: id } })

    const [deleteMovie] = useMutation(DELETE_MOVIE,
        {
            refetchQueries: [{
                query: GET_MOVIES
            }],
            variables: {
                access_token : localStorage.access_token
            }
        }
    );

    const doDeleteMovie = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteMovie({ variables: { selectedId: data.movie._id } })
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                history.push('/movies')
            }
          })
    }

    const addToFav = () => {
        Swal.fire({
            text: "Are you sure add to Favourites? ",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    const { favourites: currentFav } = client.readQuery({
                        query: GET_FAVOURITES
                    })
                    client.writeQuery({
                        query: GET_FAVOURITES,
                        data: {
                            favourites: currentFav.concat(data.movie)
                        }
                    })
                    Swal.fire(
                        'Succes!',
                        'Your file has been saved.',
                        'success'
                    )
                    history.push('/favorites')
                }
            })
        
    }

    const removeFromFav = (selectedId) => {
        console.log(selectedId, '---<<<<');
        const { favourites: currentFav } = client.readQuery({
            query: GET_FAVOURITES
        })

        client.writeQuery({
            query: GET_FAVOURITES,
            data: {
                favorites: currentFav.filter(fav => fav._id !== selectedId)
            }
        })
        history.push('/favorites')
    }

    if (loading) {
        return <p> please wait ..</p>
    }
    const styles = {
        row: {
            width: '95%',
            height: '400px',
            overflow: 'auto',
            margin: 'auto'
        },
        favThis: {
            position: 'absolute',
            left: '46%',
            top: '100%',
        },
        update: {
            position: 'absolute',
            left: '54%',
            border: '1px solid',
            backgroundColor: '#efefef',
            textDecoration: 'none',
            color: 'black',
            top: '100%',
        },
        del: {
            position: 'absolute',
            left: '61%',
            top: '100%',
        },
        tags: {
            height: '100px',
            lineHeight: '1.2',
            width: '150px',
            margin: 'auto',
            position: 'absolute',
            left: '58%'
        },
        rating: {
            height: '100px',
            lineHeight: '3',
            width: '150px',
            margin: 'auto',
            position: 'absolute',
            left: '44%'
        }
    }
    if (location.pathname.includes('/movies')) {
        return (
            <>
                <div className="row mt-5 ml-4" >
                    <div className="col-4">
                        <img src={data.movie.poster_path} className="card-img-top" style={{ width: 400, height: '300px', boxShadow: '1px 2px 30px 8px rgba(0,0,0,0.61)' }} alt={data.movie.title} />
                    </div>
                    <div className="col-6" >
                        <div className="card" style={{ backgroundColor: "transparent", borderRight: '12px #021e47 inset' }}>
                            <div className="card-body text-white">
                                <a href="">
                                    <h5 className="card-title text-white" style={{ fontSize: "30px" }}>{data.movie.title?.toUpperCase()}</h5>
                                </a>
                                <p className="card-text">{data.movie.overview}</p>
                                <div className="row mt-4 mb-2">
                                    <div className="col-4 text-center" style={styles.rating}>
                                        <p style={{ backgroundColor: '#0f3f5f', borderTop: '2px solid white' }} className="card-text"><RiStarSmileLine style={{ marginBottom: '5px', fontSize: '37px' }} />  {data.movie.popularity}</p>
                                    </div>
                                    <div className="col-4 text-center" style={styles.tags}>
                                        <p style={{ backgroundColor: '#0f3f5f', borderTop: '2px solid white' }} className="card-text"><FaTags style={{ fontSize: '37px' }} /> {data.movie.tags + " "}</p>
                                    </div>
                                </div>
                                <div className="row" style={styles.row}>
                                    {location.fromFav ?
                                        <div className="col-8">
                                            <button className="btn btn-danger mr-4 font-weight-bold" onClick={() => removeFromFav(data.movie._id)} > <GiSelfLove style={{ marginBottom: '2px' }} /> Remove from Fav </button>
                                        </div>
                                        :
                                        <>
                                            <div className="col-8">
                                                <button className="btn btn-light mr-4 font-weight-bold" style={styles.favThis} onClick={() => addToFav()} > <GiSelfLove style={{ marginBottom: '2px' }} /> Fav this ! </button>
                                                <Link className="btn btn-info mr-4 font-weight-bold" style={styles.update} to={`/movies/update/${data.movie._id}`}> <FaRegSave style={{ marginBottom: '3px' }} /> Update </Link>
                                            </div>
                                            <div className="col-4 text-right">
                                                <button className="btn btn-danger mr-4 font-weight-bold" style={styles.del} onClick={() => doDeleteMovie()}> <FaRegTrashAlt style={{ marginBottom: '3px' }} /> Delete </button>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="row mt-5 ml-4" >
                    <div className="col-4">
                        <img src={data.tvSeries.poster_path} className="card-img-top" style={{ width: 400, boxShadow: '1px 2px 30px 8px rgba(0,0,0,0.61)' }} img={data.tvSeries.title} />
                    </div>
                    <div className="col-6" >
                        <div className="card" style={{ backgroundColor: "transparent", borderRight: '12px #021e47 inset' }}>
                            <div className="card-body text-white">
                                <a href="">
                                    <h5 className="card-title text-white" style={{ fontSize: "30px" }}>{data.tvSeries.title.toUpperCase()}</h5>
                                </a>
                                <p className="card-text">{data.tvSeries.overview}</p>
                                <div className="row mt-4">
                                    <div className="col-4 text-center" style={{ height: '100px', lineHeight: '5' }}>
                                        <p style={{ backgroundColor: '#0f3f5f', borderTop: '2px solid white' }} className="card-text"><RiStarSmileLine style={{ marginBottom: '5px', fontSize: '37px' }} />  {data.tvSeries.popularity}</p>
                                    </div>
                                    <div className="col-4 text-center" style={{ height: '100px', lineHeight: '5' }}>
                                        <p style={{ backgroundColor: '#0f3f5f', borderTop: '2px solid white' }} className="card-text"><FaTags style={{ fontSize: '37px' }} /> {data.tvSeries.tags + " "}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}