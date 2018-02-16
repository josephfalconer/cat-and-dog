export function writeTransform(x = 0, y = 0) {
    x = x > 0 ? x / 16 : 0;
    y = y > 0 ? y / 16 : 0;

    const transform = `translate(${x}rem, ${y}rem)`;

    return {
        WebkitTransform: transform,
        MozTransform: transform,
        msTransform: transform,
        OTransform: transform,
        transform: transform,
    }
}
