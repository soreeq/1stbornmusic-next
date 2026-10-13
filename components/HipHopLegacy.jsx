'use client';
import VideoSlider from './VideoSlider';
import BigProofMemoriam from './BigProofMemoriam';

export default function HipHopLegacy({ beats, memoriam, onTabChange }) {
  return (
    <div>
      <VideoSlider beats={beats} onTabChange={onTabChange} />
      <BigProofMemoriam memoriam={memoriam} />
    </div>
  );
}