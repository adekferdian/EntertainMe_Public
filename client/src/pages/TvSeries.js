import React from 'react'
import { GET_TVSERIES } from '../queries/tvSeriesQuery'
import { useQuery } from '@apollo/client'
import { Card } from '../components/Card'
import { useLocation } from 'react-router-dom'
import 'react-pro-sidebar/dist/css/styles.css';

export const TvSeries = () => {
    const { pathname } = useLocation()
    const { loading, error, data } = useQuery(GET_TVSERIES)

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
            minHeight: '69vh'
        }
    }

    console.log(data, '---------');
    return (
        <>
            <h1 className="text-white mb-5" style={{ fontSize: 23, fontFamily: 'Impact, Charcoal, sans-serif' }}> Trending Movies</h1>
            <div className="row" style={styles.row}>
                {
                    data.allTvSeries && data.allTvSeries.map((series, idx) => {
                        return (
                            <div className="col-3" key={idx}>
                                
                                <Card data={series} key={series._id} path={pathname} />
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}