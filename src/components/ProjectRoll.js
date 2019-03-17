import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import ContactHexTop from '../img/contactHexTop.svg';

class ProjectRoll extends React.Component {

    render() {
        const { data } = this.props
        const { edges: posts } = data.allMarkdownRemark

        return (
            <section id="work" className="row overflow-hidden">
                <div className="dark-bg work-top-wrap">
                    <div className="col-12 text-center">
                        <h1 className="sectionTitle sectionTitle--light">Work.<span></span></h1>
                    </div>
                    <div className="col-12 text-center z-2">
                        <p className="d-inline-block lead lead-light mb-3">Select A Category:</p>
                        <ul className="nav justify-content-center button-list">
                            <li className="nav-item"><button>Category Name</button></li>
                            <li className="nav-item"><button>Category Name</button></li>
                            <li className="nav-item"><button className="active">Category Name</button></li>
                        </ul>
                    </div>
                </div>
                <div className="col-12">
                    <div className="row card-holder">
                        {posts && (posts.map(({node: post})=> (
                            <div className="col-12 col-md-6">
                                <div className="card">
                                    <img src={post.frontmatter['full_image'].publicURL} alt="project preview image"/>
                                    <div className="card__text">
                                        <h2>{post.frontmatter.title}</h2>
                                        <p>Card Category</p>
                                    </div>
                                </div>
                            </div>
                        )))}
                    </div>
                    <div className="row z-2">
                        <div className="col-12 text-center">
                            <button className="btn btn-green">Load More</button>
                        </div>
                    </div>
                </div>
                <ContactHexTop className="hex hex-top-right"/>
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
