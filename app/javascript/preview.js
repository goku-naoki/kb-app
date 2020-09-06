document.addEventListener('DOMContentLoaded',()=>{

  let imageInputs=Array.from(document.getElementsByClassName('image-field'));
  let imageLength=0;
  let editBtns=[]
  const icon=document.getElementById('image-icon')
  
  
    function changeInput(targetInput){ 
      targetInput.addEventListener('change',(event)=>{
        const thisEvent=event
        prepareImageField(thisEvent)
        }) 
    }

    function iconClick(){
      icon.addEventListener('click',()=>{
        imageInputs=Array.from(document.getElementsByClassName('image-field'));
        imageLength=Array.from(document.getElementsByClassName('create-item-form-image-preview-box')).length;
        let target =imageInputs[imageInputs.length-1]
          if(imageLength!=3){
            target.click()
            changeInput(target)
          } 
        },{
          once: true  //イベント発火回数を制限しないと下のクリックと二回怒る
        })
      } 

    function prepareImageField(event){
      const index=Number(event.target.getAttribute('data-index'))
      const file=event.target.files[0]
      const imageSrc=URL.createObjectURL(file)
      preview(imageSrc,index)
      }


    const preview=(imageSrc,index)=>{
      const imagePreview=document.getElementById(`image-${index}`)
      if(imagePreview != null){
        imagePreview.setAttribute('src',imageSrc)
      }else{//既存のイメージがなかったら、下でimageとinput作成

        const createImage=(src,index)=>{ //imageの箱
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

          const createInput=(index)=>{  //input要素
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
            }
          iconClick()
        }
    }

    //全ての始まりはここ

    const firstTarget=document.getElementById("image-0-input")
    icon.addEventListener('click',()=>{
      firstTarget.click();
    },{
      once: true
    })

    firstTarget.addEventListener('change',(event)=>{
      const thisEvent=event
      prepareImageField(thisEvent)
    },{
      once: true  //イベント発火回数を制限しないと下のクリックと二回怒る
    })

    window.addEventListener('click',(event)=>{
      if(event.srcElement.classList.contains('image-edit')){
        console.log(event)
        const editIndex=Number(event.target.parentNode.getAttribute('data-index'))
        const editTarget=document.getElementById(`image-${editIndex}-input`)
        editTarget.click()
        changeInput(editTarget)
      }
    })
})