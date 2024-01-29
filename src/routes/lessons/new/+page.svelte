<script>
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase';

  let newLesson = {
    id: null,
    slug: '',
    title: '',
    author: '',
    body: '',
  };

  let formError;

  async function onSubmit() {
    console.log(newLesson);
    const { data, error } = await supabase
      .from('lesson')
      .insert({
        slug: newLesson.slug,
        title: newLesson.title,
        author: newLesson.author,
        body: newLesson.body,
      })
      .select();

    if (error) {
      formError = error;
      console.error('Submission error', error);

      alert('Failed');
      return;
    }

    alert('Success');
    goto('/lessons');
  }
</script>

<section class="w-[90vw] flex flex-col items-center my-10">
  <div class="max-w-[500px] w-full">
    <h2 class="mb-4 text-2xl">Create a new lesson</h2>
    <form class="p-5 rounded-md border" on:submit|preventDefault={onSubmit}>
      <!-- Title -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="title"
          >Title</label
        >
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="title"
          bind:value={newLesson.title}
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
          bind:value={newLesson.slug}
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
          bind:value={newLesson.author}
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
          bind:value={newLesson.body}
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
