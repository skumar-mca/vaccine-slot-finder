import { useEffect, useState } from 'react';
import { setItem, getItem, removeItem } from '../../util';
import HeaderBarComponent from '../header-bar-component/index';
import LoginComponent from '../login-component/index';

function HomeComponent() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const onHandleSubmit = (flag) => {
        setIsLoggedIn(flag);
        setItem('ISLG', flag);
    }

    const onHandleLogout = () => {
        removeItem('ISLG');
        window.location.reload();
    }

    useEffect(() => {
        const loginFlag = getItem('ISLG', false);
        setIsLoggedIn(loginFlag);
    }, [])

    useEffect(() => { }, [isLoggedIn])

    return (
        <div className="row row-home">


            <div className="col-md-12">

                {!isLoggedIn
                    ? <LoginComponent onHandleSubmit={onHandleSubmit} />
                    : <>
                        <figure className="text-center fig-app">
                            <blockquote className="blockquote">
                                <p>Vaccine Slot Finder.</p>
                                <button className="btn btn-sm btn-danger btn-logout" onClick={onHandleLogout}>Log Out</button>
                            </blockquote>
                            <figcaption className="blockquote-footer">
                                <cite title="Source Title">Find slots at multiple locations together</cite>
                            </figcaption>
                        </figure>
                        <HeaderBarComponent />
                    </>
                }

            </div>
        </div>
    );
}

export default HomeComponent;
