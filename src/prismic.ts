import * as prismic from '@prismicio/client';
// const API_ENDPOINT = import.meta.env.PUBLIC_API_ENDPOINT;
//
const repo_name = 'snazzyham';
const client = prismic.createClient(repo_name, {
  accessToken: import.meta.env.API_KEY
});

export async function getBlogPosts(latest: boolean) {
  return await client.getAllByType('blog_post', {
    orderings: {
      field: latest === true ? 'document.last_publication_date' : 'document.first_publication_date',
      direction: 'desc'
    }
  });
}

export async function getSinglePost(uuid: string) {
  return await client.getByUID('blog_post', uuid);
}

export async function getCases() {
  return await client.getAllByType('case_study');
}

export async function getSingleCase(uuid: string) {
  return await client.getByUID('case_study', uuid);
}

export async function getPage(page: string) {
  return client.getByType(page);
}
