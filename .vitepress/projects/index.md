# Projects

<script setup>
import projects from './projects.json'
</script>

<ul>
  <li v-for="p in projects" :key="p.repo">
    <a :href="p.url" target="_blank" rel="noopener">{{ p.name }}</a>
    · <a :href="`https://github.com/${p.repo}`" target="_blank" rel="noopener">Repo</a>
    <div v-if="p.description">{{ p.description }}</div>
  </li>
</ul>
