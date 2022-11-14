import React from "react"
import config from "../config.json"
import styled from "styled-components"
import Menu from "../src/components/Menu"
import { StyledTimeline } from "../src/components/Timeline"
import { createClient } from "@supabase/supabase-js";
import { videoService } from "../src/components/services/videoService";

const PROJECT_URL = "https://ezgoorzfgndkgijwhwit.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6Z29vcnpmZ25ka2dpandod2l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNzkzMjcsImV4cCI6MTk4Mzk1NTMyN30.5iP-RY0ScChZEIyX9S-QKSjIKhdDuvHDzRbznICrOvE";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function HomePage() {
  const service = videoService();
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");
  const [playlists, setPlaylists] = React.useState({});     // config.playlists


  React.useEffect(() => {
    console.log("useEffect");
    service
        .getAllVideos()
        .then((dados) => {
            console.log(dados.data);
            // Forma imutavel
            const novasPlaylists = {};
            dados.data.forEach((video) => {
                if (!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];
                novasPlaylists[video.playlist] = [
                    video,
                    ...novasPlaylists[video.playlist],
                ];
            });

            setPlaylists(novasPlaylists);
        });
}, []);

console.log("Playlists Pronto", playlists);

    return (
      <>

    <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
    <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
    <Header/>
    <Timeline searchValue={valorDoFiltro} playlists={config.playlists}>
      conteudo
       </Timeline>
    </div>
    </>
    );
  }
  
  export default HomePage

  const StyledBanner = styled.div`
     background-image: url(${config.bg});
     height: 230px;
     width: 100vw;
`;

const StyledHeader = styled.div`
   background-color: ${({ theme }) => theme.backgroundLevel1};
   img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    .user-info {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 16px 32px;
      gap: 16px;
    }
`;
  function Header() {
    return (
        <StyledHeader>
           {/*img src="" /*/}
<StyledBanner />
          <section className="user-info">
          <img src={`https://github.com/${config.github}.png`} />
            <div>
            <h2>
              {config.name}
              </h2>
            <p>
            {config.job}
            </p>
            </div>
          </section>           
        </StyledHeader>
    )
  }

  function Timeline({searchValue, ...propriedades}) {
    const playlistsNames = Object.keys(propriedades.playlists);

    return (
        <StyledTimeline>
           {playlistsNames.map((playlistsName) => {
            const videos = propriedades.playlists[playlistsName];
           // console.log(playlistsName);
            // console.log(videos);
            return (
              <section key={playlistsName}>
                <h2>{playlistsName}</h2>
                <div>
                  {videos.filter((video) => {
                    const titleNormalized = video.title.toLowerCase();
                    const searchValueNormalized = searchValue.toLowerCase();
                    return titleNormalized.includes(searchValueNormalized)                
                  }).map((video) => {
                    return (
                      <a key={video.url} href={video.url}>
                        <img src={video.thumb}/>
                        <span>
                          {video.title}
                        </span>
                      </a>
                    )
                  })}
                </div>
              </section>
            )
           })}
        </StyledTimeline>
    )
  }

