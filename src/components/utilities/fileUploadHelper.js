export const processBase64Format=(input)=> {
    const dataPart = input.split(":")[1];
    const mimeType = dataPart.split(";")[0];
    const base64Data = dataPart.split(",")[1];
    const mimeTypeWithoutPrefix = mimeType.split("/")[1];
    const output = mimeTypeWithoutPrefix + ";" + base64Data;
    return output;
}
