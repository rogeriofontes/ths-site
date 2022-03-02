import Link from 'next/link';

const ProjectCard = ({ project }) => {
  console.log('project', project);
  const date = new Date(project.date).toDateString();
  return (
    <div className="article">
      <div className="article-info">
        <Link href={`/project/${project.slug}`}>
          <h2>{project.title}</h2>
        </Link>

        <img src={`http://localhost:1337${project.head.data.attributes.url}`} />

        {project.authors.data.map((athr, i) => (
          <p className="author-info" key={i}>
            <img src={`http://localhost:1337${athr.attributes.photo.data.attributes.url}`} />

            <Link href={`/author/${athr.attributes.username}`}>
              <a> {athr.attributes.name} </a>
            </Link><br />{' '} Created: {date}

          </p>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;