import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import PostList from './containers/post-list';
import PostForm from './containers/post-form';
import Post from './containers/post';
import NotFound from './components/not-found'

// Router = balise de base...
// browserHistory = sert à connaitre l'historique de navigation, genre pour revenir en arrière etc
// Route path = L'adresse à laquelle se trouve mon composant
// Route component = Le composant qui s'affiche via le Route path définit juste avant


class Routes extends Component {

    render() {
        
        return(
            <div>
                <Router history={ browserHistory }>
                <Route path='/' component={ PostList }/>
                <Route path='create-form' component={ PostForm }/>
                <Route path='post/:id' component={ Post }/>
                <Route path='*' component={ NotFound }/>
                </Router>
            </div>
        )
    }
}

export default Routes;