import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'


export const client = sanityClient({
  projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion:'2022-05-17',
  usecdn:true,
  token:process.env.SANITY_API_TOKEN
});


const builder = imageUrlBuilder(client);


export const urlFor =(source)=> builder.image(source);