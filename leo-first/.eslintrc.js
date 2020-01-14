module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    // 配置检查规则
    // "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    semi: [2, "always"] // 总是要有分号
  },
  parserOptions: {
    parser: "babel-eslint" // 用来 指定eslint 解析器
  }
};
