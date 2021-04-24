import React, { Component ,createContext} from 'react'
export const AuthContext = createContext();

export default class AuthContextProvider extends Component {
    state={
        isAuthentiacated:false

    }
    toggleAuth = ()=>{
        this.setState({isAuthentiacated:!this.state.isAuthentiacated})
    }
    render() {
        return (
            <AuthContext.Provider value={{...this.state,toggleAuth : this.toggleAuth}} >
                {this.props.children}
            </AuthContext.Provider>

        )
    }
}
