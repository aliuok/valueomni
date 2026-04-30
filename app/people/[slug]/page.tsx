export const runtime = "nodejs";



import { videos } from "@/data/videos";
import { people } from "@/data/people";
import { tags } from "@/data/tags";
import Link from "next/link";
import { concepts } from "@/data/concepts";

export default async function PersonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const person = people.find((p) => p.slug === slug);

  if (!person) {
    return <div>Not found</div>;
  }


  // ✅ 关键修复：兜底数组
  const personTags = tags.filter((t) =>
    (person.tagIds || []).includes(t.id)
  );

  const personConcepts = concepts.filter((c) =>
    (person.conceptIds || []).includes(c.id)
  );

  const personVideos = videos.filter(
    (v) => v.personId === person.id
  );

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{person.name}</h1>
      <p className="mt-4" style={{ whiteSpace: "pre-line" }}>
  {person.bio}
</p>

    

      <div className="mt-4">
        <p>Birth: {person.birth}</p>
        <p>Nationality: {person.nationality}</p>
      </div>

      {/* Concepts */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Concepts</h2>
        <div className="flex gap-2 mt-2 flex-wrap">
          {personConcepts.map((c) => (
            <Link
              key={c.id}
              href={`/concepts/${c.slug}`}
              className="px-3 py-1 bg-blue-100 rounded-full text-sm"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4 flex gap-2 flex-wrap">
        {personTags.map((tag) => (
          <Link
            key={tag.id}
            href={`/tags/${tag.slug}`}
            className="px-3 py-1 bg-gray-200 rounded-full text-sm"
          >
            {tag.name}
          </Link>
        ))}
      </div>

      {/* Videos ✅ 修复结构 */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Videos</h2>

        <ul className="space-y-6">
          {personVideos.map((video) => (
            <li key={video.id}>
              <p className="font-medium mb-2">{video.title}</p>

              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                allowFullScreen
                className="rounded-lg"
              />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}