import nanoid from 'nanoid';

const utils = {
  deepCopy: (inObject) => {
    let outObject, value, key;

    if (typeof inObject !== 'object' || inObject === null) {
      return inObject; // Return the value if inObject is not an object
    }

    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {};

    for (key in inObject) {
      value = inObject[key];

      // Recursively (deep) copy for nested objects, including arrays
      outObject[key] = utils.deepCopy(value);
    }

    return outObject;
  },

  copyToClipboard: (node_id) => {
    const targetNode = document.getElementById(node_id);
    const selection = window.getSelection();

    const range = document.createRange();
    range.selectNode(targetNode);

    selection.removeAllRanges();
    selection.addRange(range);

    try {
      document.execCommand('copy'); // returns true or false depending on success
      window.getSelection().removeAllRanges();
    } catch (err) {
      console.log('Ran into an issue copying to clipboard');
    }
  },

  uuid: () => {
    return nanoid();
  },
};

export default utils;
