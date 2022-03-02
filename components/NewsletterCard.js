import Link from 'next/link';

const NewsletterCard = ({ newsletter }) => {
  const date = new Date(newsletter.date).toDateString();
  return (
    <div className="article">
      <div className="article-info">
        <h2>{newsletter.title}</h2>
        <div className="article-brief">{newsletter.description}</div>
        <br />
        <Link href={`${newsletter.link}`}>
          <h2>{newsletter.link}</h2>
        </Link>
        <p className="author-info">
          <img src={`http://localhost:1337${newsletter.author.data.attributes.photo.data.attributes.url}`} />
          <Link href={`/author/${newsletter.author.data.attributes.username}`}>
            <a> {newsletter.author.data.attributes.name} </a>
          </Link>{' '}
          on {date}
        </p>
      </div>
    </div>
  );
};

export default NewsletterCard;