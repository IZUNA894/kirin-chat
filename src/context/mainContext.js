import React ,{Component,createContext} from 'react';
export const MainContext = createContext();

export default class MainContextProvider extends Component {
    state = {
        sender:null,
        openedContact:undefined

    }
    addSender = (sender)=>{
        this.setState({sender});
    }
    setTheOpenedContact = (contact)=>{
        this.setState({openedContact:contact});
    }
    render() {
        return (
            <MainContext.Provider value={{...this.state,addSender:this.addSender,setOpenedContact:this.setTheOpenedContact}}>
                {this.props.children}
            </MainContext.Provider>
        )
    }

}