import React from "react"
import { Route, Redirect } from "react-router-dom"
import { isAuthenticated } from "./auth"

function PrivateRoute({ component: Component, ...rest }) {
    const authTokens  = isAuthenticated()

    return(
        <Route 
            {...rest} 
            render={(props) => 
                authTokens ? (
                    <Component {...props} />
                ) : (
                    <Redirect 
                        to={
                            { 
                                pathname: "/", 
                                state: { referer: props.location } 
                            }
                        } 
                    />
                )
            }
        />
    )
}

export default PrivateRoute