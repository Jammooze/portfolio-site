import Navbar from "./navbar/Navbar";
import { useState } from "react";
import "./App.css";
import gameplayFootage from "/assets/gameplayFootage.mp4";

// Import your images from src/assets/photos
import img1 from "/assets/gallery/img1.png";
import img2 from "/assets/gallery/img2.png";
import img3 from "/assets/gallery/img3.png";
import img4 from "/assets/gallery/img4.png";
import img5 from "/assets/gallery/img5.png";

const images = [img1, img2, img3, img4, img5];

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div>
      <Navbar />

      <div className="image-container">
        <img
          src="/assets/IMG_6162.jpeg"
          alt="Logo"
          className="full-width-image"
          style={{ width: "100%", height: "90vh", objectFit: "cover" }}
        />

        <div className="image-gradient"></div>
        <div className="overlay-text">
          <h1>James Nguyen</h1>
          <p>Programmer & Animator</p>
        </div>
      </div>

      <div className="content-container">
        <section id="about">
          <div className="james-pfp">
            <img
              src="/assets/jimmypfp.png"
              alt="James Nguyen"
              style={{ width: "200px", height: "auto", objectFit: "cover" }}
            />
          </div>
        </section>
        <div className="about-me">
          <h1>ABOUT ME</h1>
          <h2>Hey! I'm James!</h2>
          <p>
            I’m a Computer Science student with a passion for game development
            and animation. My love for animation really clicked after playing{" "}
            <a
              href="https://www.expedition33.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Clair Obscur: Expedition 33
            </a>
            — the art and gameplay really drove me to have a a deeper
            appreciation for visual storytelling in video games. When I’m not
            building something in code, I’m usually animating something cool in
            Maya or playing{" "}
            <a
              href="https://playvalorant.com/en-us/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Valorant
            </a>{" "}
            with my friends. I honestly think I'd want to go to art school to
            learn more about Animation!
          </p>
          <div className="resume" style={{ display: "flex" }}>
            <a
              href="/assets/jNguyen_Resume24.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-button"
            >
              Resume
            </a>
          </div>
        </div>

        <div className="slideshow-container">
          <img
            src={images[currentImageIndex]}
            alt="Slideshow"
            className="slideshow-image"
          />
          <button className="prev-button" onClick={handlePrevClick}>
            &#10094;
          </button>
          <button className="next-button" onClick={handleNextClick}>
            &#10095;
          </button>
        </div>
      </div>

      <section id="projects">
        <div className="projects-container">
          <div className="project-card-container">
            <div className="project-card">
              <img src="/assets/projects/project1.png" alt="Project 1" />
              <div className="project-card-description">
                <h2 className="project-card-title">Portfolio Site</h2>
                <div className="project-card-text">
                  <p>
                    A simple portfolio site built using React.js and Vite. The
                    design is heavily inspired by Riot Games'{" "}
                    <a
                      href="https://playvalorant.com/en-us/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      {" "}
                      Valorant
                    </a>{" "}
                    home webpage. I think it looks pretty cool.
                  </p>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <p>Mar. 2024</p>
                </div>
              </div>
            </div>
            <div className="project-card">
              <img src="/assets/projects/project2.png" alt="Project 2" />
              <div className="project-card-description">
                <h2 className="project-card-title">AI Chatbot</h2>
                <div className="project-card-text">
                  <p>UC Berkeley Skydeck: AI Hackathon</p>
                  <br></br>
                  <p>
                    My very FIRST hackathon ever where I worked with a
                    collaborative team of UC Berkeley freshmen delivering a
                    simple AI Chatbot using GPT 3.5 Turbo API endpoints.
                  </p>
                  <br></br>
                  <p>we won nothing... but we had fun</p>
                  <br></br>
                  <p>June 2023</p>
                </div>
              </div>
            </div>
            <div className="project-card">
              <img src="/assets/projects/project3.png" alt="Project 3" />
              <div className="project-card-description">
                <h2 className="project-card-title">2D Unity Cafe Game</h2>
                <div className="project-card-text">
                  <p>
                    Working with a collaborative team on a 2D cafe game on Unity
                    for Twitch streamer{" "}
                    <a
                      href="https://www.twitch.tv/39daph"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      {" "}
                      39daph
                    </a>
                    . I'm currently learning alot about the Unity Engine along
                    with working with a cross-functional team of programmers,
                    artists, storywriters, and more!
                  </p>

                  <br></br>
                  <br></br>
                  <br></br>
                  <p>Still in progress</p>
                </div>
              </div>
            </div>
          </div>
          <div className="projects">
            <h1>PROJECTS</h1>
            <h2>and other stuff...</h2>
            <p>
              I haven't got much here so far... but theres big things to come!
            </p>
          </div>
        </div>
      </section>

      <section id="videos">
        <div className="video-container">
          <div className="james-pfp"></div>
          <div className="about-me">
            <h1>ANIMATIONS</h1>
            <h2>I also like to make animations!</h2>
            <p>
              I'm really passionate about Game Art and Animation! <br />
              Check out some of my reels I've made animating with Autodesk Maya!
            </p>
            <div className="resume" style={{ display: "flex" }}>
              <a
                href="https://www.artstation.com/jammooze"
                target="_blank"
                rel="noopener noreferrer"
                className="resume-button"
              >
                ArtStation
              </a>
            </div>
          </div>

          <div className="youtube-container">
            <div
              style={{
                padding: "53.61% 0 0 0",
                position: "relative",
              }}
            >
              <iframe
                src="https://player.vimeo.com/video/1099043533?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                title="Psylocke Weight Animation"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="video-container">
          <div className="james-pfp"></div>
          <div className="about-me">
            <div className="video-gameplay">
              <video autoPlay muted loop>
                <source src={gameplayFootage} type="video/mp4" />
                Your browser does not support the video tag or the file format
                of this video.
              </video>
            </div>
            <p className="video-description">
              "Study? Nah we gaming!" - Jabillson
            </p>
          </div>

          <div className="contact-me">
            <h1>CONTACT</h1>
            <h2>Thanks for visiting!</h2>
            <p>
              Feel free to contact me through my email below, else reach out to
              me on LinkedIn!
            </p>
            <a
              href="mailto:nguyejames03@gmail.com"
              className="resume-button"
              style={{
                alignItems: "center",
              }}
            >
              <i
                className="bi bi-envelope-check-fill"
                style={{ marginRight: "10px" }}
              ></i>
              nguyejames03@gmail.com
            </a>
          </div>
        </div>
      </section>
      <footer className="footer">
        <p>Built by James Nguyen © 2024</p>
      </footer>
    </div>
  );
}

export default App;
