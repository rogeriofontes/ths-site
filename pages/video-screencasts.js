import styles from "../styles/Home.module.css";

const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';

const Screencasts = ({ data }) => {
  console.log('data', data);
  return <div>
    <ul className={styles.grid}>
      {data.items.map(({ id, snippet = {} }) => {
        const { title, thumbnails = {}, resourceId = {} } = snippet;
        const { medium } = thumbnails;
        return (
          <li key={id} className={styles.card}>
            <div className="article">
              <div className="article-info">
                <a href={`https://www.youtube.com/watch?v=${resourceId.videoId}`} target={"_blank"}>
                  <p>
                    <img width={medium.width} height={medium.height} src={medium.url} alt="" />
                  </p>
                  <span className={styles.title-medium}>{title}</span>
                </a>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  </div>;
};

export default Screencasts;

export async function getServerSideProps() {
  const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=${process.env.YOUTUBE_PLAYLIST_API_KEY}&key=${process.env.YOUTUBE_API_KEY}`)
  const data = await res.json();
  return {
    props: {
      data
    }
  }
}

  //const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=[Playlist ID]&key=${process.env.YOUTUBE_API_KEY}`)