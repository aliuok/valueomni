import { concepts } from "@/data/concepts";
import { people } from "@/data/people";
import { videos } from "@/data/videos";
import { linkifyText } from "@/lib/linkify";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const concept = concepts.find((c) => c.slug === slug);

  if (!concept) {
    return {
      title: "Concept not found",
    };
  }

  return {
    title: `${concept.name} | ValueOmni`,
    description: concept.description,
  };
}
export default async function ConceptPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const concept = concepts.find((c) => c.slug === slug);

  if (!concept) return <div>Concept not found</div>;
const linkedContent = linkifyText(
  concept.content,
  concepts,
  people
);
  const relatedPeople = people.filter((p) =>
    p.conceptIds?.includes(concept.id)
  );

  const relatedVideos = videos.filter((v) =>
    v.conceptIds?.includes(concept.id)
  );

  const relatedConcepts = concepts.filter(
  (c) =>
    c.id !== concept.id &&
    (relatedVideos.some((v) =>
      v.conceptIds?.includes(c.id)
    ) ||
      relatedPeople.some((p) =>
        p.conceptIds?.includes(c.id)
      ))
);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{concept.name}</h1>

      <p className="mt-4 text-gray-700">{concept.description}</p>
<div className="mt-6">
  <h2 className="text-xl font-semibold">Explanation</h2>
  <p className="mt-2 whitespace-pre-line text-gray-700">
    <div
  className="mt-2 whitespace-pre-line text-gray-700"
  dangerouslySetInnerHTML={{ __html: linkedContent }}
/>
  </p>
</div>
<div className="mt-6">
  <h2 className="text-xl font-semibold">Key Points</h2>
  <ul className="list-disc ml-6 mt-2">
    {concept.keyPoints?.map((point, index) => (
      <li key={index}>{point}</li>
    ))}
  </ul>
</div>
      {/* 人物 */}
      <h2 className="mt-8 text-xl font-semibold">People</h2>
      <ul className="list-disc ml-6">
        {relatedPeople.map((p) => (
          <li key={p.id}>
            <a href={`/people/${p.slug}`} className="text-blue-600 underline">
              {p.name}
            </a>
          </li>
        ))}
      </ul>

      {/* 视频 */}
      <h2 className="mt-8 text-xl font-semibold">Videos</h2>
      <div className="space-y-6 mt-4">
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
      <div className="mt-12">
  <h2 className="text-2xl font-bold mb-4">You may also like</h2>

  {/* 概念 */}
  <div>
    <h3 className="font-semibold">Concepts</h3>
    <div className="flex gap-2 flex-wrap mt-2">
      {relatedConcepts.map((c) => (
        <a
          key={c.id}
          href={`/concepts/${c.slug}`}
          className="px-3 py-1 bg-gray-200 rounded-full text-sm"
        >
          {c.name}
        </a>
      ))}
    </div>
  </div>

  {/* 人物 */}
  <div className="mt-6">
    <h3 className="font-semibold">People</h3>
    <ul className="list-disc ml-6 mt-2">
      {relatedPeople.map((p) => (
        <li key={p.id}>
          <a href={`/people/${p.slug}`} className="text-blue-600 underline">
            {p.name}
          </a>
        </li>
      ))}
    </ul>
  </div>

  {/* 视频 */}
  <div className="mt-6">
    <h3 className="font-semibold">Videos</h3>
    <ul className="list-disc ml-6 mt-2">
      {relatedVideos.map((v) => (
        <li key={v.id}>{v.title}</li>
      ))}
    </ul>
  </div>
</div>
    </main>
  );
}