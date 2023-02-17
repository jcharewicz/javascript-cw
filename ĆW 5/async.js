const asyncAdd = async (a,b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
      return Promise.reject('Arguments should have a Number type!')
    }

    return new Promise((resolve, reject) => {
      setTimeout(() =>{
        resolve(a+b)
      }, 100)
    })

  }

  const addNumbersInArray = async (arr)=>{
  performance.mark('start');

  if(!Array.isArray(arr)){
      return console.log('Arguments should be passed in the form of an array!')
  }

  else{
      while(arr.length > 1){
        console.count('count');
              let newArray = [];

              for (let i = 0; i < arr.length; i = i+2) {
                  const firstElement = arr[i];
                  const secondElement = arr[i+1];

                  if(secondElement == null){
                      newArray.push(firstElement);
                  }

                  else{
                  let sum = await asyncAdd(firstElement,secondElement)
                  console.log(firstElement,secondElement);
                  newArray.push(sum);
                  }
              }
              arr = newArray;
          }
      }

      performance.mark('end');
      console.log(performance.measure('time','start','end'));
      return arr[0];
  }
  
  let array= [1,1,3,4,5,6,7,8,10,23,12,14,15,21,54,32,85,56];
  let sum = await addNumbersInArray(array);
  console.log(sum);