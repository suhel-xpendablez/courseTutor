var model = [
           {  id:1,
           secName:'Section1',
           content:'Dummy Content Section1'
           },
           {  id:2,
           secName:'Section2',
           content: 'Dummy Content Section2'
           },
           { id:3,
           secName:'Section3',
           content: 'Dummy Content Section3'
           },
          {   id:4,
             secName:'Section4',
             content: 'Dummy Content Section4'
           }
           ]
 var count = 0 ;
  var mainDiv = document.getElementById('mainDiv');
  var prevBtnLink = document.createElement('button');
  prevBtnLink.textContent = 'Prev';
  prevBtnLink.id = 'previous';
  var nextBtnLink = document.createElement('button');
  nextBtnLink.textContent = 'Next';
  nextBtnLink.id ='next';

  for (i = 0; i < model.length; i++) {
    var modelData = model[i];
    var secButton = document.createElement('button');
    var self = this;
    secButton.addEventListener('click',(function(i){
      return function() {
        onSecBtnClick(i);
      }
    })(i));

    var secDiv = document.createElement('div');
    secDiv.setAttribute('class','panel');
    secButton.setAttribute('class','accordion');
    secButton.innerHTML = model[i].secName;
    secDiv.innerHTML = model[i].content;
    mainDiv.append(secButton);
    mainDiv.append(secDiv);
    if(i==0){
    secDiv.style.display='block';
    count++;
    }
     }
    prevBtnLink.addEventListener('click',(function(){
    return function() {
     prevFunction();
      }
     })());
     nextBtnLink.addEventListener('click',(function(){
       return function() {
       nextFunction();
         }
       })());
    mainDiv.append(prevBtnLink);
    mainDiv.append(nextBtnLink);

  function onSecBtnClick(i){
    var panel = document.getElementsByClassName('panel');
    console.log(panel);
    if(panel[i].style.display == 'block' || panel[i].style.display == ''){
      panel[i].style.display = 'none';
    } else {
             panel[i].style.display = 'block';
           }
    }
    // function onSecBtnClick(i){
    //   var acc = document.getElementsByClassName("accordion");
    //   acc[i].classList.toggle("active");
    //   acc[i].nextElementSibling.classList.toggle("show");
    // }
    function prevFunction(){
      if(count == 1){
        }
      else {
        count--;
        var panel = document.getElementsByClassName("panel");
        console.log(count);
        panel[count].style.display = 'none';
        panel[count-1].style.display = 'block';
      }
    }
    function nextFunction(){
      if(count == model.length){
      }
      else {
        var panel = document.getElementsByClassName("panel");
        panel[count].style.display = 'block';
        panel[count-1].style.display = 'none';
        count++;
      }
    }
