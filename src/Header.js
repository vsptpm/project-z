import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import { auth } from './firebase';
import ImageUpload from './ImageUpload';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import './Header.css';
import PersistentDrawerLeft from './Sidebar';
import Link from '@material-ui/core/Link';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`, //modal stylings
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper, //some more modal stylings
        border: '1px solid #000',
        boxShadow: theme.shadows[5],

        padding: theme.spacing(2, 4, 3),
    },
}));


function Header() {

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    const [open, setOpen] = useState(false);
    const [openSignIn, setOpenSignIn] = useState('');
    const [username, setUsername] = useState('');
    const [openUpload, setOpenUpload] = useState('');

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(null);
    const [inputSearch, setInputSearch] = useState('');

    const signUp = (event) => {
        event.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username //adds user t the database
                })
            })
            .catch((error) => alert(error.message));

        setOpen(false);
    }

    const signIn = (event) => {
        event.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message)); //passes credentials to the database to

        setOpenSignIn(false);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user has logged in 
                console.log(authUser);
                setUser(authUser);

            }
            else {
                //user has logged off
                setUser(null);
            }
        })
        return () => {
            //perform cleanup actions
            unsubscribe();
        }

    }, [user, username]);

    return (
        <div className="app__header">
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                {/* modal or popup for sign up*/}
                <div style={modalStyle} className={classes.paper}>
                    <form className='header__signup'>
                        <center>
                            <img
                                className="header__headerImage"
                                src="https://i.pinimg.com/originals/17/b3/99/17b399d8939875c2c257c71775cae8f1.jpg"
                                alt="iglogo"
                            ></img>
                        </center>

                        <Input
                            placeholder="username"
                            value={username}
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <Input
                            placeholder="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            placeholder="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button variant="outlined" type="submit"  onClick={signUp}>Sign Up</Button>

                    </form>


                </div>

            </Modal>

            <Modal
                open={openSignIn}
                onClose={() => setOpenSignIn(false)}
            >
                {/* modal or popup for sign in*/}
                <div style={modalStyle} className={classes.paper}>
                    <form className='header__signup'>
                        <center>
                            <img
                                className="header__headerImage"
                                src="https://i.pinimg.com/originals/17/b3/99/17b399d8939875c2c257c71775cae8f1.jpg"
                                alt="logo"
                            ></img>
                        </center>

                        <Input
                            placeholder="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            placeholder="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button  variant="outlined" type="submit" onClick={signIn}>Sign In</Button>

                    </form>


                </div>

            </Modal>

            <Modal
                open={openUpload}
                onClose={() => setOpenUpload(false)}
            >
                {/* modal or popup for post upload*/}
                <div style={modalStyle} className={classes.paper}>
                    {user?.displayName ? (
                        <ImageUpload username={user.displayName} openUploadModal = {setOpenUpload} />
                    ) : (
                        <></>
                    )}

                </div>

            </Modal>
            <div className="header__childleft">
                {/* <PersistentDrawerLeft /> */}
                <img
                    className="header__headerImage"
                    src="orangelogo.jpg"
                    onClick={()=>{
                        console.log(user)
                    }}
                    alt="logo"
                ></img>

            </div>

            <div className="header__centerchild">
                {/* <Input value={inputSearch} type="text" onChange={e => setInputSearch(e.target.value)} placeholder="Search " className="header__search" />
                <Link to={`/search/${inputSearch}`}>
                    <SearchIcon />
                </Link> */}
<img
                    className="header__logo"
                    src="logoPixaport.png"
                    alt="logo"
                ></img>

            </div>


            <div className="header__childright">
                {user ? (
                    <div>

                        <AddCircleOutlineIcon className="header__logout" onClick={() => setOpenUpload(true)} />
                        <ExitToAppIcon className="header__logout" onClick={() => auth.signOut()} />

                    </div>
                ) : (
                    <div className="header__childleft" >
                        <Button onClick={() => setOpenSignIn(true)}>Sign In </Button>
                        <Button variant="outlined" onClick={() => setOpen(true)}>Sign Up</Button>
                    </div>

                )}
            </div>


        </div>


    )
}

export default Header
