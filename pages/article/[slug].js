import Link from 'next/link';
const qs = require('qs');

const Article = ({ article }) => {
  const date = new Date(article.date).toDateString();
  return (
    <div className="article-full">
      <div className="article-details">
        <h1>{article.title}</h1>
      
      <article>{article.content}</article>
      {article.authors.data.map((athr, i) => (
          <p className="article-author" key={i}>
           <img src={`http://localhost:1337${athr.attributes.photo.data.attributes.url}`} />
         
            <Link href={`/author/${athr.attributes.username}`}>
              {athr.attributes.name}
            </Link><br />{' '} Created: {date}

          </p>
        ))}
        </div>
    </div>
  );
};

export async function getStaticPaths() {
  const response = await fetch('http://localhost:1337/api/articles');
  const articles = await response.json();
  return {
    paths: articles.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
    const query = qs.stringify({
        populate: [
          'photo',
          'authors',
          'authors.photo'
        ],
        filters: {
            slug: {
              $eq: params.slug,
            },
          }
      }, {
        encodeValuesOnly: true,
      });
  const response = await fetch(
    `http://localhost:1337/api/articles?${query}`
  );
  const articles = await response.json();

  return {
    props: { article: articles.data[0].attributes },
    revalidate: 1,
  };
}

export default Article;