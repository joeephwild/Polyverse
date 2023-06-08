import React from "react";
import { Player } from "@livepeer/react";
import { page1 } from "../assets";

const PosterImage = () => {
  return (
    <img src={page1} className="object-cover w-full h-full " alt="video" />
  );
};

const playbackId =
  "bafybeigtqixg4ywcem3p6sitz55wy6xvnr565s6kuwhznpwjices3mmxoe";

const Video = () => {
  return (
    <div className="flex-1 h-screen">
      <div className="mx-8 flex flex-col w-full space-y-10 mt-9">
        <div className="!min-w- h-[549px]">
          <Player
            title="Waterfalls"
            playbackId={playbackId}
            autoPlay
            showTitle={false}
            poster={<PosterImage />}
          />
        </div>
        <div className="flex flex-col items-start">
          <h3>How to design a thumnail</h3>
          <p>Kaydeen2001</p>
          <p>
            Description: In this concise video, learn the art of designing
            compelling thumbnails that grab attention and entice viewers to
            click. Discover expert tips, techniques, and essential design
            principles to create eye-catching visuals that effectively represent
            your content and increase engagement. From color selection and
            typography to composition and imagery, unlock the secrets to
            crafting thumbnails that make your videos stand out from the crowd.
            Elevate your channel's visual appeal and attract more viewers with
            this must-watch tutorial on thumbnail design.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Video;
