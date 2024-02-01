import { supabase } from '$lib/supabase';

export const load = async ({ params }) => {
  const { data, error } = await supabase.from('lesson').select(
    `
  id,
  title,
  author,
  slug,
  body
`
  );

  const lessonData = data.filter((lesson) => lesson.slug == params.lessonslug);
  return {
    id: lessonData[0].id,
    slug: lessonData[0].slug,
    title: lessonData[0].title,
    author: lessonData[0].author,
    body: lessonData[0].body,
  };
};
