window.addEventListener("turbolinks:load", () => {
  const loader=document.getElementById('overlay')
  const deleteItemBtn=document.getElementById('item-delete')
  console.log(deleteItemBtn)
  deleteItemBtn.addEventListener('click',()=>{
    loader.classList.add('fadein-bg')
    const XHR =new XMLHttpRequest();
    const token = document.getElementsByName('csrf-token')[0].content;
    const item_id=deleteItemBtn.getAttribute('data-item-id')
    const fd = new FormData();
    // fd.append('item_id',item_id);
    fd.append('_method','DELETE'); 
    XHR.open("POST", `/items/${item_id}`, true);
    XHR.setRequestHeader('X-CSRF-Token', token);   //koko!!!  application.contorollerで許可するとsessionだめ
    // XHR.responseType = "json";
    XHR.send(fd);
    XHR.onload = () => {
    console.log(XHR.status)
      if(XHR.status == 200){
        setTimeout(function(){
          loader.classList.remove('fadein-bg')
          location.href='/'
        },1000)
      }else{
        alert('失敗')
        loader.classList.remove('fadein-bg')
      }


    }
  })
});

