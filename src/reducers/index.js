import { combineReducers } from 'redux';
import ReducerPost from './reducer-posts';
import ReducerActivePost from './reducer-active-post';
import { reducer as ReducerForm } from 'redux-form';

// combineReducers regroupe les reducers
const rootReducer = combineReducers({
  posts: ReducerPost,
  activePost: ReducerActivePost,
  form: ReducerForm
});

export default rootReducer;
