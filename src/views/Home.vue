<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Database from 'better-sqlite3'
const db = new Database('D:\\data\\default_datebase.db', { verbose: console.log })
const stmt = db.prepare('SELECT * FROM  chapters')
// const info = stmt.run()
for (const cat of stmt.iterate()) {
  console.log(cat)
}

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
