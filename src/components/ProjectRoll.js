import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import ContactHexTop from '../img/contactHexTop.svg';

class ProjectRoll extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            posts : [],
            visiblePosts : [],
            tags : [],
            currentFilter : "all",
            setFilter: false
        }
    }
    componentDidMount(){
        let posts = this.props.data.allMarkdownRemark.edges;
        let tags = Array.from(new Set(posts.map(({node : post})=>(post.frontmatter.tags)).flat()));
        this.setState({
            posts : posts,
            visiblePosts : posts,
            tags : tags
        })
    }
    setFilter = (tag) => {

        if(tag !== 'all'){

            this.setState({
                visiblePosts : this.state.posts.filter(({node: post}) => (post.frontmatter.tags.indexOf(tag) !== -1)),
                setFilter: true,
                currentFilter : tag
            })
        }else{
            this.setState({
                visiblePosts : this.state.posts,
                setFilter: false,
                currentFilter : 'all'
            })
        }
        console.log(this.state);
    }
    render() {
        const { data } = this.props
        const { edges: posts } = data.allMarkdownRemark

        return (
            <section id="work" className="row">
                <div className="col-12">
                    <div className="row card-holder">
                        <div className="col-12 text-center">
                            <h1 className="sectionTitle sectionTitle--light">Work.<span className="bars"></span></h1>
                        </div>
                        <div className="col-12 text-center z-2">
                            <p className="d-inline-block lead lead-light mb-3">Select A Category:</p>
                            <ul className="nav justify-content-center button-list">
                                {
                                    this.state.tags && (
                                        this.state.tags.map((tag, index) => (
                                            <li key={index} className="nav-item">
                                                <button
                                                    onClick={() => this.setFilter(tag)}
                                                    className={ this.state.currentFilter === tag ? "active" : ""}
                                                >
                                                    {tag}
                                                </button>
                                            </li>
                                        ))
                                    )
                                }
                                <li key="99" className="nav-item">
                                    <button
                                        className={ this.state.currentFilter === "all" ? "active" : ""}
                                        onClick={() => (this.setFilter("all"))}
                                    >All</button>
                                </li>
                            </ul>
                        </div>
                        {this.state.visiblePosts && (this.state.visiblePosts.map(({node: post}, index)=> {
                                return (
                                    <div key={index} className="col-12 col-md-6">
                                        <div className="card">
                                            <img src={post.frontmatter['full_image'].publicURL} alt="project preview image"/>
                                            <div className="card__text">
                                                <Link to={post.fields.slug}><h2>{post.frontmatter.title}</h2></Link>
                                                <p>{post.frontmatter.tags.map((tag, index) => {
                                                    if(index === 0){
                                                        return <span key={index}>{tag}</span>
                                                    }else{
                                                        return <span key={index}>, {tag}</span>
                                                    }

                                                })}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                        }

                        ))}
                        {
                            this.state.visiblePosts.length > 3 && (
                                <div className="col-12 text-center">
                                    <button className="btn btn-green">Load More</button>
                                </div>
                            )
                        }
                    </div>

                </div>
                <ContactHexTop className="hex hex-top-r ight"/>
            </section>
        );
    }
}

ProjectRoll.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
}

export default () => (
    <StaticQuery
        query={graphql`
    query ProjectRollQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] },
        filter: { frontmatter: { templateKey: { eq: "project" } }}
      ) {
        edges {
          node {
            excerpt(pruneLength: 400)
            id
            fields {
              slug
            }
            frontmatter {
              title
              templateKey
              date(formatString: "MMMM DD, YYYY")
              tags
              full_image{
                publicURL
              }
            }
          }
        }
      }
    }
    `}
        render={(data, count) => (
            <ProjectRoll data={data} count={count} />
        )}
    />
)
