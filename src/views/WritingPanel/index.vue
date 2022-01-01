<template>
  <div class="writing_panel">
    <GroupTree />
    <ItemList />
    <ContentBar>
      <TabBar />
    </ContentBar>
    <DetailBar />
  </div>
</template>

<script>
import GroupTree from '@/views/Common/GroupTree'
import ItemList from '@/views/Common/ItemList'
import ContentBar from '@/views/Common/ContentBar'
import DetailBar from '@/views/Common/DetailBar'
import TabBar from '@/views/Common/TabBar'

export default {
  components: {
    GroupTree,
    ItemList,
    ContentBar,
    DetailBar,
    TabBar
  }
}
</script>

<style lang="scss" scoped>
.writing_panel {
  flex: 1;
  display: flex;
}
</style>
