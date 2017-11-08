export function writeTransform(x = 0, y = 0) {
    x = x > 0 ? x / 16 : 0;
    y = y > 0 ? y / 16 : 0;

    return {
        WebkitTansform: `translate(${x}rem, ${y}rem)`,
        MozTransform: `translate(${x}rem, ${y}rem)`,
        msTransform: `translate(${x}rem, ${y}rem)`,
        OTransform: `translate(${x}rem, ${y}rem)`,
        transform: `translate(${x}rem, ${y}rem)`,
    }
}

export function checkMove(x, y, spaces) {
    let nextSpace = false;

    // next space is limited by dimensions
    if (x < 0 || y < 0 || x > spaces.length - 1 || y > spaces[0].length - 1)
        return false;

    nextSpace = spaces[x][y];

    if (nextSpace.occupant) 
        return false;
    
    return true;
}

export function cleanSpaces(spaces, occupant) {
    for (let x = 0; x < spaces.length; x++) {
        for (let y = 0; y < spaces[x].length; y++) {
            if (spaces[x][y].occupant === occupant) {
                spaces[x][y].occupant = false;
            }
        }
    }

    return spaces;
}
