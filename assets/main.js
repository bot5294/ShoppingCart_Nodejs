
function cartLoad(){
    if(localStorage.getItem('ccount')!= null){
        document.getElementById('cart-counter').innerHTML=localStorage.getItem('ccount');
    }
}
function add2cart(name){
    if (localStorage.getItem('ccount') ===  null) {
        localStorage.setItem('ccount',0);
        // console.log('i am here')
      }

    if(localStorage.getItem(name) === null){
        localStorage.setItem(name,1);
        
    }else{
        localStorage.setItem(name,parseInt(localStorage.getItem(name))+1)
    }
    localStorage.setItem('ccount',parseInt(localStorage.getItem('ccount'))+1);
      
    let counter = document.getElementById('cart-counter');
    counter.innerHTML=localStorage.getItem('ccount');
    window.alert("Product successfully added to the cart");
}

function getCartItems(){
    let tbl = document.getElementById('cart-table');
    let keys = Object.keys(localStorage);
        for(let i of keys) {
            
            if(i=='ccount'){
                continue;
            }
            console.log(i);
        // cartItem = localStorage.key(i);
        // console.log(cartItem)
        const node = document.createElement("li");
        let str = i+" * "+localStorage.getItem(i);
        const text = document.createTextNode(str);
        node.appendChild(text);
        tbl.appendChild(node);
    };
}