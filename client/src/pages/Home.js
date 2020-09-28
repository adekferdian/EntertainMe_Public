import React from 'react'
import { GET_ALL } from '../queries/generalQuery'
import { useQuery } from '@apollo/client'
import { Card } from '../components/Card'
import { Link } from 'react-router-dom'

export const Home = () => {
    const { loading, error, data } = useQuery(GET_ALL)

    if (loading) {
        return (
            <p> loading ..</p>
        )
    }

    setTimeout(() => {
        return <h1 className="text-white"> loading </h1>
    }, 10000);

    if (error) {
        return <p> {JSON.stringify(error)} </p>
    }
    console.log(data, '<<<<')

    const styles = {
        row: {
            width: '95%',
            height: '450px',
            overflow: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            margin: 'auto'
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
                {data.movies.map(movie => {
                    return (
                        <div className="col-3">
                            <Card data={movie} key={movie._id} path={"movies"} />
                        </div>
                    )
                })
                }
            </div>
            <hr style={{ backgroundColor: 'red', width: '70%' }} />

            <h1 className="text-white mb-3  mt-5" style={{ fontSize: 23, fontFamily: 'Impact, Charcoal, sans-serif' }}> Trending TV Series</h1>
            <div className="row" style={styles.row}>
                {data.allTvSeries && data.allTvSeries.slice(0, 4).map(tv => {
                    return (
                        <div className="col-3">
                            <Card data={tv} key={tv._id} path={"tvSeries"} />
                        </div>
                    )
                })
                }
            </div>
        </>
    )
}