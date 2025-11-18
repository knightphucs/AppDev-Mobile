import * as ActionTypes from "./ActionTypes";

export const comments = (state = { errMess: null, comments: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return { ...state, comments: action.payload };
    case ActionTypes.COMMENTS_FAILED:
      return { ...state, errMess: action.payload };
    case ActionTypes.ADD_COMMENT:
      const newComment = {
        ...action.payload,
        id: state.comments.length, // auto increment ID
      };
      return { ...state, comments: state.comments.concat(newComment) };
    default:
      return state;
  }
};
