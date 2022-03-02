import HistoryCard from '../components/HistoryCard';
const qs = require('qs');

export default function History({ histories }) {
  return (
    <div className="history-grid">
      {histories.map((history, index) => (
        <HistoryCard history={history.attributes} key={index} />
      ))}
    </div>
  );
}

export async function getStaticProps() {

  const query = qs.stringify({
    populate: [
      'photos',
      'author',
      'author.photo'
    ],
  }, {
    encodeValuesOnly: true,
  });

  // This is a real endpoint
  const res = await fetch(`http://localhost:1337/api/histories?${query}`);
  const histories = await res.json();
  return {
    props: {
      histories: histories.data,
    },
  };
}