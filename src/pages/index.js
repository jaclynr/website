import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/Hero/hero'
import About from '../components/About/about'
import Layout from '../components/layout'
import ArticlePreview from '../components/ArticlePreview/article-preview'
import Contact from '../components/Contact/contact';
import Footer from '../components/Footer/footer'
import Fade from "react-reveal/Fade"

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(this, 'props.data.site.siteMetadata.description')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const [author] = get(this, 'props.data.allContentfulPerson.edges')

    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          <Helmet><title>{siteTitle}</title>
          <meta name="description" content={siteDescription}/>
          <html lang="en" />
          </Helmet>
          <Hero data={author.node} />
          <About data={author.node}/>
          <div id="portfolio" className="background">
            <div className="wrapper">
              <Fade bottom duration={2500} distance={"50%"}>
              <h2 className="section-headline">Portfolio</h2>
              <ul className="article-list">
                {posts.map(({ node }) => {
                  return (
                    <li key={node.slug}>
                      <ArticlePreview article={node} />
                    </li>
                  )
                })}
              </ul>
              </Fade>
            </div>
          </div>
          <Contact data={author.node} />
          <Footer data = {author.node} />
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
             ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulPerson(filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          aboutHeading
          aboutText1 {
            aboutText1
          }
          aboutText2 {
            aboutText2
          }
          quote {
            quote
          }
          author
          contactText
          heroImage: image {
            fluid(
              maxWidth: 700
            ) {
              ...GatsbyContentfulFluid_noBase64
            }
          }
          banner: images {
            fluid(
              maxWidth: 1440
              ) {
              ...GatsbyContentfulFluid_noBase64
            }
          }
        }
      }
    }
  }
`
