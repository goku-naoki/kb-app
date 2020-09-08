document.addEventListener("turbolinks:load",()=>{

  let imageInputs=Array.from(document.getElementsByClassName('image-field'));
  let imageLength=0;
  let imageLabel=document.getElementById('image-label')
  
    function triggerInput(){
      
        imageInputs=Array.from(document.getElementsByClassName('image-field'));
                                                                                                // if(imageInputs.length<=3){
                                                                                                //ここでは特にchangeイベントの条件分岐しない。 下でラヴェルを剥がす事でchangeすら起こさない
          imageInputs.forEach((input)=>{
            input.addEventListener('change',(event)=>{
              const index=Number(event.target.getAttribute('data-index'))
              const file=event.target.files[0]
              const imageSrc=URL.createObjectURL(file)
              preview(imageSrc,index)
            })
          })
      } 

      function deleteItem(){
    
        window.addEventListener('click',(event)=>{
          if(event.srcElement.classList.contains("image-delete")){
            const index=Number(event.target.parentNode.parentNode.getAttribute('data-index'))
            const deleteTarget=document.getElementById(`image-${index}-input`)

              event.target.parentNode.parentNode.remove()                                           //preview削除
              deleteTarget.remove()                                                                  //input削除
              imageInputs=Array.from(document.getElementsByClassName('image-field'));
              const lastIndex=imageInputs[Number(imageInputs.length)-1].getAttribute('data-index')   //inputの一番最後のindexをとる
              imageLabel.setAttribute('for',`image-${lastIndex}-input`)                              //iconのlabelに渡す  三つ超えているとlabel空だっけ
              triggerInput()                                                                        // 削除の後に発生するアクションは削除もしくはinput変更
          }
        })
      }
    
      const createImage=(src,index)=>{ //imageの箱
        const imageBox=`
          <div class="create-item-form-image-preview-box" data-index="${index}">
            <div class="image-box">
              <img id="image-${index}" src="${src}">
            </div>
            <div class="create-item-form-image-preview-box-option">
              <label for="image-${index}-input">
                <p class="image-edit">edit</p>
              </label>
              <p class="image-delete">delete</p>
            </div>
          </div>
        `
          return imageBox
      }

      const createInput=(index)=>{  //input要素
        const imageInput=`
          <input name="item[images][]" data-index="${index}" class="image-field" type="file" id="image-${index}-input" style="display:none;" >
        `
        return imageInput
        }

      const preview=(imageSrc,index)=>{

        const imagePreview=document.getElementById(`image-${index}`)
          if(imagePreview != null){                                             //previewに画像があれば差し替える
            imagePreview.setAttribute('src',imageSrc)
          }
          else{ 
                                                                               //既存のイメージがなかったら、下でimageとinput作成
              const imageBox=createImage(imageSrc,index);
              const previewBox=document.getElementById('image-preview')
              const nextIndex=index + 1

              previewBox.insertAdjacentHTML('beforeend', imageBox);         
              imageLabel.setAttribute('for',`image-${nextIndex}-input`)         //次のinputに対応したlabelを貼る

              imageLength=Array.from(document.getElementsByClassName('create-item-form-image-preview-box')).length;
              
              if(imageLength==3){                                               //previewに３枚あったらimageiconを剥がす
                imageLabel.removeAttribute('for')
              }
                                                                                //３枚以上ならlabelが反応しないから好きなだけinputは足していい
                const imageInput=createInput(nextIndex)
                const inputBox=document.getElementById('input-box')
                inputBox.insertAdjacentHTML('beforeend', imageInput);
            }
        
        triggerInput()  //以前までは一個上のif文内にあった
    }

    triggerInput()
    deleteItem()
 
})