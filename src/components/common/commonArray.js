export const compareIdAndReturnObject = (list, id) => {
    if (id !== null && id !== undefined && id !== "") {
      let index = list && list?.findIndex(element => element?.code == id);
      return list !==undefined && list[index]
    }
  }
  
  export const compareTextAndReturnObject = (list, text) => {
    if (text !== null && text !== undefined && text !== "") {
      let index = list && list?.findIndex(element => element?.value == text);
      return list!==undefined && list[index]
    }
  }
  