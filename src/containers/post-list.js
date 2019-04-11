import React, { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PostListItem from '../components/post-list-item';
import { readAllPost, deletePost } from '../actions/index';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Link } from 'react-router';

class PostList extends Component {
    constructor(props) {
        super(props)
        this.state = { displayOnlyMines: false }
    }

    componentWillMount(){
        this.props.readAllPost()
    }

    renderPosts(){
        const { posts } = this.props;
        let arrayPosts;
            if(posts) {
                if(this.state.displayOnlyMines) {
                    arrayPosts = this.filterMyPost(posts)
                } else {
                    arrayPosts = posts
                }
                return arrayPosts.map((post) => {
                    return <PostListItem key={ post.id } post={ post } deletePostCallBack={(post) => this.deletePostCallBack(post) }/>
                })
            }
    }

    deletePostCallBack(post) {
        console.log("delete", post)
        this.props.deletePost(post.id)
    }

    filterMyPost(postList) {
        return postList.filter(post => {
            if(post.author === 'Moi') {
                return true;
            } else {
                false
            }
        })
    }

    render() {
        console.log(this.props.posts)
        return(
            <div>
                <h1>Liste des posts</h1>
                <input type='checkbox' onChange={ e=> this.setState({ displayOnlyMines: e.target.checked}) }>Afficher uniquement mes posts</input>
                <div className='button_add'>
                    <Link to={ 'create-form' }>
                        <button className='btn btn-primary btn-circle btn-lg'>+</button>
                    </Link>
                </div>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <ReactCSSTransitionGroup 
                        component='tbody'
                        transitionEnterTimeout = { 500 }
                        transitionLeaveTimeout = { 300 }
                        transitionName='fade'>
                            { this.renderPosts() }
                    </ReactCSSTransitionGroup>
                </table>
            </div>
        )
    }
}

// Lit le state de l'application et met le morceau du state que je veux dans les props
const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
}

// 
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ readAllPost, deletePost }, dispatch)
});

// Ici je connecte à react-redux et bind avec PostList
// Important: MapStateToProps doit apparaitre avant mapDispatchToProps sinon dispatch ne serat pas reconnue
export default connect(mapStateToProps, mapDispatchToProps)(PostList);