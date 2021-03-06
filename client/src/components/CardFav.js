import React from 'react';
import { useHistory, useLocation} from 'react-router-dom'
import { client } from '../config/client'
import { GiSelfLove } from 'react-icons/gi'
import { GET_FAVOURITES } from '../queries/favouritesQuery'
import { AiFillTags , AiFillStar, AiOutlineStar } from 'react-icons/ai';

export const CardFav = ({ data, path }) => {
    const history = useHistory();
    const {pathName} = useLocation();

    let stars = [];
    let popularity = Math.ceil(data.popularity);

    while (popularity > 0) {
        stars.push('full');
        popularity -= 2;
    }
    let emtpyStars = new Array(5-stars.length).fill('empty');
    
    const styles = {
        card: {
            backgroundColor: 'transparent',
            // display: 'flex',
            // flexWrap: 'wrap',
            borderWidth: 0,
            marginBottom: 10,
            marginRight: '10%',
            mminHeight: '50%',
            fontFamiliy: 'Roboto Condensed',
        },
        img: {
            boxShadow: '1px 2px 30px 8px rgba(0,0,0,0.61)',
            height: '250px',
            width: '250px',
        },
        tagBox: {
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 4,
            width: "100%",
            fontSize: 12,
            marginRight: "2%",
        },
        popularity: {
            color: 'white',
            borderRadius: '32px',
            padding: '5px',
            paddingLeft: '7px',
            paddingRight: '7px',
            marginTop: '8px',
            width: '100%',
            marginBottom: '9px',
        },
        infoBtn: {
            width: '100%', 
            backgroundColor: '#d35400' , 
            borderColor: '#d35400', 
            color: "white",
        }
    }

    const toDetails = () => {
        history.push({
            pathname: `${path}/details/${data._id}`,
            fromFav: pathName === '/favourites' ? true : false
        })
    }

    const removeFromFav = (selectedId) => {
        console.log(selectedId);
        const { favourites: currentFav } = client.readQuery({
            query: GET_FAVOURITES
        })

        client.writeQuery({
            query: GET_FAVOURITES,
            data: {
                favourites: currentFav.filter(fav => fav._id !== selectedId)
            }
        })
        history.push('/favorites')
    }

    return (
        <>
            <div className="card" style={styles.card}>
                <div style={{overflow: 'hidden', padding:'25px', paddingBottom: 0}}>
                    <img src={data.poster_path} className="card-img-top" style={styles.img} alt={data.title}/>
                    <p style={styles.popularity} className="text-center"> 
                        {
                            stars.map ( (star, idx) => {              
                                return <AiFillStar key={idx} color="#f1c40f"/> 
                            })
                        }
                        {
                            emtpyStars.map ( (star, index) => {              
                                return <AiOutlineStar key={index} color="#ecf0f1"/> 
                            })
                        }
                    </p>
                    <h4 style={{color: 'black', fontSize:'20px'}}> {data.title} </h4>
                    <p className="card-text">
                        { data.tags.map ( (tag,idx) => {
                            return (
                                <>
                                <span style={styles.tagBox}><AiFillTags/> {`${tag}`} &nbsp;</span>
                                { (idx+1) % 3 === 0 ? <><br style={{lineHeight:'22px'}}/><br/></> : null }
                                </>
                            )
                        })
                    }
                    </p>          
                </div>
                <div className="col-8">
                    <button className="btn btn-danger mr-4 font-weight-bold" onClick={() => removeFromFav(data._id)} >  Remove from Fav </button>
                </div>
                
                {/* <div className="card-body" style={{paddingTop:  '3px'}}>
                </div> */}
            </div>
        </>
    )
}