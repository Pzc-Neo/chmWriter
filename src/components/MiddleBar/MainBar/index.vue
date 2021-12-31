<template>
  <div class="main_bar">
    <GroupTree />
    <ItemList />
    <ContentBar />
    <DetailBar />
  </div>
</template>

<script>
import GroupTree from '@/components/MiddleBar/GroupTree'
import ItemList from '@/components/MiddleBar/ItemList'
import ContentBar from '@/components/MiddleBar/ContentBar'
import DetailBar from '@/components/MiddleBar/DetailBar'

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
.main_bar {
  flex: 1;
  display: flex;
}
</style>
