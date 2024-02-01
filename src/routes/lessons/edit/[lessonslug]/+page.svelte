<script lang="ts">
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase';
  import { onMount } from 'svelte';

  export let data: any;

  let editLesson: any;

  onMount(() => {
    editLesson = data;
  });
  async function onSubmit(id: any) {
    console.log(editLesson);
    const { data, error } = await supabase
      .from('lesson')
      .update({
        slug: editLesson.slug,
        title: editLesson.title,
        author: editLesson.author,
        body: editLesson.body,
      })
      .eq('id', id);

    if (error) {
      console.error('Submission error', error);

      alert('Failed');
      return;
    }

    goto('/lessons');
  }
</script>

{#if editLesson}
  <section class="w-[90vw] flex flex-col items-center my-10">
    <div class="max-w-[500px] w-full">
      <h2 class="mb-4 text-2xl">Edit lesson</h2>
      <form
        class="p-5 rounded-md border"
        on:submit|preventDefault={() => onSubmit(editLesson.id)}
      >
        <!-- Title -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title"
            >Title</label
          >
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="title"
            bind:value={editLesson.title}
          />
        </div>

        <!-- Slug -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="slug"
            >Slug</label
          >
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="slug"
            bind:value={editLesson.slug}
          />
        </div>

        <!-- Author -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="author"
            >Author</label
          >
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="author"
            bind:value={editLesson.author}
          />
        </div>

        <!-- Body -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="body"
            >Body</label
          >
          <textarea
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="body"
            bind:value={editLesson.body}
          />
        </div>

        <!-- Submit button -->
        <input
          type="submit"
          class="bg-gray-600 text-white px-5 py-2 rounded-md hover:cursor-pointer"
        />
      </form>
    </div>
  </section>
{/if}
