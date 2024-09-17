let totalItems = document.querySelector('#totalilItems');
let finalPrice = document.querySelector('#finalPrice');
let catagory = document.querySelector('#catagory');

const products = {
  
  "Bomb" : {"Andi Tufaan":300,"Marshal":250,"Commando":80},
  
  "Chakri" : {"Standard Chakri":300,"Red-Green":250,"Mercury":140},
   
  "Anaar" : {"Standard Anaar":300,"Mercury Anaar":250,"BigPot Anaar":80}

}

const confirm= document.querySelector('#confirm')
const second = document.querySelector('#second')

catagory.addEventListener("click",function(e){
//  console.log("clicked")
//  console.log(e.target.innerText)
    second.innerHTML="";
    Object.entries(products[e.target.innerText]).map((key)=> {
    //console.log(key[0])
    const newli = document.createElement('li');
    newli.innerText =  key[0];
    newli.value= key[1]
   //console.log(newli.value)
    newli.classList.add('dropdown-item')
    second.appendChild(newli)  
 })

});
let totalPrice;
let perItemPrice;
let selectedItem;
const quantity = document.querySelector('#quantity')
second.addEventListener('click',function(e){
   selectedItem = e.target.innerText
   perItemPrice = e.target.value;
   confirm.classList.remove('disabled')
   confirm.classList.add('btn-secondary')
   //confirm.classList.add('border-success-subtle')
   
});

const summary= document.querySelector("#summary")
let overallPrice=0;
confirm.addEventListener("click",function(){
      totalPrice = perItemPrice * quantity.value
      let newli = document.createElement("li")
       newli.id="createdli";
       newli.value= totalPrice;
     
      let newspan = document.createElement("span")
      let deletespan = document.createElement('span')
      deletespan.innerText = " X "
      deletespan.id="delete"
      deletespan.classList.add("text-danger")
      deletespan.classList.add("px-3")
      newli.classList.add("list-group-item")
     newli.classList.add("list-group-item-dark")
     newli.classList.add("d-flex")
     newli.classList.add("justify-content-between")
     newli.classList.add("count")
     newspan.innerText =` ${totalPrice}`
     newspan.classList.add("text-success")
      newli.innerText = ` ${selectedItem}(${perItemPrice}) * ${quantity.value}Ps  = `
      newli.appendChild(newspan)
      quantity.value =1;
      newli.appendChild(deletespan)
      summary.appendChild(newli)
      count()
      calc(0)
      confirm.classList.add("disabled")
      slecetedItem="";
      
      
    })
const countItems = document.querySelector('#totalItems')    
function count(){
  let countt = document.querySelectorAll('.count').length
 // console.log(countt)
  countItems.innerText = countt
  
} 
    
    
    //listening to delete the list added dynamically
summary.addEventListener("click",function(e){
  //console.log("the target is ",e.target)
  if (e.target.id == "delete"){
    //console.log("found to delete");
     let n = e.target.parentNode.getAttribute('id');
    // console.log("id is",n)
     e.target.parentNode.parentNode.removeChild(e.target.parentNode);
     let priceToDelete = e.target.parentNode.value;
     count()
     calc(priceToDelete);
     //orders();
  }
  //e.target.remove();
  //let priceToDelete = e.target.value;
  //calc(priceToDelete);
  //orders();
  
  
})   

//calculating Final Price 
function calc(e) {
     // console.log("its" ,e)
      overallPrice = overallPrice - e + totalPrice;
      finalPrice.innerText= overallPrice
      perItemPrice = 0;
      totalPrice=0;
      //orders()
      discount(overallPrice)
      }
const disc = document.querySelector("#disc");
const showbefore = document.querySelector("#beforeDiscount");   
  function discount(e){
    //console.log("rrr",e)
    let extraAmount = e-500
    showbefore.innerText = e
    //console.log("no disc")
    if (extraAmount >= 0){
      let tocut = e / 10
      disc.innerText = `- ₹${tocut} OFF`
     //console.log(tocut)
    // e = e - tocut;
    let priceafterdiscount = e - tocut;
    //console.log(priceafterdiscount)
    // console.log("final",priceafterdiscount)
    finalPrice.innerText = priceafterdiscount;
  
    }
    else{
      disc.innerText = "0"
      //console.log("no")
    }
  }
  
      
      //discount show to users
/* function orders() {
  if(overallPrice >= 500){
    greater.innerText = "10% OFF Applied"
    // greater.classList.remove("bg-secondary-subtle")
    greater.classList.add("bg-success")
    greater.classList.add("px-2")
  }
  else{
    greater.innerText = ""
    // greater.classList.remove("bg-secondary-subtle")
    greater.classList.remove("bg-success")
    //greater.classList.remove("px-2")
  }
  
  }*/
  

const greater= document.querySelector('#greater')

const addhistory = document.querySelector('#history')
addhistory.addEventListener("click",()=>{
  addhistory.innerText="done"
  addhistory.classList.add("disabled")
  alert("Added successfully!");
  let tprice = document.createElement('h3')
  tprice = finalPrice.innerText;
  console.log("ttttt",tprice)
  setTimeout(()=>{
    addhistory.innerText ="Add History";
    addhistory.classList.remove("disabled")
  },1000)
  
  let collect = finalPrice.innerText;
  let  newValue = Number(collect)
  let prevcollect = JSON.parse(localStorage.getItem('collection'))|| [];
  
  // Example new value, replace with dynamic input if needed

  // If there are existing numbers, add them
  if (prevcollect.length > 0 && typeof prevcollect[0] === 'number') {
    prevcollect = prevcollect.map(num => num + newValue);
  } else {
    // Add the new value if the previous data does not exist or is not a number
    prevcollect.push(newValue);
  }
 localStorage.setItem('collection', JSON.stringify(prevcollect));
 
  
  
 let details = summary.innerText;
  
  let data = `${tprice} zzz ${details}`;
  console.log(data)
  let previous = JSON.parse(localStorage.getItem('getdata')) ||[];
  previous = previous.concat(data)
  localStorage.setItem('getdata',JSON.stringify(previous))
  //console.log(date)
  //console.log(summary.innerText)
  
// window.location.reload();
})
