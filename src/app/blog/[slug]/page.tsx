import { getPostData, getSortedPostsData } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function BlogPostPage({ params }: any) {
  const postData = await getPostData(params.slug);

  console.log(postData);
  return (
    <article className="max-w-2xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
      <p className="text-sm text-gray-500 mb-8">{postData.date}</p>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
}
