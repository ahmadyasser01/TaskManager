export const success = (data) =>{
    return {
        status:"Success",
        data,
    }

}

export const fail = (message) =>{
    return {
        status :"Fail",
        message
    }
}

export const  filterObj = (obj, ...allowedFields) => {
    const newObj = {} 

    Object.keys(obj).forEach(el => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
  };

export const checkEmptyObject = (obj) =>{
    return  obj && Object.keys(obj).length === 0 

};