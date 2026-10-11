import type { LocaleSpecificConfig, DefaultTheme } from "vitepress";
type LocaleConfig = LocaleSpecificConfig<DefaultTheme.Config> & {
  label: string;
  link?: string;
};
export const zh: LocaleConfig = {
  label: "简体中文",
  lang: "zh-Hans",
  description: "一个基于 PixiJS 的图可视化库，支持上万节点与边的渲染",
  themeConfig: {
    outline: {
      label: "本页目录",
      level: "deep",
    },
    docFooter: { prev: "上一篇", next: "下一篇" },
    lastUpdated: {
      text: "最后更新于",
      formatOptions: { dateStyle: "short", timeStyle: "short" },
    },
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "回到顶部",
    darkModeSwitchTitle: "切换到深色模式",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchLabel: "外观",
    langMenuLabel: "选择语言",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "指南", link: "/guide/introduction/", activeMatch: "^/guide/" },
      { text: "API", link: "/api/graph/", activeMatch: "^/api/" },
      { text: "示例", link: "/demos/", activeMatch: "^/demos/" },
    ],

    sidebar: {
      "/api/": {
        base: "/api",
        items: [
          { text: "图实例", link: "/graph/" },
          { text: "节点实例", link: "/node/" },
          { text: "边实例", link: "/edge/" },
          { text: "布局实例", link: "/layout/" },
          { text: "全局API", link: "/global/" },
        ],
      },
      "/guide/": {
        base: "/guide",
        items: [
          {
            text: "入门",
            items: [
              { text: "简介", link: "/introduction/" },
              { text: "快速开始", link: "/quick-start/" },
              { text: "安装使用", link: "/installation/" },
            ],
          },
          {
            text: "配置",
            items: [
              { text: "图 GraphVis", link: "/graph/" },
              { text: "节点配置", link: "/node/" },
              { text: "边配置", link: "/edge/" },
              { text: "连接配置", link: "/link/" },
              { text: "布局配置", link: "/layout/" },
              { text: "缩放配置", link: "/zoom/" },
              { text: "拖拽配置", link: "/drag/" },
              { text: "主题配置", link: "/theme/" },
            ],
          },
          {
            text: "参考",
            items: [{ text: "类型声明", link: "/types/" }],
          },
        ],
      },
      "/demos/": {
        base: "/demos",
        items: [
          {
            text: "基础",
            collapsed: true,
            items: [{ text: "基础示例", link: "/" }],
          },
          {
            text: "元素",
            collapsed: true,
            items: [
              {
                text: "节点",
                collapsed: true,
                items: [
                  { text: "概览", link: "/element/node/" },
                  { text: "圆形", link: "/element/node/circle/" },
                  { text: "矩形", link: "/element/node/rect/" },
                  { text: "椭圆形", link: "/element/node/ellipse/" },
                  { text: "图片", link: "/element/node/image/" },
                  { text: "多边形", link: "/element/node/polygon/" },
                  { text: "多角星", link: "/element/node/star/" },
                  { text: "文本", link: "/element/node/text/" },
                  { text: "位图文本", link: "/element/node/bitmap-text/" },
                  { text: "自定义节点", link: "/element/node/custom/" },
                ],
              },
              {
                text: "边",
                collapsed: true,
                items: [
                  { text: "自适应", link: "/element/edge/" },
                  { text: "自循环边", link: "/element/edge/selfloop/" },
                  { text: "二次贝塞尔曲线", link: "/element/edge/quadratic/" },
                  { text: "三次贝塞尔曲线", link: "/element/edge/cubic/" },
                ],
              },
              {
                text: "连接线",
                collapsed: true,
                items: [{ text: "创建边", link: "/element/link/" }],
              },
            ],
          },
          {
            text: "主题",
            collapsed: true,
            items: [{ text: "主题切换", link: "/theme/" }],
          },
          {
            text: "布局",
            collapsed: true,
            items: [
              { text: "概览", link: "/layout/" },
              { text: "d3-force", link: "/layout/d3-force/" },
              { text: "random", link: "/layout/random/" },
            ],
          },
          {
            text: "交互",
            collapsed: true,
            items: [
              { text: "增删改查", link: "/interactions/" },
              { text: "拖拽", link: "/interactions/drag/" },
              { text: "缩放", link: "/interactions/zoom/" },
            ],
          },
          {
            text: "性能",
            collapsed: true,
            items: [
              { text: "5000 元素", link: "/performance/5000/" },
              { text: "20000 元素", link: "/performance/20000/" },
              { text: "60000 元素", link: "/performance/60000/" },
            ],
          },
        ],
      },
    },
  },
};
