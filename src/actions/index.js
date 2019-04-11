import axios from 'axios';
import { AT_POSTS } from './action-types';

const END_POINT = 'http://localhost:3000';

// dispatch AT_POST.READ_ALL = je renvoi la reponse axios à mon object AT_POST via payload

// Tout les posts
export function readAllPost() {
    return function (dispatch) {
        axios.get(`${ END_POINT }/posts`)
            .then(response => {
                dispatch({ type: AT_POSTS.READ_ALL, payload: response.data })
            });
    }
}

// Un post particulier via son id
export function readPost(id) {
    return function (dispatch) {
        axios.get(`${ END_POINT }/posts/${ id }`)
            .then(response => {
                dispatch({ type: AT_POSTS.READ, payload: response.data })
            });
    }
}

// Delete un post via son id
export function deletePost(id) {
    return function (dispatch) {
        axios.delete(`${ END_POINT }/posts/${ id }`)
            .then(response => {
                dispatch({ type: AT_POSTS.DELETE, payload: id })
            });
    }
}

// Créer un post
// payload: response.data à ajouter au state plus tard 
export function createPost(post) {
    return function(dispatch) {
        axios.post(`${ END_POINT }/posts/`,
        {
            title: post.title,
            content: post.content,
            author: post.author
        })
            .then(response => {
                dispatch({ type: AT_POSTS.CREATE, payload: response.data })
            });
    }
}