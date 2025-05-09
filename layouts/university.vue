<template>
  <div class="docus-layout">
    <!-- Sidebar -->
    <ProseAside>
      <slot name="sidebar" />
    </ProseAside>

    <!-- Main Content -->
    <Prose>
      <slot />
    </Prose>

    <!-- Table of Contents -->
    <ProseAside>
      <slot name="toc" />
    </ProseAside>
  </div>
</template>

<style scoped>
.docus-layout {
  display: flex;
  height: 100vh;
}
.sidebar {
  width: 20%;
  background: #f8f9fa;
  padding: 1rem;
}
.content {
  width: 60%;
  padding: 2rem;
}
.table-of-contents {
  width: 20%;
  background: #f1f3f5;
  padding: 1rem;
}
</style>