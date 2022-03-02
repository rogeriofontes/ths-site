import ArticleCard from '../components/ArticleCard';

const qs = require('qs');

const Archives = ({ articles }) => {
  return <div>
    <section>
      <article>
        <div className="article-grid">

          {articles.map((article, i) => (
            <p><ArticleCard article={article.attributes} key={i} /></p>
          ))
          }

        </div>
      </article>
    </section>
  </div>;
};

export default Archives;


export async function getServerSideProps() {

  const query = qs.stringify({
    populate: [
      'tags',
      'photo',
      'authors',
      'authors.photo',
      'author',
      'author.photo',
      
    ],
  }, {
    encodeValuesOnly: true,
  });

  const response = await fetch(`http://localhost:1337/api/articles?${query}`);//&populate=*
  const articles = await response.json();
  return {
    props: {
      articles: articles.data,
    },
  };
}