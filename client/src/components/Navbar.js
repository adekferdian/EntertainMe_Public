import React from 'react'
import { NavLink, useLocation, Link } from 'react-router-dom'
import navbar from '../styles/navbar.css'
import { 
    ProSidebar, 
    Menu, 
    MenuItem, 
    SidebarHeader,
    SidebarContent,
    SidebarFooter,} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { BsCollectionPlay, BsFilm, BsHouseDoorFill } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import { GiSelfLove } from 'react-icons/gi';

export const Navbar = () => {
    const {pathName} = useLocation()

    const styles = {
        activeLink : {
            backgroundColor: "#2d3c45",
            color: '#17a2b8',
            borderRight: 'solid 6px rgb(23, 162, 184)',
        },
        sideBar: {
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: '29px',
        },
        proSideBar: {
            backgroundColor: 'transparent', 
            fontFamily: 'Roboto Condensed',
            height: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            zIndex: '101',
        },
        navbar: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        list: {
            textDecoration: 'none',
            hover: 'scale',
            color: 'white',
            margin: '10px',
            // padding: '-5px',

        }
    }

    return (
        <>

            <nav className="navbar navbar-dark" style={styles.navbar}>
                <Link to="/" style={styles.list}>
                    <h3>
                        {<BsHouseDoorFill />}
                        {/* <img src="https://img.icons8.com/nolan/64/blender-3d.png" width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy" /> */}
                        Home
                    </h3>
                </Link>
                <Link to="/movies" style={styles.list}>
                    <h3>
                        <BsFilm />
                        {/* <img src="https://img.icons8.com/nolan/64/blender-3d.png" width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy" /> */}
                        Movies
                    </h3>
                </Link>
                <Link to="/tvSeries" style={styles.list}>
                    <h3>
                        <BsCollectionPlay />
                        {/* <img src="https://img.icons8.com/nolan/64/blender-3d.png" width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy" /> */}
                        TV Series
                    </h3>
                </Link>
                <Link to="/favorites" style={styles.list}>
                    <h3>
                        <GiSelfLove />
                        {/* <img src="https://img.icons8.com/nolan/64/blender-3d.png" width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy" /> */}
                        Favourites
                    </h3>
                </Link>
            </nav>
            {/* <ProSidebar 
                breakPoint="md"
                style={styles.proSideBar}  
                >
                <SidebarHeader>
                    <div
                    style={styles.sideBar}
                    >
                    <b>hektiv</b> <span style={{color: 'red'}}>xxi</span>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square">
                        <MenuItem icon={<BsHouseDoorFill style={{backgroundColor: 'transparent'}}/>} style={pathName ==='/' ? styles.activeLink : null}>
                            <NavLink className="text-white" to='/'  style={{backgroundColor: 'transparent'}}>
                            Home
                            </NavLink>
                        </MenuItem>
                        <MenuItem icon={<BsFilm/>} style={pathName ==='/movies' ? styles.activeLink : null}>
                            <NavLink className="text-white" to='/movies' style={{backgroundColor: 'transparent'}}>
                            Movie
                            </NavLink>
                        </MenuItem>
                        <MenuItem icon={<BsCollectionPlay/>} style={pathName ==='/TVSeries' ? styles.activeLink : null}>
                            <NavLink className="text-white" to='/tvSeries' style={{backgroundColor: 'transparent'}}>
                            TVSeries
                            </NavLink>
                        </MenuItem>
                        <MenuItem icon={<GiSelfLove/>} style={pathName ==='/favorites' ? styles.activeLink : null}>
                            <NavLink className="text-white" to='/favorites' style={{backgroundColor: 'transparent'}}>
                            Favorites
                            </NavLink>
                        </MenuItem>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                <div
                    className="sidebar-btn-wrapper text-center"
                    style={{
                        padding:'20px 10px',
                    }}
                    >
                    <a
                        href="https://github.com/adekferdian"
                        target="_blank"
                        className="sidebar-btn"
                        rel="noopener noreferrer"
                    >
                        <FaGithub className="text-white"/>
                        <span  className="text-white"> View Source </span>
                    </a>
                    </div>
                </SidebarFooter>
            </ProSidebar> */}
        </>
    )
}