import React from 'react';
import './Videos.css'; // Import your CSS for styling
import sampleThumbnail from './farm.jpg'; // Sample thumbnail image

const videosData = Array.from({ length: 12 }, (_, index) => ({
  title: `Video Title ${index + 1}`,
  description: 'A brief description of the video content goes here.',
  uploadDate: `Upload Date: ${new Date().toLocaleDateString()}`,
  educator: `Educator ${index + 1}`,
  thumbnail: sampleThumbnail,
}));

const Videos = () => {
  return (
    <div className="videos-page">
      <div className="videos-container">
        {videosData.map((video, index) => (
          <div className="video-card" key={index}>
            <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
            <div className="video-info">
              <h2 className="video-title">{video.title}</h2>
              <p className="video-description">{video.description}</p>
              <div className="video-meta">
                <p className="video-date">{video.uploadDate}</p>
                <p className="video-educator">{video.educator}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
