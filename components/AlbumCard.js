import Link from 'next/link';

const AlbumCard = ({ album }) => {
  console.log('album', album);
  const date = new Date(album.date).toDateString();
  return (
    <div className="article">
      <div className="article-info">
        <Link href={`/album/${album.slug}`}>
          <h2>{album.title}</h2>
        </Link>

        <Link href={`/album/${album.slug}`}>
          <img src={`http://localhost:1337${album.head.data.attributes.url}`} />
        </Link>

        <p className="author-info">
          <img src={`http://localhost:1337${album.author.data.attributes.photo.data.attributes.url}`} />
          <Link href={`/author/${album.author.data.attributes.username}`}>
            <a> {album.author.data.attributes.name} </a>
          </Link>{' '}
          on {date}
        </p>
      </div>
    </div>
  );
};

export default AlbumCard;