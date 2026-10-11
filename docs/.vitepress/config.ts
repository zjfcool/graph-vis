import { defineConfig } from "vitepress";
import { zh } from "./zh.ts";
import { en } from "./en.ts";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "GraphVis",
  base: "/graph-vis/",
  locales: {
    root: zh,
    en: en,
  },
  vite: {
    server: {
      fs: {
        allow: [".."],
      },
    },
  },
  themeConfig: {
    search: {
      provider: "local",
      options: {
        locales: {
          // 中文配置（root 对应默认语言，即中文）
          root: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                displayDetails: "显示详细列表",
                resetButtonTitle: "清除查询条件",
                backButtonTitle: "关闭搜索",
                noResultsText: "无法找到相关结果",
                footer: {
                  selectText: "选择",
                  selectKeyAriaLabel: "输入",
                  navigateText: "切换",
                  navigateUpKeyAriaLabel: "上箭头",
                  navigateDownKeyAriaLabel: "下箭头",
                  closeText: "关闭",
                  closeKeyAriaLabel: "esc",
                },
              },
            },
          },
          // 英文配置
          en: {
            translations: {
              button: {
                buttonText: "Search",
                buttonAriaLabel: "Search",
              },
              modal: {
                displayDetails: "Display detailed list",
                resetButtonTitle: "Reset search",
                backButtonTitle: "Close search",
                noResultsText: "No results found",
                footer: {
                  selectText: "Select",
                  selectKeyAriaLabel: "Enter",
                  navigateText: "Navigate",
                  navigateUpKeyAriaLabel: "Arrow up",
                  navigateDownKeyAriaLabel: "Arrow down",
                  closeText: "Close",
                  closeKeyAriaLabel: "Esc",
                },
              },
            },
          },
        },
      },
    },
    socialLinks: [{ icon: "github", link: "https://github.com/zjfcool/graph-vis" }],
  },
});
