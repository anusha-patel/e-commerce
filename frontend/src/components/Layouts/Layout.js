import React from 'react'
import Header from './Header'
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';

const Layout = ({children,title,description,keywords,author}) => {
  return (
    <div>
      {/* SEO DYNAMIC USING PROPS */}
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      <Header />
      <main style={{ minHeight: "80vh" }}>
       <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title : 'shop now ',
  description: "mearn stack project",
  keywords:"mern, react, node, mongodb, html, css, javascript,shopping,shop,lowprice",
  author:'anusha'

}



export default Layout