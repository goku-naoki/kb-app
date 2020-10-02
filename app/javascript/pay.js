window.addEventListener("turbolinks:load", () => {

  
    const PAYJP_PK = process.env.PAYJP_PK
    const loader=document.getElementById('overlay')
    Payjp.setPublicKey("pk_test_a31854acc844849a07138662");
    const form = document.getElementById("pay-form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      loader.classList.add('fadein-bg')

      const sendWithoutCardInfo = (card_token) => {
        document.getElementById("number").removeAttribute("name");
        document.getElementById("cvc").removeAttribute("name");
        document.getElementById("exp_month").removeAttribute("name");
        document.getElementById("exp_year").removeAttribute("name");

        const XHR =new XMLHttpRequest();
        const token = document.getElementsByName('csrf-token')[0].content;
      
        const fd = new FormData();
        fd.append('token',card_token);
     
        XHR.open("POST", `/order_pay`, true);
        XHR.setRequestHeader('X-CSRF-Token', token);  
        XHR.responseType = "json";
        XHR.send(fd);
        XHR.onload = () => {
        console.log(XHR.status)
          if(XHR.status == 200){
            setTimeout(function(){
              const modal=document.getElementById('modal-wrapper')
              loader.classList.remove('fadein-bg')
              modal.setAttribute('style','display:block;')
              document.getElementById("pay-form").reset();
            },1000)
          }else{
            loader.classList.remove('fadein-bg')
            alert('失敗')
          }
        }
      }
    
      const formData = new FormData(form);

    
      const card = {
        number: formData.get("number"),
        cvc: formData.get("cvc"),
        exp_month: formData.get("exp_month"),
        exp_year: `20${formData.get("exp_year")}`,
      };
      console.log(card)

      Payjp.createToken(card, (status, response) => {
        console.log(status)
        console.log(response)
        if (status === 200) {
      
          const card_token = response.id;
          sendWithoutCardInfo(card_token)
        } else {
          loader.classList.remove('fadein-bg')
          alert('カードの値が不正です')
          
          const btn=Array.from(document.getElementsByClassName('pay-btn'))[0]
          btn.disabled=false;
        }
      });
    });
  // }
});