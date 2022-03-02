import Link from 'next/link';
const qs = require('qs');

const Album = ({ album }) => {
    const date = new Date(album.date).toDateString();
    return (
        <div className="article">
            <div className="article-info">
                <h2>{album.title}</h2>
                <div className="article-brief">{album.content}</div>
                <br />
                <div id="gallery">
                    {album.photos.data.map((photo, i) => (
                        <div className="modal display-block"><section className="modal-main"><p>
                            <img src={`http://localhost:1337${photo.attributes.url}`} />
                        </p><button>Close</button></section></div>
                    ))}
                </div>
                <p className="author-info">
                    <img src={`http://localhost:1337${album.author.data.attributes.photo.data.attributes.url}`} />
                    <Link href={`/author/${album.author.data.attributes.username}`}>
                        {album.author.data.attributes.name}
                    </Link>{' '}
                    on {date}
                </p>
            </div>
        </div>
    );
};

export async function getStaticPaths() {
    const response = await fetch('http://localhost:1337/api/albums');
    const albuns = await response.json();
    return {
        paths: albuns.data.map((album) => ({
            params: {
                slug: album.attributes.slug,
            },
        })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const query = qs.stringify({
        populate: [
            'photos',
            'author',
            'author.photo'
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
        `http://localhost:1337/api/albums?${query}`
    );
    const albuns = await response.json();

    return {
        props: { album: albuns.data[0].attributes },
        revalidate: 1,
    };
}

export default Album;