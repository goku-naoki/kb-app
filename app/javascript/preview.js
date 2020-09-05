document.addEventListener('DOMContentLoaded',()=>{

  // const imageInputs=document.getElementBy('item_images')
  let imageInputs=[];
  const preview=()=>{
    imageInputs=Array.from(document.getElementsByClassName('image-field'));
    const imageLength=Array.from(document.getElementsByClassName('create-item-form-image-preview-box')).length
    console.log(imageInputs)
  
    const createImage=(src)=>{
      const imageBox=`
        <div class="create-item-form-image-preview-box">
          <img src="${src}">
        </div>
      `
        return imageBox
    }
    const createInput=(index)=>{
      const imageInput=`
      <input name="item[images][]" data-index="${index}" class="image-field" type="file" id="image-${index}-input" style="display:none;">
      `
      return imageInput
    }

    

    
    
    imageInputs.forEach((imageInput)=>{

      const icon=document.getElementById('image-icon')
      icon.addEventListener('click',()=>{
      const target =imageInputs[imageInputs.length-1]
      console.log('hoge')
      const targetIndex=Number(target.getAttribute('data-index'))
      const newtarget=document.getElementById(`image-${targetIndex}-input`)
      console.log(imageLength)
      if(newtarget==imageInput && imageLength!=3){
        imageInput.click()
        }
       })

       
      imageInput.addEventListener('change',(event)=>{
        // if(imageInputs.length<4){ 
       
        console.log(imageLength)
        if(imageLength<3){
        const index=Number(event.target.getAttribute('data-index'))
        console.log(index)
        const file=event.target.files[0]
        const imageSrc=URL.createObjectURL(file)
        const imageBox=createImage(imageSrc);
        const previewBox=document.getElementById('image-preview')
        previewBox.insertAdjacentHTML('beforeend', imageBox);
          if(imageLength<2){  //ここでif文かけるといい感じ。上だと３枚目が出ない。
          const nextIndex=index + 1
          const imageInput=createInput(nextIndex)
          const inputBox=document.getElementById('input-box')
          inputBox.insertAdjacentHTML('beforeend', imageInput);
          preview()
          }else{
            return false
          }
        }
        // }
      })
    })
  }

 

  preview()

  
})