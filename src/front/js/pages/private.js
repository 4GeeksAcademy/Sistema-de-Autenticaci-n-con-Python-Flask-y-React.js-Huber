import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Password from "../../img/password-1.png";

export const Private = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();
    useEffect(() => {
        if (!actions.isLoggedIn()) {
            navigate('/login')
        } else {
            actions.getProfileInfo()
        }
    }, [])

    const handleLogout = () => {
		actions.logout()
		navigate("/")
	}

    return (
        <React.Fragment>
            <div className="row justify-content-center">
            <div className="container-fluid  text-center">
            <div className="containerPrivate">
            
                <div>
                <header className="text-center py-5">
                    <h1>Sitio privado <i class="fa-solid fa-user-secret"></i></h1>
                    <p>Has tenido acceso a esta seccion privada exclusiva para usuarios.</p>
                    <img src={Password} class="mx-auto" alt="Card image cap" style={{maxWidth: "15rem", maxHeight: "15rem"}} />
                    </header>
                </div>

            </div>
            <div>
                <h5>Información privada</h5>
                <h4> <i class="fa-solid fa-lock"></i><i class="fa-solid fa-key"></i> <i class="fa-solid fa-unlock"></i><i class="fa-solid fa-key"></i></h4>
                
                    <>
                        <p>{store.userInfo?.email}</p>
                        <p className="text-red">{store.error}</p>
                    </>
                
                    <p>Loading information...</p>
            
                
                <div className="buttonPrivate">
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                
            </div>

            </div>
           
            </div>
            </div>
            
            
            
            
        </React.Fragment>
    )
}