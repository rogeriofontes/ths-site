import AlbumCard from '../components/AlbumCard';

const qs = require('qs');

export default function Album({ albuns }) {
  return (
    <div className="article-grid">
      {albuns.map((album, index) => (
        <AlbumCard album={album.attributes} key={index} />
      ))}
    </div>
  );
}

export async function getStaticProps() {

  const query = qs.stringify({
    populate: [
      'photos',
      'author',
      'author.photo',
      'head',
    ],
  }, {
    encodeValuesOnly: true,
  });

  // This is a real endpoint
  const res = await fetch(`http://localhost:1337/api/albums?${query}`);
  const albuns = await res.json();
  return {
    props: {
      albuns: albuns.data,
    },
  };
}