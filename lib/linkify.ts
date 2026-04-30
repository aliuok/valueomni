export function linkifyText(
  text: string,
  concepts: any[],
  people: any[]
) {
  let result = text;

  // 替换概念
  concepts.forEach((c) => {
    const regex = new RegExp(`\\b${c.name}\\b`, "gi");
  
    // 👉 防止自己链接自己

  if (result.includes(`href="/concepts/${c.slug}"`)) return;

    result = result.replace(
      regex,
      `<a href="/concepts/${c.slug}" style="color:blue;text-decoration:underline;">${c.name}</a>`
    );
  });

  // 替换人物
  people.forEach((p) => {
    const regex = new RegExp(`\\b${p.name}\\b`, "gi");

    result = result.replace(
      regex,
      `<a href="/people/${p.slug}" style="color:blue;text-decoration:underline;">${p.name}</a>`
    );
  });

  return result;
}