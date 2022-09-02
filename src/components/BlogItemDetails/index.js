import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

// const blogData = {
//   title: 'Blog Name',
//   imageUrl: 'https://assets.ccbp.in/frontend/react-js/placeholder-3-img.png',
//   avatarUrl: 'https://assets.ccbp.in/frontend/react-js/avatar-img.png',
//   author: 'Author Name',
//   content:
//     'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
// }

class BlogItemDetails extends Component {
  state = {blogData: {}, loading: true}

  componentDidMount() {
    this.getBlogItemData()
  }

  getBlogItemData = async () => {
    const {match} = this.props
    const response = await fetch(
      `https://apis.ccbp.in/blogs/${match.params.id}`,
    )
    const data = await response.json()
    this.setState({
      blogData: {
        title: data.title,
        imageUrl: data.image_url,
        content: data.content,
        avatarUrl: data.avatar_url,
        author: data.author,
      },
      loading: false,
    })
  }

  renderBlogItemDetails = () => {
    const {blogData, loading} = this.state
    const {title, imageUrl, content, avatarUrl, author} = blogData
    return (
      <>
        {loading && <Loader />}
        <div className="blog-info">
          <h2 className="blog-details-title">{title}</h2>

          <div className="author-details">
            <img className="author-pic" src={avatarUrl} alt={author} />
            <p className="details-author-name">{author}</p>
          </div>
          <img className="blog-image" src={imageUrl} alt={title} />
          <p className="blog-content">{content}</p>
        </div>
      </>
    )
  }

  render() {
    return <div className="blog-container">{this.renderBlogItemDetails()}</div>
  }
}

export default BlogItemDetails
