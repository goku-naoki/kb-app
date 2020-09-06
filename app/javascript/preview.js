document.addEventListener('DOMContentLoaded',()=>{

  // const imageInputs=document.getElementBy('item_images')
  let imageInputs=[];
  let imageLength=0;
  let editBtns=[]
  const preview=()=>{
    imageInputs=Array.from(document.getElementsByClassName('image-field'));
    imageLength=Array.from(document.getElementsByClassName('create-item-form-image-preview-box')).length;
    editBtns=Array.from(document.getElementsByClassName('image-edit'))
   
  
    
    const createImage=(src,index)=>{
        const imageBox=`
          <div class="create-item-form-image-preview-box" id="preview-${index}-box" data-index="${index}">
            <div class="image-box">
              <img id="image-${index}" src="${src}">
            </div>
          <p class="image-edit">edit</p>
          </div>
        `
          return imageBox
      }
      
      const createInput=(index)=>{
        const imageInput=`
        <input name="item[images][]" data-index="${index}" class="image-field" type="file" id="image-${index}-input" >
        `
        return imageInput
      }

      

    // if(editBtns !=null){
    //   editBtns.forEach((edit)=>{
    //    edit.addEventListener('click',(event)=>{
    //      const target =event.target.parentNode.getAttribute('data-index')
    //      const newtarget=document.getElementById(`image-${target}-input`)
    //      console.log(newtarget)
    //       newtarget.click()
    //          })
    //      })
    
    //  }

     const icon=document.getElementById('image-icon')
        icon.addEventListener('click',()=>{
          const target =imageInputs[imageInputs.length-1]
          const targetIndex=Number(target.getAttribute('data-index'))
          const newtarget=document.getElementById(`image-${targetIndex}-input`)
          console.log(target)
          if(imageLength!=3){
            newtarget.click()
            }
        })
    
    
    imageInputs.forEach((imageInput)=>{

        
        imageInput.addEventListener('change',(event)=>{
      
          const index=Number(event.target.getAttribute('data-index'))
          const file=event.target.files[0]
          const imageSrc=URL.createObjectURL(file)
          const editItem=document.getElementById(`image-${index}`)
         
          // if(editItem!=null){
          //   console.log(editItem)
          //   editItem.setAttribute('src',imageSrc)
          // }else{
          const imageBox=createImage(imageSrc,index);
          const previewBox=document.getElementById('image-preview')
          previewBox.insertAdjacentHTML('beforeend', imageBox);
            if(imageLength<2){  //ここでif文かけるといい感じ。上だと３枚目が出ない。
              console.log(imageLength)
              const nextIndex=index + 1
              const imageInput=createInput(nextIndex)
              const inputBox=document.getElementById('input-box')
              inputBox.insertAdjacentHTML('beforeend', imageInput);
              
            }//むやみにretur false書けるとpreviewが読み込まれずうまく動かない
            
          // }
          preview()
        })
    })
  
  }

 

 preview()

  
})