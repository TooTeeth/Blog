import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const allPosts = getSortedPostsData();

  return (
    <section className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">블로그</h1>
      <ul>
        {allPosts.map(({ id, date, title }) => (
          <li key={id} className="mb-4">
            <Link href={`/blog/${id}`} className="text-2xl font-medium text-blue-500 hover:underline">
              {title}
            </Link>
            <br />
            <small className="text-gray-500">{date}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}
