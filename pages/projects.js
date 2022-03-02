import ProjectCard from '../components/ProjectCard';

const qs = require('qs');

export default function Project({ projects }) {
  return (
    <div className="article-grid">
      {projects.map((project, index) => (
        <ProjectCard project={project.attributes} key={index} />
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
      'authors',
      'authors.photo',
      'head',
    ],
  }, {
    encodeValuesOnly: true,
  });

  // This is a real endpoint
  const res = await fetch(`http://localhost:1337/api/projects?${query}`);
  const projects = await res.json();
  return {
    props: {
      projects: projects.data,
    },
  };
}