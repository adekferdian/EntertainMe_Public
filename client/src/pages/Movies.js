import React from 'react'
import { GET_MOVIES } from '../queries/moviesQuery'
import { useQuery } from '@apollo/client'
import { Card } from '../components/Card'
import { useLocation, Link } from 'react-router-dom'
import 'react-pro-sidebar/dist/css/styles.css';

export const Movies = () => {
    const { pathname } = useLocation()
    const { loading, error, data } = useQuery(GET_MOVIES)

    if (loading) {
        return <p> loading ..</p>
    }

    if (error) {
        return <p> {JSON.stringify(error)} </p>
    }

    const styles = {
        row: {
            width: '95%',
            height: '450px',
            overflow: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            margin: 'auto',
            minHeight: '67vh'
        }
    }

    return (
        <>
            <div className="row mb-5">
                <div className="col-10">
                    <h1 className="text-white" style={{ fontSize: 23, fontFamily: 'Impact, Charcoal, sans-serif' }}> Trending Movies</h1>
                </div>
                <div className="col-2" style={{ paddingLeft: '7%', position: 'relative', left: '34.6%', top: '20%' }}>
                <Link className="btn" style={{ backgroundColor: '#006678', borderColor: '2px #006678', color: "white", textDecoration: 'none' }} to={'/addMovie'}> <b>Add Movie</b></Link>
                </div>
            </div>
            <div className="row" style={styles.row}>
                {
                    data.movies.map(movie => {
                        return (
                            <div className="col-3" key={movie._id}>
                                <Card data={movie} path={pathname} key={movie._id} />
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}