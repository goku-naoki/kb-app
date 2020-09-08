document.addEventListener("turbolinks:load",()=>{
  const deleteCartBtns=Array.from(document.getElementsByClassName("cart-box-left-list-detail-right-delete"));
  console.log(deleteCartBtns)
    deleteCartBtns.forEach((deleteBtn)=>{
      deleteBtn.addEventListener('click',(event)=>{
        const XHR =new XMLHttpRequest();
        const token = document.getElementsByName('csrf-token')[0].content;
        const item_id=Number(event.target.getAttribute('data-delete-id'))
        console.log(token)
          const fd = new FormData();
          fd.append('item_id',item_id);
          fd.append('_method','DELETE');     //postでもこの記述でdeleteになる！！！！
          XHR.open("POST", `/delete_item`, true);
          XHR.setRequestHeader('X-CSRF-Token', token); 
          XHR.responseType = "json";
          XHR.send(fd);
          XHR.onload = () => {
          console.log(XHR.status)
            if(XHR.status == 200){
              event.target.parentNode.parentNode.remove();
          
            }else{
              alert('失敗')
            }
          }
      })
    })

 
})