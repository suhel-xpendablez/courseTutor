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

  //var acc = document.getElementsByClassName("accordion");
  var mainDiv = document.getElementById('mainDiv');
  for (i = 0; i < model.length; i++) {
    console.log(model.length);
    var secButton = document.createElement('button');
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
  }
  function onSecBtnClick(i){
    var panel = document.getElementsByClassName('panel');
    console.log(panel);
    if(panel[i].style.display == 'block' || panel[i].style.display == ''){
             panel[i].style.display = 'none';
           } else {
             panel[i].style.display = 'block';
           }
   }
