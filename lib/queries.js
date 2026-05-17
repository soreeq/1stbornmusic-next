export const beatsQuery = `
  *[_type == "beat" && visibility == "public"] | order(plays desc) {
    _id, title, slug, bpm, key, tags,
    "audioSrc": select(
      defined(audioFile.asset) => audioFile.asset->url,
      audioSrc
    ),
    thumbnail, status, isNew, isFeatured, plays, prices,
    "collection": collection->{ _id, title, slug }
  }
`;

export const featuredBeatsQuery = `
  *[_type == "beat" && visibility == "public" && isFeatured == true] | order(plays desc)[0...8] {
    _id, title, slug, bpm, key, tags,
    "audioSrc": select(
      defined(audioFile.asset) => audioFile.asset->url,
      audioSrc
    ),
    thumbnail, status, isNew, isFeatured, plays, prices
  }
`;

export const videosQuery = `
  *[_type == "youtubeVideo" && isVisible == true] | order(order asc) {
    _id, title, videoId, description, order
  }
`;

export const galleryQuery = `
  *[_type == "galleryPhoto" && isVisible == true] | order(order asc) {
    _id, caption, order,
    "imageUrl": image.asset->url,
    "imageLqip": image.asset->metadata.lqip,
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height
  }
`;

export const collectionsQuery = `
  *[_type == "collection" && isVisible == true] | order(order asc) {
    _id, title, slug, description, coverImage, youtubeId, order,
    "beats": beats[@->visibility == "public"]->{
      _id, title, bpm, key, tags,
      "audioSrc": select(
        defined(audioFile.asset) => audioFile.asset->url,
        audioSrc
      ),
      status, isNew, plays, prices
    }
  }
`;
