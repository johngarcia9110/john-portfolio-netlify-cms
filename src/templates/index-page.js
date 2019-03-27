import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import ContactForm from '../components/ContactForm';
import ProjectRoll from '../components/ProjectRoll';
import ScrollTop from '../components/ScrollTop';


import InteractiveHero from '../components/InteractiveHero';
import Background from '../img/hero.svg';
import HexBottomLeft from '../img/HexBottomLeft.svg';
import HexTop from '../img/HexTopLeft.svg';
import HexRight from '../img/HexRight.svg';

import ContactHexBottom from '../img/contactHexBottom.svg';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';


import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'


export const IndexPageTemplate = ({
    herotext,
    tagline,
    scrollTo
}) => {
    return (
        <div className="container main-content">
            <section id="hero" className="row">
                <div className="jumbotron d-flex flex-column justify-content-end container-radius">
                    <div className="jumbotron__text-wrap text-center">
                        <h1>{herotext}</h1>
                        <p className="d-inline-block">{tagline}</p>
                        <div className="social d-flex justify-content-center">
                            <a href="#" target="_blank"><FaGithub/></a>
                            <a href="#" target="_blank"><FaLinkedin/></a>
                        </div>
                    </div>
                    <div className="desk-svg">
                        <InteractiveHero/>
                    </div>
                    <div className="hex hex-bottom-left"><HexBottomLeft/></div>
                    <div className="hex hex-top"><HexTop/></div>
                    <div className="hex hex-right"><HexRight/></div>
                </div>
            </section>
            <ProjectRoll/>
            <section id="contact"
                     className="row padding-inner position-relative overflow-hidden container-radius-bottom">
                <div className="col-12 text-center z-2">
                    <h1 className="sectionTitle sectionTitle--dark">Contact.<span className="bars"></span></h1>
                </div>
                <div className="col-12 col-md-6 z-2">
                    <p>Let’s get in touch! Connect with me through the form on the right or via the platforms below</p>
                    <div className="social d-flex justify-content-center">
                        <a href="#" target="_blank"><FaGithub/>Github</a>
                        <a href="#" target="_blank"><FaLinkedin/>LinkedIn</a>
                    </div>
                </div>
                <div className="col-12 col-md-6 z-2">
                    <ContactForm/>
                </div>
                <ContactHexBottom className="hex hex-bottom-left"/>
            </section>
            <ScrollTop scrollTo={scrollTo}/>
        </div>
    )
}

IndexPageTemplate.propTypes = {
  herotext: PropTypes.string,
  tagline: PropTypes.string,
}

const IndexPage = ({ data }) => {

    const { frontmatter } = data.markdownRemark
    const scrollTo = (id) => {
        document.getElementById(id).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }

    return (
    <Layout>
      <IndexPageTemplate
        herotext={frontmatter.herotext}
        tagline={frontmatter.tagline}
        scrollTo={scrollTo}
      />
    </Layout>
    )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
query IndexPageTemplate {
  markdownRemark(frontmatter: {templateKey: {eq: "index-page"}}) {
      frontmatter{
          herotext
          tagline
    }
  }
}
`
