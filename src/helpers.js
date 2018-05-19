export function writeTransform(x = 0, y = 0) {
  const calculatedX = x > 0 ? x / 16 : 0;
  const calculatedY = y > 0 ? y / 16 : 0;
  const transform = `translate(${calculatedX}rem, ${calculatedY}rem)`;
  return {
    WebkitTransform: transform,
    MozTransform: transform,
    msTransform: transform,
    OTransform: transform,
    transform: transform,
  }
}
