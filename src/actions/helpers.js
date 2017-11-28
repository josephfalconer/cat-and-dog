export function writeTransform(x = 0, y = 0, rotate = false) {
    x = x > 0 ? x / 16 : 0;
    y = y > 0 ? y / 16 : 0;

    const rotateTransform = rotate ? ` rotate(${rotate}deg)` : '';
    const transform = `translate(${x}rem, ${y}rem)${rotateTransform}`

    return {
        WebkitTransform: transform,
        MozTransform: transform,
        msTransform: transform,
        OTransform: transform,
        transform: transform,
    }
}

export function removeOccupant(spaces, occupant) {
    for (let x = 0; x < spaces.length; x++) {
        for (let y = 0; y < spaces[y].length; y++) {
            if (spaces[x][y].occupant === occupant)
                // also removes food when human/robot leaves a space
                spaces[x][y].occupant = false;
        }
    }
    return spaces;
}
