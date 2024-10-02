import { useState } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const StyledSelectedMedia = styled.div`
  height: 25rem;
  width: 25rem;
`;

const StyledMediaRowLayout = styled.div`
  display: flex;
  gap: 0.5rem;
  height: 6rem;
  width: 6rem;
  justify-content: space-around;
  align-self: start;
  padding: 0.2rem;
`;

function DetailPageImageView({ name, mainImage, additionalImages, video }) {
  const [selectedMedia, setSelectedMedia] = useState("main-image");
  const [selectedMediaAlt, setSelectedMediaAlt] = useState(
    `${name} Primary Pic`
  );
  const [selectedMediaSrc, setSelectedMediaSrc] = useState(mainImage);

  const videoIdSubStringIndexStartEnd = [
    video.indexOf("embed/") + 6,
    video.indexOf("?"),
  ];

  const videoId = video.substring(
    videoIdSubStringIndexStartEnd[0],
    videoIdSubStringIndexStartEnd[1]
  );

  function handleClick(e) {
    setSelectedMedia(e.target.id);
    setSelectedMediaSrc(e.target.src);
    setSelectedMediaAlt(e.target.alt);
  }

  return (
    <StyledContainer>
      <StyledSelectedMedia>
        {selectedMedia !== "youtube-video" && (
          <img
            id={selectedMedia}
            src={selectedMediaSrc}
            alt={selectedMediaAlt}
          />
        )}

        {selectedMedia === "youtube-video" && (
          <iframe
            width="400"
            height="400"
            src={video}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
      </StyledSelectedMedia>

      <StyledMediaRowLayout onClick={handleClick}>
        {mainImage && (
          <img id="main-image" src={mainImage} alt={`${name} Primary Pic`} />
        )}

        {additionalImages &&
          additionalImages.map((cur, i) => (
            <img
              id={`additional-image[${i + 1}]`}
              src={cur}
              key={cur}
              alt={`${name} Additional Pic -- ${i + 1}`}
            />
          ))}

        {video && (
          <img
            id="youtube-video"
            src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
            key={`${name} Youtube Video`}
            alt={`${name} Youtube Video`}
          />
        )}
      </StyledMediaRowLayout>
    </StyledContainer>
  );
}

export default DetailPageImageView;
