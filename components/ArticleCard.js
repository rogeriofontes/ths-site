import Link from 'next/link';

const ArticleCard = ({ article }) => {
  console.log('article' + article)
  const date = new Date(article.date).toDateString();
  return (
    <div className="article">
      <div className="cover-image">
        <img src={`http://localhost:1337${article.photo.data.attributes.url}`} />
      </div>
      <div className="article-info">
        {article.tags.data.map((tag, i) => (
          <Link href={`/tag/${tag.attributes.tagname}`} key={i}>
            <span className="tags">{tag.attributes.tagname}</span>
          </Link>
        ))}
        <Link href={`/article/${article.slug}`}>
          <h2>{article.title}</h2>
        </Link>
        <div className="article-brief">{article.brief}</div>

        {article.authors.data.map((athr, i) => (
          <p className="author-info" key={i}>
            <img src={`http://localhost:1337${athr.attributes.photo.data.attributes.url}`} />

            <Link href={`/author/${athr.attributes.username}`}>
              <a> {athr.attributes.name} </a>
            </Link><br />{' '} Created: {date}
          </p>
        ))}

      </div>
    </div >
  );
};

export default ArticleCard;