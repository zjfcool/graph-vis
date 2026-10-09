function generateData(count = 100, width = 1000, height = 1000) {
  const nodes: any[] = [];
  const edges: any[] = [];
  for (let i = 0; i < count; i++) {
    let obj = {
      label: `a${i}`,
      id: `${i}`,
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      group: i % 10,
    };
    nodes.push(obj);
  }
  for (let i = 0; i < count; i++) {
    const source = `${Math.floor(Math.sqrt(i % count))}`;
    const target = `${i % count}`;
    let obj = {
      source,
      target,
      label: `${source}->${target}`,
    };
    edges.push(obj);
  }
  return {
    nodes,
    edges,
  };
}
export { generateData };
