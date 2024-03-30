export function createProperties(rowObject, clxnId) {
    const properties = [];
  
    const propKeys = Object.keys(rowObject)
      .filter((k) => k.startsWith('PROPERTY-'))
      .sort();
  
    const valueKeys = Object.keys(rowObject)
      .filter((k) => k.startsWith('VALUE-'))
      .sort();
  
    propKeys.forEach((el, idx) => {
      const propValue = rowObject[valueKeys[idx]].toString().toLowerCase();
      const property = {
        name: rowObject[el],
        value: propValue,
        clxn: clxnId,
      };
      properties.push(property);
    });
    return properties;
  }
  
  export function createPhotoArray(rowObject) {
    const photoArray = [];
  
    const picKeys = Object.keys(rowObject).filter((key) =>
      key.startsWith('PHOTO')
    );
  
    picKeys.forEach((el) => {
      if (rowObject[el]) {
        photoArray.push(rowObject[el].toString());
      }
    });
  
    return photoArray;
  }
  