document.addEventListener('DOMContentLoaded',()=>{

  // const imageInputs=document.getElementBy('item_images')
  let imageInputs=Array.from(document.getElementsByClassName('image-field'));
  let imageLength=0;
  let editBtns=[]
  const icon=document.getElementById('image-icon')
  let newtarget=""
  


  function iconClick(){
    icon.addEventListener('click',()=>{
      //この二つをさらに読みこます
      imageInputs=Array.from(document.getElementsByClassName('image-field'));
      imageLength=Array.from(document.getElementsByClassName('create-item-form-image-preview-box')).length;
      let target =imageInputs[imageInputs.length-1]
      // const targetIndex=Number(target.getAttribute('data-index'))
      let targetIndex=Number(target.getAttribute('data-index'))
      newtarget=document.getElementById(`image-${targetIndex}-input`)
      console.log(target)
      if(imageLength!=3){
        newtarget.click()
        }
      // event.currentTarget.removeEventListener(event.type, clickEvent);
    },{
      once: true  //イベント発火回数を制限しないと下のクリックと二回怒る
    })
  }



  const preview=(imageSrc,index)=>{
    // imageInputs=Array.from(document.getElementsByClassName('image-field'));
    // imageLength=Array.from(document.getElementsByClassName('create-item-form-image-preview-box')).length;
    //clickイベントで更新されるから必要ない上

    // editBtns=Array.from(document.getElementsByClassName('image-edit'))
   
    const imagePreview=document.getElementById(`image-${index}`)
    if(imagePreview != null){
      imagePreview.setAttribute('src',imageSrc)
    }else{
  
    
    const createImage=(src,index)=>{
        const imageBox=`
          <div class="create-item-form-image-preview-box" id="preview-${index}-box" data-index="${index}">
            <div class="image-box">
              <img id="image-${index}" src="${src}">
            </div>
          <p class="image-edit" id="image-${index}-edit">edit</p>
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

     
          icon.addEventListener('click',()=>{
              //この二つをさらに読みこます
              imageInputs=Array.from(document.getElementsByClassName('image-field'));
              imageLength=Array.from(document.getElementsByClassName('create-item-form-image-preview-box')).length;
              let target =imageInputs[imageInputs.length-1]
              // const targetIndex=Number(target.getAttribute('data-index'))
              let targetIndex=Number(target.getAttribute('data-index'))
              newtarget=document.getElementById(`image-${targetIndex}-input`)
              console.log(target)
              if(imageLength!=3){
                newtarget.click()
                const nextTarget=document.getElementById(`image-${index + 1}-input`)
       
        nextTarget.addEventListener('change',(event)=>{
          console.log(nextTarget)
          index=Number(event.target.getAttribute('data-index'))
          const file=event.target.files[0]
          imageSrc=URL.createObjectURL(file)
          const editItem=document.getElementById(`image-${index}`)
          preview(imageSrc,index)     
        }) 
                }
              
            },{
              once: true  //イベント発火回数を制限しないと下のクリックと二回怒る
            })
      }
  }

   
 
  iconClick()
  
  const firstTarget=document.getElementById("image-0-input")
  firstTarget.addEventListener('change',(event)=>{
    const file=event.target.files[0]
    const imageSrc=URL.createObjectURL(file)
    const index=Number(event.target.getAttribute('data-index'))
    console.log('change!!')
    preview(imageSrc,index);
  },{
    once: true  //イベント発火回数を制限しないと下のクリックと二回怒る
  })

  window.addEventListener('click',(event)=>{
    if(event.srcElement.classList.contains('image-edit')){
      console.log(event)
      const editIndex=Number(event.target.parentNode.getAttribute('data-index'))
      const editTarget=document.getElementById(`image-${editIndex}-input`)
      editTarget.click()

      editTarget.addEventListener('change',(event)=>{
        console.log('aftercliiig')
        index=Number(event.target.getAttribute('data-index'))
        const file=event.target.files[0]
        imageSrc=URL.createObjectURL(file)
        preview(imageSrc,index)
        }) 
    }
  })
})