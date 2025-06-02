const isEmpty = (value) =>
    value === undefined || // Value is undefined
    value === null || //value is null
    (typeof value === "object" && Object.keys(value).length === 0) ||
    //Check if the object keys is zero which means empty
    (typeof value === "string" && value.trim().length === 0); // Check if the value is string and no value to it
  export default isEmpty;
  