<style>
.grad-border {
  height: 1px;
  width: 100%;
  margin: 0 auto;
  display: flex;
}
.left-border,
.right-border {
  width: 100%;
  border-bottom: 2px solid;
  display: inline-block;
}
.left-border {
  border-image: linear-gradient(270deg, #b3b3b3, #fff) 1;
}
.right-border {
  border-image: linear-gradient(90deg, #b3b3b3, #fff) 1;
}
</style>
<template>
  <div class="grad-border">
    <div class="left-border"></div>
    <div class="right-border"></div>
  </div>
</template>
