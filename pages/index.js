import config from "../config.json"
import styled from "styled-components"
import { CSSReset } from "../src/components/CSSReset"
import Menu from "../src/components/Menu"
import { StyledTimeline } from "../src/components/Timeline"

function HomePage() {
    return (
      <>

      <CSSReset />
    <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
    <Menu />
    <Banner />
    <Header/>
    <Timeline playlists={config.playlists}>
      conteudo
       </Timeline>
    </div>
    </>
    );
  }
  
  export default HomePage

  const StyledBanner = styled.div`
  img {
     width: 100vw;
     height: 50vh;
   }
`;
 function Banner() {
   return (
       <StyledBanner>

         <img src={`https://images.unsplash.com/photo-1472190649224-495422e1b602?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80`} />

       </StyledBanner>
   )
 }

const StyledHeader = styled.div`
   img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    .user-info {
      margin-top: 50px;
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

  function Timeline(propriedades) {
    const playlistsNames = Object.keys(propriedades.playlists);

    return (
        <StyledTimeline>
           {playlistsNames.map((playlistsName) => {
            const videos = propriedades.playlists[playlistsName];
            console.log(playlistsName);
            console.log(videos);
            return (
              <section>
                <h2>{playlistsName}</h2>
                <div>
                  {videos.map((video) => {
                    return (
                      <a href={video.url}>
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

