<script>
  import { supabase } from '$lib/supabase';
  import { onMount } from 'svelte';

  /**
   * @type {any[]}
   */
  let countries = [];

  onMount(async () => {
    const { data } = await supabase
      .from('countries')
      .select()
      .order('id', { ascending: true });

    if (!data) return;

    countries = data;
  });
</script>

<ul>
  {#each countries as country}
    <li>{country.id}. {country.name} - {country.created_at}</li>
  {/each}
</ul>
