import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getAIContent(name: string) {
  try {
    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Write a concise profile of investor ${name}, including biography, investment philosophy, and key achievements.`,
        },
      ],
    });

    return res.choices[0].message.content || "No content";
  } catch (error) {
    console.error(error);
    return "AI content failed to load.";
  }
}

}
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

  const aiContent = await getAIContent(person?.name || slug);
  const personTags = tags.filter((t) =>
  person?.tagIds?.includes(t.id));
const personVideos = videos.filter((v) => v.personId === person?.id);
const personConcepts = concepts.filter((c) =>

  person?.conceptIds?.includes(c.id)

);


  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{person.name}</h1>

      <p className="mt-4" style={{ whiteSpace: "pre-line" }}>

  {aiContent}

</p>

      <div className="mt-4">
        <p>Birth: {person.birth}</p>
        <p>Nationality: {person.nationality}</p>
      </div>
      <div className="mt-6">
  <h2 className="text-xl font-semibold">Concepts</h2>

  <div className="flex gap-2 mt-2 flex-wrap">
    {personConcepts.map((c) => (
      <a
        key={c.id}
        href={`/concepts/${c.slug}`}
        className="px-3 py-1 bg-blue-100 rounded-full text-sm"
      >
        {c.name}
      </a>
    ))}
  </div>
</div>
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
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Videos</h2>
       <ul className="list-disc ml-6">
  {personVideos.map((video) => (
    <li key={video.id}>
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
      ></iframe>
    </li>
  ))}
</ul>
    </li>
  ))}
</ul>
      </div>
    </main>
  );
}