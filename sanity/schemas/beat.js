export default {
  name: 'beat',
  title: 'Beat',
  type: 'document',
  fields: [
    { name: 'title',      title: 'Title',       type: 'string',  validation: Rule => Rule.required() },
    { name: 'slug',       title: 'Slug',        type: 'slug',    options: { source: 'title' } },
    { name: 'bpm',        title: 'BPM',         type: 'number'  },
    { name: 'key',        title: 'Key',         type: 'string'  },
    { name: 'tags',       title: 'Tags',        type: 'array', of: [{ type: 'string' }],
      options: { list: ['Hard','Detroit','Boom Bap','Hip-Hop','Cinematic','Lo-fi','Dark','Underground','Battle Rap','Classic'] } },
    { name: 'audioSrc',   title: 'Audio File URL', type: 'url',
      description: 'Full URL: https://soulmanager.pl/beats/FileName.mp3' },
    { name: 'thumbnail',  title: 'Thumbnail',   type: 'image',   options: { hotspot: true } },
    { name: 'visibility', title: 'Visibility',  type: 'string',
      options: { list: ['public','private'], layout: 'radio' }, initialValue: 'public' },
    { name: 'status',     title: 'Status',      type: 'string',
      options: { list: ['available','sold'], layout: 'radio' }, initialValue: 'available' },
    { name: 'isNew',      title: 'Mark as New', type: 'boolean', initialValue: false },
    { name: 'isFeatured', title: 'Featured on Homepage', type: 'boolean', initialValue: false },
    { name: 'plays',      title: 'Play Count',  type: 'number',  initialValue: 0 },
    { name: 'prices',     title: 'License Prices', type: 'object',
      fields: [
        { name: 'mp3',       title: 'MP3 Lease ($)',        type: 'number', initialValue: 29  },
        { name: 'wav',       title: 'WAV Lease ($)',        type: 'number', initialValue: 49  },
        { name: 'trackout',  title: 'Trackout Lease ($)',   type: 'number', initialValue: 99  },
        { name: 'unlimited', title: 'Unlimited Lease ($)',  type: 'number', initialValue: 149 },
        { name: 'exclusive', title: 'Exclusive Rights ($)', type: 'number', initialValue: 299 },
      ]
    },
    { name: 'collection', title: 'Collection', type: 'reference', to: [{ type: 'collection' }], weak: true },
  ],
  preview: {
    select: { title: 'title', subtitle: 'status', media: 'thumbnail' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle === 'sold' ? '🔴 SOLD' : '🟢 Available', media };
    }
  }
};
