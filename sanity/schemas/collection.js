export default {
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    { name: 'title',       title: 'Title',       type: 'string', validation: Rule => Rule.required() },
    { name: 'slug',        title: 'Slug',        type: 'slug',   options: { source: 'title' } },
    { name: 'description', title: 'Description', type: 'text',   rows: 3 },
    { name: 'coverImage',  title: 'Cover Image', type: 'image',  options: { hotspot: true } },
    { name: 'youtubeId',   title: 'YouTube Video ID', type: 'string',
      description: 'ID from youtube.com/watch?v=XXXXXX — used in the video slider' },
    { name: 'order',       title: 'Display Order', type: 'number', initialValue: 0 },
    { name: 'isVisible',   title: 'Show in Projects tab', type: 'boolean', initialValue: true },
  ],
  preview: {
    select: { title: 'title', subtitle: 'description', media: 'coverImage' }
  }
};
