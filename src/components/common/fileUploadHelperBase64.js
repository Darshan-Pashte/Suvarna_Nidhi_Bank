export const processBase64FormatBase64=(input)=> {
    // console.log("input",input)
    const dataPart = input.split(":")[1];
    const base64Data = dataPart.split(",")[1];
    const output = base64Data;
    // console.log("output",output)
  
    return output;
}
  

  