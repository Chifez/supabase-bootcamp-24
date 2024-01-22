<script>
  import { supabase } from '$lib/supabase';
  import { onMount } from 'svelte';

  export let data;

  /**
   * @type {{ title: any; author: any; created_at: any; body: any; } | null}
   */
  let lesson = null;

  async function getLesson(slug = '') {
    const { data, error } = await supabase
      .from('lesson')
      .select('*')
      .match({
        slug,
      })
      .single();

    if (error) {
      console.error('Error getting lesson', error);
      return error;
    }

    lesson = data;
  }

  onMount(() => {
    getLesson(data.slug);
  });
</script>

{#if lesson}
  <section class="mt-10 w-[70vw] mx-auto">
    <div class="text-center w-[50%] mx-auto mb-10">
      <h1 class="text-2xl mg-5">{lesson.title}</h1>
      <div class="flex items-center justify-between">
        <p class="text-md">{lesson.author}</p>
        <p class="text-md">{lesson.created_at}</p>
      </div>
    </div>

    <div>
      <p class="text-md">{lesson.body}</p>
    </div>
  </section>
{/if}
