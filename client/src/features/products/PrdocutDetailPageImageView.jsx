import { useState } from "react";
import styled from "styled-components";

import { device } from "../../utils/devices";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 100%;
`;

const StyledSelectedMedia = styled.div`
  height: 20rem;
  width: 20rem;

  @media ${device.laptopS} {
    height: 15rem;
    width: 15rem;
  }

  @media ${device.mobileM} {
    height: 10rem;
    width: 10rem;
  }
`;

const StyledMediaRowLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem;
`;

const StyledMediaRowItem = styled.img`
  height: 5rem;
  border: 1px solid var(--color-grey-700);

  :hover {
    border: 5px solid var(--color-grey-700);
  }
`;

function ProductDetailPageImageView({
  name,
  mainImage,
  additionalImages,
  video,
}) {
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
          <StyledMediaRowItem
            id="main-image"
            src={mainImage}
            alt={`${name} Primary Pic`}
          />
        )}

        {additionalImages &&
          additionalImages.map((cur, i) => (
            <StyledMediaRowItem
              id={`additional-image[${i + 1}]`}
              src={cur}
              key={cur}
              alt={`${name} Additional Pic -- ${i + 1}`}
            />
          ))}

        {video && (
          <StyledMediaRowItem
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

export default ProductDetailPageImageView;
