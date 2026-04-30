import { tags } from "@/data/tags";
import { people } from "@/data/people";
import { videos } from "@/data/videos";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const person = people.find((p) => p.slug === slug);

  if (!person) {
    return {
      title: "Person not found",
    };
  }

  return {
    title: `${person.name} | ValueOmni`,
    description: person.bio,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const tag = tags.find((t) => t.slug === slug);

  if (!tag) return <div>Tag not found</div>;
const relatedVideos = videos.filter((v) =>
  v.tagIds?.includes(tag.id)
);
  const relatedPeople = people.filter((p) =>
    p.tagIds?.includes(tag.id)
  );

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{tag.name}</h1>

      <h2 className="mt-6 text-xl font-semibold">People</h2>

      <ul className="list-disc ml-6">
        {relatedPeople.map((p) => (
          <li key={p.id}>
            <a href={`/people/${p.slug}`} className="text-blue-600 underline">
              {p.name}
            </a>
          </li>
        ))}
      </ul>
      <h2 className="mt-8 text-xl font-semibold">Videos</h2>

<div className="mt-4 space-y-6">
  {relatedVideos.map((video) => (
    <div key={video.id}>
      <p className="font-medium mb-2">{video.title}</p>

      <iframe
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${video.youtubeId}`}
        title={video.title}
        allowFullScreen
        className="rounded-lg"
      ></iframe>
    </div>
  ))}
</div>
    </main>
  );
}