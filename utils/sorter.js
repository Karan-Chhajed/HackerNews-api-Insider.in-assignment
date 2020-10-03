//Custom sort to sort by the data of a key

sortByProperty = (property) =>{  
    return ((a,b) =>{  
       
       if(a[property] < b[property])  
          return 1;  
       else if(a[property] > b[property])  
          return -1;
       return 0;
    }  )
 }


 //Custom sort to sort by the length of the property(probably array)
 sortByPropertyLength = (property) =>{  
   return ((a,b) =>{  
      if(a[property] === "No Comments" || a[property] === undefined)
         return 1;
      else if(b[property]=== "No Comments" || b[property]=== undefined)
         return -1;
      else if(a[property].length < b[property].length )  
         return 1;  
      else if(a[property].length > b[property].length)  
         return -1;
      else (a[property].length == b[property].length )
         return 0;
   }  )
}

 module.exports = {
    sortIt: sortByProperty,
    sortItByLength: sortByPropertyLength
 }

 