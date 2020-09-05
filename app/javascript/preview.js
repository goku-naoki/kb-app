document.addEventListener('DOMContentLoaded',()=>{

  const imageInput=document.getElementById('item_image')
  const createImage=(src)=>{
    const imageBox=`
      <div class="create-item-form-image-preview-box">
        <img src="${src}">
      </div>
    `
      return imageBox
  }

  imageInput.addEventListener('change',(event)=>{
    const file=event.target.files[0]
    const imageSrc=URL.createObjectURL(file)
    const imageBox=createImage(imageSrc);
    const previewBox=document.getElementById('image-preview')
    previewBox.insertAdjacentHTML('beforeend', imageBox);
  })
  
})