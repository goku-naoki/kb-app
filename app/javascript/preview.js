document.addEventListener('DOMContentLoaded',()=>{

  let imageInputs=Array.from(document.getElementsByClassName('image-field'));
  let deleteBtns=Array.from(document.getElementsByClassName('image-delete'));
  let imageLength=0;
  let editBtns=[]
  const icon=document.getElementById('image-icon')
  
  
    function triggerInput(){
        imageInputs=Array.from(document.getElementsByClassName('image-field'));
        imageLength=Array.from(document.getElementsByClassName('create-item-form-image-preview-box')).length;
        if(imageLength!=3){
          imageInputs.forEach((input)=>{
            input.addEventListener('change',(event)=>{
              const index=Number(event.target.getAttribute('data-index'))
              const file=event.target.files[0]
              const imageSrc=URL.createObjectURL(file)
              preview(imageSrc,index)
            })
          })
        }
      } 

      function deleteItem(){
        deleteBtns=Array.from(document.getElementsByClassName('image-delete'));
        deleteBtns.forEach((deleteBtn)=>{
          deleteBtn.addEventListener('click',(event)=>{
            const index=Number(event.target.parentNode.parentNode.getAttribute('data-index'))
            console.log(index)
            event.target.parentNode.parentNode.remove()
            const deleteTarget=document.getElementById(`image-${index}-input`)
            console.log(deleteTarget)
            deleteTarget.remove()
          })
        })


      }
    
      const createImage=(src,index)=>{ //imageの箱
        const imageBox=`
          <div class="create-item-form-image-preview-box" id="preview-${index}-box" data-index="${index}">
            <div class="image-box">
              <img id="image-${index}" src="${src}">
            </div>
            <div class="create-item-form-image-preview-option">
              <label for="image-${index}-input">
                <p class="image-edit">edit</p>
              </label>
              <p class="image-delete">削除</p>
            </div>
          </div>
        `
          return imageBox
      }

      const createInput=(index)=>{  //input要素
        const imageInput=`
          <input name="item[images][]" data-index="${index}" class="image-field" type="file" id="image-${index}-input" >
        `
        return imageInput
        }

      const preview=(imageSrc,index)=>{

        const imagePreview=document.getElementById(`image-${index}`)
        if(imagePreview != null){
          imagePreview.setAttribute('src',imageSrc)
        }
        else{//既存のイメージがなかったら、下でimageとinput作成
            const imageBox=createImage(imageSrc,index);
            const previewBox=document.getElementById('image-preview')
            previewBox.insertAdjacentHTML('beforeend', imageBox);
            const nextIndex=index + 1
            const imageLabel=document.getElementById('image-label')
            imageLabel.setAttribute('for',`image-${nextIndex}-input`)
              if(imageLength<2){  //ここでif文かけるといい感じ。上だと３枚目が出ない。
                console.log(imageLength)
            
                const imageInput=createInput(nextIndex)
                const inputBox=document.getElementById('input-box')
                inputBox.insertAdjacentHTML('beforeend', imageInput);
                
              }      
          }
        deleteItem()
        triggerInput()  //以前までは一個上のif文内にあった
    }
    //全ての始まりはここ

    triggerInput()
 
})