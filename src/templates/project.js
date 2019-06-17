import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const ProjectPostTemplate = ({
                                     content,
                                     contentComponent,
                                     description,
                                     tags,
                                     title,
                                     helmet,
                                 }) => {
    const PostContent = contentComponent || Content

    return (
        <div className="container main-content">
            <section className="section row">
                {helmet || ''}
                <div className="project-image w-100">
                    <div className="project-title text-center">
                        <h1 className="d-inline-block">{title}</h1>
                    </div>
                </div>
                <div className="col-12 col-lg-12 content">
                    <p>{description}</p>
                    <PostContent content={content} />
                </div>
            </section>
        </div>
    )
}

ProjectPostTemplate.propTypes = {
    content: PropTypes.node.isRequired,
    contentComponent: PropTypes.func,
    description: PropTypes.string,
    title: PropTypes.string,
    helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
    const { markdownRemark: post } = data

    return (
        <Layout>
            <ProjectPostTemplate
                content={post.html}
                contentComponent={HTMLContent}
                description={post.frontmatter.description}
                helmet={
                    <Helmet titleTemplate="%s | Blog">
                        <title>{`${post.frontmatter.title}`}</title>
                        <meta
                            name="description"
                            content={`${post.frontmatter.description}`}
                        />
                    </Helmet>
                }
                tags={post.frontmatter.tags}
                title={post.frontmatter.title}
            />
        </Layout>
    )
}

BlogPost.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.object,
    }),
}

export default BlogPost

export const pageQuery = graphql`
  query ProjectPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`
