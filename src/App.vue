<template>
  <main>
    <h1>IP Address Tracker</h1>

    <div class="">
      <input type="text" v-model="ipInput" placeholder="Search for any IP address or domains" />
    </div>

    <section>
      <ul>
        <li>
          <strong>IP Address</strong>
          <span>-----</span>
        </li>
        <li>
          <strong>Location</strong>
          <span>-----</span>
        </li>
        <li>
          <strong>Timezone</strong>
          <span>UTC-----</span>
        </li>
        <li>
          <strong>ISP</strong>
          <span>-----</span>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      ipInput: '',
    };
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>

<style lang="scss" scoped>

</style>
