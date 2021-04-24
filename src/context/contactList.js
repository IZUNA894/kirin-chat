import React, { Component ,createContext} from 'react'
export const ContactListContext = createContext();

export default class ContactListContextProvider extends Component {
    state={
        contacts:undefined
        //
        //     "contacts": [
        //       {
        //         "_id": "5e4ef2c7a91a60440ceba978",
        //         "name": "Optimus Prime",
        //         "email": "fhjsjssj12@gmail.com",
        //         "lastMsg":"bla bla bla"
        //       }
        //     ]
    
    }
    setContacts = (contacts)=>{
        this.setState({contacts});
    }
    render() {
        return (
            <ContactListContext.Provider value={{...this.state,setContacts:this.setContacts}} >
                {this.props.children}
            </ContactListContext.Provider>

        )
    }
}
