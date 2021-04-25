import React, { Component } from "react";
import Profile from "../chatpage/leftPanel/profile";
import SearchBox from "../chatpage/leftPanel/searchBox";
import Contact from "../chatpage/leftPanel/contact";
import BotttomBar from "../chatpage/leftPanel/bottomBar";
import { connect } from "react-redux";
import ContactProfile from "../chatpage/rightPanel/contactProfile";
import Messages from "../chatpage/rightPanel/messages";
import MsgInput from "../chatpage/rightPanel/msgInput";
import "../../css/reset.min.css";
import { Redirect } from "react-router-dom";
import { join } from "../../js/socketUtil";
import { showLoader, hideLoader } from "../../redux/actions";

class Main extends Component {
  state = {
    owner: null,
    messages: {},

    contacts: [],
    redirect: null,
  };

  //this func will add single msg to state...
  // called when socket recieve or send the msg
  addMsgtostate = (msg) => {
    var { sender } = this.context;
    var { openedContact } = this.context;
    var reciever = openedContact && openedContact.username;
    var storeData = this.state;
    var tokenId = "";
    //sometimes reciever is getting undefined ...dont know how...this is bug i think..
    //so this is for preventive measure...
    if (!reciever) return;

    console.log("at creashing 1 site ", openedContact);
    console.log("at crashing site", sender, reciever);
    tokenId = sender < reciever ? sender + reciever : reciever + sender;

    let messages = {};
    messages = storeData.messages;
    if (storeData.messages[tokenId]) {
      messages[tokenId].data = [...storeData.messages[tokenId].data, msg];
    } else {
      //messages[tokenId]= [msg];
      var data = "data";
      messages[tokenId] = {};
      messages[tokenId][data] = [];
      messages[tokenId][data] = [msg];
    }
    //console.log(messages);

    var contacts = this.props.contacts;
    contacts =
      contacts &&
      contacts.map((contact) => {
        if (msg.sender === contact.username) {
          contact.lastMsg = msg.val;
        }
        if (msg.reciever == contact.username) {
          contact.lastMsg = "You:" + msg.val;
        }
        return contact;
      });
    this.props.setContacts(contacts);
    this.setState({ messages });
    this.setState({ randomKey: Math.random() });
  };
  //this function set multiple msg to state,and other storage bodies...
  //call when we fetch msgs of a contact from server...
  addMsgstoState = (tokenId, msgs) => {
    var storeData = this.state;
    let messages = {};
    messages = storeData.messages;
    //console.log(storeData.messages[tokenId],tokenId);
    messages[tokenId] = {};
    console.log(messages);
    var data = "data";
    messages[tokenId][data] = [];
    messages[tokenId].data = [...msgs];
    messages[tokenId].isLoaded = 1;

    this.setState({ messages });

    this.setState({ randomKey: Math.random() }); // this is used to force update <messages/> component
  };
  // call to let a usr join his unique socket room
  componentDidMount() {
    // var { addSender } = this.context;
    const user = this.props.user;
    console.log(user);
    if (user && user.first_name) {
      this.setState({ owner: user.username });
      // addSender(user.username);
      join(user.username);
    } else {
      this.setState({ redirect: "/" });
    }
  }
  render() {
    if (this.state.rediect) {
      return <Redirect to={this.state.redirect} />;
    }
    var storeData = this.state;
    return (
      <div id="frame">
        <div id="sidepanel" class="sidepanel" style={{ height: 100 + "vh" }}>
          <Profile />
          <SearchBox />
          <Contact />
          <BotttomBar />
        </div>

        {/* <!-- right panel... --> */}
        <div className="content" style={{ height: 100 + "vh" }}>
          <ContactProfile />
          <Messages
            messages={storeData.messages}
            randomKey={storeData.randomKey}
            addMsgtostate={this.addMsgtostate}
            addMsgstoState={this.addMsgstoState}
          />
          <MsgInput
            addMsgtostate={this.addMsgtostate}
            socket={this.props.socket}
            contact={storeData.openedContact}
            sender={storeData.owner}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  showLoader,
  hideLoader,
})(Main);
