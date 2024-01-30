<script>
  import { onDestroy, onMount } from 'svelte';
  import { supabase } from '$lib/supabase';

  /**
   * @type {any[]}
   */
  let lessons = [];

  let isLoading = false;

  /**
   * @type {import("@supabase/realtime-js").RealtimeChannel}
   */
  let lessonsChannel;

  async function getLessons() {
    isLoading = true;
    const { data, error } = await supabase
      .from('lesson')
      .select(
        `
      id,
      title,
      author,
      created_at,
      slug
    `
      )
      .order('id', { ascending: true });

    if (error) {
      isLoading = false;
      lessons = [];
      console.error('Error fetching lessons', error);

      // alert('Something went wrong');
      return;
    }

    lessons = data.map((l) => ({
      ...l,
      createdAt: l.created_at,
    }));
    isLoading = false;

    console.log({ lessons });
  }

  /**
   * @param {any} id
   */
  async function deleteLesson(id) {
    const { error } = await supabase.from('lesson').delete().eq('id', id);

    if (error) {
      console.error('Error deleting lesson', error);
      return;
    }

    lessons = lessons.filter((lesson) => lesson.id !== id);
  }

  onMount(() => {
    getLessons();

    lessonsChannel = supabase
      .channel('any')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'lesson' },
        (payload) => {
          console.log('Change received!', payload);
          const { eventType, new: newLessonPayload, old } = payload;

          if (eventType === 'DELETE') {
            lessons = lessons.filter((lesson) => lesson.id !== old.id);
          } else if (eventType === 'INSERT') {
            lessons = [
              ...lessons,
              {
                ...newLessonPayload,
                createdAt: newLessonPayload.created_at,
              },
            ];
          }
        }
      )
      .subscribe();
  });

  onDestroy(() => {
    if (!lessonsChannel) return;

    supabase.removeChannel(lessonsChannel);
  });
</script>

<section class="w-[90vw] flex flex-col items-center my-10">
  <div class="flex justify-end w-full mb-3">
    <a
      class="border border-gray-600 text-black px-5 py-2 rounded-md mr-2"
      href="/lessons/new"
    >
      New
    </a>
    <button
      class="bg-gray-600 text-white px-5 py-2 rounded-md"
      on:click={() => getLessons()}
      disabled={isLoading}
    >
      Refresh
    </button>
  </div>
  {#if isLoading}
    Loading...
  {:else}
    {#each lessons as lesson}
      <div
        class="bg-gray-100 rounded-md mb-5 px-10 py-5 w-[500px] hover:shadow-lg"
      >
        <h3 class="text-xl mb-0">
          <a class="hover:underline" href="/lessons/{lesson.slug}"
            >{lesson.id}. - {lesson.title}</a
          >
        </h3>
        <p class="text-sm mb-0">By {lesson.author}</p>
        <div class="flex items-center justify-between">
          <p class="text-xs">{lesson.createdAt}</p>

          <button
            class="bg-red-600 text-white px-5 py-2 rounded-md"
            on:click={() => deleteLesson(lesson.id)}
          >
            Delete
          </button>
        </div>
      </div>
    {/each}
  {/if}
</section>
