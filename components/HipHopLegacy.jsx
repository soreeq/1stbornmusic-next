'use client';
import VideoSlider from './VideoSlider';
import BigProofMemoriam from './BigProofMemoriam';

export default function HipHopLegacy({ beats, onTabChange }) {
  return (
    <div>
      <VideoSlider beats={beats} onTabChange={onTabChange} />
      <BigProofMemoriam />
    </div>
  );
}