'use client';
import VideoSlider from './VideoSlider';
import BigProofMemoriam from './BigProofMemoriam';
import { youtubeId } from '../lib/youtubeId';
import { LEGACY_DEFAULTS } from '../lib/legacyDefaults';

export default function HipHopLegacy({ beats, memoriam, legacy, onTabChange }) {
  const links = legacy ? legacy.videos ?? [] : LEGACY_DEFAULTS.videos;
  const videoIds = links.map(youtubeId).filter(Boolean);

  return (
    <div>
      {videoIds.length > 0 && <VideoSlider videoIds={videoIds} beats={beats} onTabChange={onTabChange} />}
      <BigProofMemoriam memoriam={memoriam} />
    </div>
  );
}
