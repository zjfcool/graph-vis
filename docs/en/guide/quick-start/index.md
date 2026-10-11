# Quick Start

Include PixiJS and GraphVis via CDN to run in the browser without any build tools.

::: tip CDN Choice
GraphVis is available on both unpkg and jsDelivr; you can choose either one.
:::

```html
<!-- Prepare a container -->
<div id="container" style="width: 500px; height: 500px"></div>

<!-- Include PixiJS -->
<script src="https://cdn.jsdelivr.net/npm/pixi.js"></script>

<!-- Include GraphVis (choose one) -->
<!-- unpkg -->
<script src="https://unpkg.com/@zjfcool/graph-vis"></script>
<!-- jsDelivr -->
<!-- <script src="https://cdn.jsdelivr.net/npm/@zjfcool/graph-vis"></script> -->

<script>
  const { GraphVis } = Graph;

  async function init() {
    const graph = new GraphVis({
      container: "#container",
      data, // Default: { edges: [], nodes: [] }
      width: container.clientWidth,
      height: container.clientHeight,
    });
    await graph.init();
  }

  init();
</script>
```

## Notes

- `container` accepts a selector string (e.g., `'#container'`) or a DOM element.
- `data` is the raw graph data, containing two arrays, `nodes` and `edges`, both empty by default.
- `width` / `height` are usually taken from the actual dimensions of the container.
- Initialization is asynchronous, so you need to `await graph.init()` to wait for completion.
