// Shuffle implementation based on Fisher-Yates Modern Shuffle algorithm.
export const shuffle = (array) => {
    var index = array.length;
    while (--index >= 1) {
        var swapIndex = Math.floor(Math.random() * (index + 1));
        var swapWith = array[swapIndex];
        array[swapIndex] = array[index];
        array[index] = swapWith;
    }
    return array;
}