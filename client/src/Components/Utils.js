export const validateRequiredInputs = (formData) => { 
    let isNotEmptyOrNull = true
   
    formData.forEach(data => { 
          for (let key in data) {
              if (data[key] == null || data[key].trim() === '') {
                  isNotEmptyOrNull = false
              } 
          }
     });
  
    return isNotEmptyOrNull 
  }