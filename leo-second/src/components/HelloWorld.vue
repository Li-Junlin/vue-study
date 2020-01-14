<template>
  <div class="hello">
    <h1>{{ userList }}</h1>
  </div>
</template>

<script>
import testApi from "@/api/testApi";

export default {
  name: "HelloWorld",

  data() {
    return {
      userList: []
    };
  },

  created() {
    this.fetcData();
  },

  methods: {
    fetcData() {
      testApi.getList().then(response => {
        console.log(response.data);
        this.userList = response.data;
      });
    }
  },

  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
