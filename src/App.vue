<template>
  <div id="app">
    <header>
      <img alt="co" src="./assets/icon.png" />
      <nav>
        <a @click="close"></a>
      </nav>
      <input type="text" @keydown.enter="enter" v-model="command" class="kit-textbox -flat" />
    </header>
    <main>
      <section v-for="log in logs" :key="log.timestamp">
        <div class="command-input">{{ log.input }}</div>
        <div class="command-output" :class="{ '-error': log.hasError }">{{ log.output }}</div>
      </section>
    </main>
    <footer></footer>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      command: "",
      logs: [],
      history: []
    };
  },
  methods: {
    enter() {
      this.logs.push({
        input: this.command,
        timestamp: new Date().getTime(),
        ...this.eval(this.command),
      });
      this.command = "";
    },
    eval(expr) {
      let output,
        hasError = false;
      try {
        output = new Function(`"use strict"; return ${expr}`)();
      } catch (error) {
        hasError = true;
        output = error;
      }
      return {
        hasError,
        output,
      };
    },
    close() {
      window.close();
    },
  },
};
</script>

<style src="kitstrap/d/kitstrap.css"></style>
<style lang="scss">
body {
  background: rgba(238, 232, 213, 0.8);
}
#app {
  font-family: "Source Code Pro", monospace;
  color: #073642;
}
header {
  padding: 4px 8px;
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  top: 0;
  > img {
    position: absolute;
    z-index: 2;
    height: 80px;
    -webkit-app-region: drag;
  }
  > nav {
    text-align: right;
    -webkit-app-region: drag;
    > a {
      height: 16px;
      width: 16px;
      display: inline-block;
      background: #dc322f;
      box-shadow: 0 1px 8px #dc322f6e;
      position: relative;
      top: 5px;
      border-radius: 50%;
    }
  }
  > .kit-textbox.-flat {
    font-family: "Source Code Pro", monospace;
    background: #073642;
    color: #93a1a1;
    width: calc(100% - 90px);
    margin: 15px 0px 10px 90px;
    font-size: 18px;
  }
}
main {
  > section {
    > div {
      padding: 5px 12px;
      transition: .2s all ease;
      &:hover {
        background: #eee8d5;
      }
    }
    .command-input {
      color: #657b83;
    }
    .command-output {
      color: #268bd2;
      &.-error {
        color: #dc322f;
      }
    }
  }
  > section:first-child {
    margin-top: 90px;
  }
}
</style>
