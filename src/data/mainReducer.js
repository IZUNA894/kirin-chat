// these are redux files ...
// these are redundent code ,doing nothing in appp  logic...
// these are for future upgrade...
import Data from "./placeholder";

var initialState = Data();
export const MainReducer = (store=initialState,action)=>{
    switch(action.type){
        case "setState":
            console.log("hello from redux reducer");
            var newStore = {...store, ...action.parameter }
            return newStore;
            break;
        case "setMsgsToStore":
            console.log("hello from setMsgsToStore");
            var newStore = {...store }
            newStore.messages[action.tokenId] = action.msgs;
            action.cb();
            return newStore;
            break;
        default : return store || {}
    }
}