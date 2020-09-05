document.addEventListener('DOMContentLoaded',()=>{

  // const imageInputs=document.getElementBy('item_images')
  
  const preview=()=>{
    const imageInputs=Array.from(document.getElementsByClassName('image-field'));
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
      <input name="item[images][]" data-index="${index}" class="image-field" type="file" id="item_images">
      `
      return imageInput
    }
    imageInputs.forEach((imageInput)=>{
      imageInput.addEventListener('change',(event)=>{

        // const imageLength=Array.from(document.getElementsByClassName("create-item-form-image-preview-box")).length
        // console.log(imageLength)
       

        const index=Number(event.target.getAttribute('data-index'))
        console.log(index)
        const file=event.target.files[0]
        const imageSrc=URL.createObjectURL(file)
        const imageBox=createImage(imageSrc);
        const previewBox=document.getElementById('image-preview')
        previewBox.insertAdjacentHTML('beforeend', imageBox);
        if(imageInputs.length<3){
        const nextIndex=index + 1
        const imageInput=createInput(nextIndex)
        const inputBox=document.getElementById('input-box')
        inputBox.insertAdjacentHTML('beforeend', imageInput);
        preview()
        }else{
          return false
        }
      })
    })
  }

  preview()
})