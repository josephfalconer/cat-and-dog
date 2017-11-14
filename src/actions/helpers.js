export function writeTransform(x = 0, y = 0) {
    x = x > 0 ? x / 16 : 0;
    y = y > 0 ? y / 16 : 0;

    return {
        WebkitTransform: `translate(${x}rem, ${y}rem)`,
        MozTransform: `translate(${x}rem, ${y}rem)`,
        msTransform: `translate(${x}rem, ${y}rem)`,
        OTransform: `translate(${x}rem, ${y}rem)`,
        transform: `translate(${x}rem, ${y}rem)`,
    }
}

export function removeOccupant(spaces, occupant) {
    for (let x = 0; x < spaces.length; x++) {
        for (let y = 0; y < spaces[y].length; y++) {
            if (spaces[x][y].occupant === occupant)
                // also removes food when cat/dog leaves a space
                spaces[x][y].occupant = false;
        }
    }
    return spaces;
}
