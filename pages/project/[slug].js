import Link from 'next/link';
const qs = require('qs');

const Project = ({ project }) => {
    const date = new Date(project.date).toDateString();
    return (
        <div className="article">
            <div className="article-info">
                <h2>{project.title}</h2>
                <div className="article-brief">{project.content}</div>
                <br />
                <div id="gallery">
                    {project.photos.data.map((photo, i) => (
                        <div className="modal display-block" key={i}><section className="modal-main"><p>
                            <img src={`http://localhost:1337${photo.attributes.url}`} />
                        </p><button>Close</button></section></div>
                    ))}
                </div>

                {project.authors.data.map((athr, i) => (
                    <p className="author-info" key={i}>
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
    const response = await fetch('http://localhost:1337/api/projects');
    const projects = await response.json();
    return {
        paths: projects.data.map((project) => ({
            params: {
                slug: project.attributes.slug,
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
            'author.photo',
            'authors',
            'authors.photo',
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
        `http://localhost:1337/api/projects?${query}`
    );
    const projects = await response.json();

    return {
        props: { project: projects.data[0].attributes },
        revalidate: 1,
    };
}

export default Project;