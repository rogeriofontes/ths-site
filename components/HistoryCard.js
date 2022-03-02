import Link from 'next/link';

const HistoryCard = ({ history }) => {
  const date = new Date(history.date).toDateString();
  return (
    <div className="article">
      <div className="article-info">
        <h2>{history.title}</h2>
        <div className="article-brief">{history.content}</div>
        <br />
        <div id="gallery">
          {history.photos.data.map((photo, i) => (
            <img src={`http://localhost:1337${photo.attributes.url}`} />
          ))}
        </div>
        <p className="author-info">
          <img src={`http://localhost:1337${history.author.data.attributes.photo.data.attributes.url}`} />
          <Link href={`/author/${history.author.data.attributes.username}`}>
            <a> {history.author.data.attributes.name} </a>
          </Link>{' '}
          on {date}
        </p>
      </div>
    </div>
  );
};

export default HistoryCard;