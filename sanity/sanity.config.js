import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: '1stbornmusic',
  title: '1stBornMusic',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mu0erkjs',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
