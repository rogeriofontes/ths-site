import NewsletterCard from '../components/NewsletterCard';

const qs = require('qs');

const Newsletter = ({ newsletters }) => {
  return <div>
    <section>
      <article>
        <div>
          {newsletters.map((newsletter, i) => (
            <p><NewsletterCard newsletter={newsletter.attributes} key={i} /></p>
          ))
          }
        </div>
      </article>
    </section>
  </div>;
};

export default Newsletter;


export async function getServerSideProps() {

  const query = qs.stringify({
    populate: [
      'authors',
      'authors.photo',
      'author',
      'author.photo',
      
    ],
  }, {
    encodeValuesOnly: true,
  });

  const response = await fetch(`http://localhost:1337/api/newsletters?${query}`);
  const newsletters = await response.json();
  return {
    props: {
      newsletters: newsletters.data,
    },
  };
}