<template>
  <div class="data_panel">
    <GroupTree />
    <ItemList />
    <ContentBar />
    <DetailBar />
  </div>
</template>

<script>
import GroupTree from '@/views/Common/GroupTree'
import ItemList from '@/views/Common/ItemList'
import ContentBar from '@/views/Common/ContentBar'
import DetailBar from '@/views/Common/DetailBar'

export default {
  components: {
    GroupTree,
    ItemList,
    ContentBar,
    DetailBar
  }
}
</script>

<style lang="scss" scoped>
.data_panel {
  flex: 1;
  display: flex;
  background-color: rgb(228, 228, 228);
}
</style>
