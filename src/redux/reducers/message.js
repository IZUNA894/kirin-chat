import bodyParser from "body-parser";

const placeholder = {
  // "to":[
  //     {....msg body....}, ....
  // ],
  fetched_message: {},
};
export default function(state = placeholder, action) {
  switch (action.type) {
    case "SET_MESSAGE":
      // let messages =
      return (state = {
        ...state,
        [action.payload.to]: action.payload.message,
      });
    case "SET_FETCHED_MESSAGE":
      return (state = {
        ...state,
        fetched_message: {
          ...state.fetched_message,
          [action.payload.to]: true,
        },
      });

    default:
      return state;
  }
}
