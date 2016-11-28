/*
@controller
*/
  var controller = {
    init : function(){
      view.init();
    },
    dataModel : function(){
      return models.model;
    },
    currentIValue : models.currentI,
    subTopicValue  : models.subTopicValue,
    nextBtnFunction : function(){ // main function for next
      models.currentI = models.currentI;
      models.subTopicValue  = models.subTopicValue;
      var subTopicLen = document.getElementsByClassName('liSubTopic');
      var dataModel = controller.dataModel();
      if((models.currentI) < dataModel.length){
      if( models.subTopicValue < dataModel[models.currentI].subTopic.length){
      var subTopicValue = models.subTopicValue;
      controller.changeContentNext(dataModel,subTopicValue);
      controller.checkBtnVisibility(dataModel);
      }
      else {
      models.currentI = models.currentI+1;
      models.subTopicValue = 0 ;
      var subTopicValue = models.subTopicValue;
      var sUl = document.getElementsByClassName("subUl");
      sUl[models.currentI].classList.add("show");
      sUl[(models.currentI-1)].classList.remove("show");
      controller.changeContentNext(dataModel,subTopicValue);
      }
    }
    },
    prevBtnFunction : function(){   // main function for prevoius
      if(models.currentI > -1){
      if(models.subTopicValue > 1){
      var dataModel = controller.dataModel();
      models.subTopicValue = (models.subTopicValue-1);
      controller.checkBtnVisibility(dataModel);
      controller.changeContentPrev(dataModel,models.subTopicValue);
      var subTopicLen = document.getElementsByClassName('liSubTopic');
      }
      else {
      models.currentI = (models.currentI-1);
      var dataModel = controller.dataModel();
      models.subTopicValue = dataModel[models.currentI].subTopic.length;
      var subTopicValue = models.subTopicValue;
      var sUl = document.getElementsByClassName("subUl");
      sUl[models.currentI].classList.add("show");
      sUl[(models.currentI+1)].classList.remove("show");
      controller.changeContentPrev(dataModel,models.subTopicValue);
      }
      }
    },
    clickOnMainTopic : function(i){
      var sUl = document.getElementsByClassName("subUl");//function for hide and show subtop
      sUl[i].classList.toggle("show");
    },
    changeContentNext : function(dataModel,subTopicValue){  // calling function for next
      controller.removeColor();
      var mainTopicLen = document.getElementsByClassName('mainUl');
      contentHeading.innerHTML = dataModel[(models.currentI)].subTopic[(subTopicValue)].subTopicName;
      contentData.innerHTML = dataModel[(models.currentI)].subTopic[(subTopicValue)].subTopicCotent;
      mainTopicLen[(models.currentI)].children[1].children[(subTopicValue)].classList.add('add-color-active');
      models.subTopicValue = subTopicValue+1 ;
    },
    changeContentPrev : function(dataModel,subTopicValue){  // calling function for previous
      var mainTopicLen = document.getElementsByClassName('mainUl');
      controller.removeColor();
      contentHeading.innerHTML = dataModel[(models.currentI)].subTopic[(subTopicValue-1)].subTopicName;
      contentData.innerHTML = dataModel[(models.currentI)].subTopic[(subTopicValue-1)].subTopicCotent;
      mainTopicLen[(models.currentI)].children[1].children[(subTopicValue-1)].classList.add('add-color-active');
    },
    onClickLiFunction : function(i,j,model,liSelf){ //function for li change event
      models.currentI = i;
      models.subTopicValue = j;
      var mainUl = document.getElementsByClassName('mainUl');
      var subTopicLen = document.getElementsByClassName('liSubTopic');
      contentHeading.innerHTML = model[(models.currentI)].subTopic[(models.subTopicValue)].subTopicName;
      contentData.innerHTML = model[(models.currentI)].subTopic[(models.subTopicValue)].subTopicCotent;
      controller.changeContentNext(model,models.subTopicValue);
      controller.checkBtnVisibility(model);
      controller.changeContentPrev(model,models.subTopicValue);
      for(var c = 0; c < subTopicLen.length ; c++ ){
      subTopicLen[c].classList.remove('add-color-active');
      }
      liSelf.classList.add('add-color-active');
    },
    removeColor : function(){  // remove color function
      var liRemoveColor = document.getElementsByClassName('add-color-active');
      for (var i = 0; i < liRemoveColor.length; i++) {
      liRemoveColor[i].classList.remove('add-color-active');
      }
    },
    checkBtnVisibility : function(dataModel){ // function check button disabled
      if(models.currentI == 0 && models.subTopicValue == 1){
        prevBtn.disabled = true;
      } else {
        prevBtn.disabled = false;
      }
      if((models.currentI+1) == dataModel.length && models.subTopicValue == dataModel[models.currentI].subTopic.length){
        nextBtn.disabled = true;
      } else {
        nextBtn.disabled = false;
      }
    }
  }

/*
@view
*/
  var view = {
    init : function(){
      var model = controller.dataModel();
      var mainDiv = document.getElementById('mainDiv');
      var ulMainHeading = document.createElement('ul');
      ulMainHeading.setAttribute('class','ulMainHeadingId');
      var contentHeading = document.getElementById('contentHeading');
      var contentData = document.getElementById('contentData');
      var liSubTopic = document.createElement('li');
      var prevBtn = document.createElement('button');
      prevBtn.textContent = 'Previous';
      prevBtn.id = 'prevBtn';
      var nextBtn = document.createElement('button');
      nextBtn.textContent = 'next';
      nextBtn.id = 'nextBtn';
      for(var i = 0 ; i < model.length ; i++){
      var liMainHeading = document.createElement('li');
      var liMainSpan = document.createElement('span');
      liMainHeading.id = 'liMainHeading';
      liMainSpan.addEventListener('click',(function(i){ // main top click event for hide and show
        return function(){
        controller.clickOnMainTopic(i);
        }
      })(i));
      liMainSpan.innerHTML = model[i].secName;//main top name
      var ulSubTopic = document.createElement('ul');
      liMainHeading.setAttribute('class','mainUl');
      ulSubTopic.setAttribute('class','subUl');
      for(var j = 0 ; j < model[i].subTopic.length;j++){
      var liSubTopic = document.createElement('li');
      liSubTopic.setAttribute('class','liSubTopic');
      liSubTopic.addEventListener('click',(function(i,j,model){ //click event of li
        return function(){
          var liSelf = this;
          var currentI = models.currentI;
          var subTopicValue  = models.subTopicValue;
          controller.onClickLiFunction(i,j,model,liSelf,currentI,subTopicValue);
          }
        })(i,j,model));
      liSubTopic.innerHTML = model[i].subTopic[j].subTopicName;// subTopic name
      var dataModel =  model[i];
      ulSubTopic.append(liSubTopic);
      }
      mainDiv.append(ulMainHeading);
      ulMainHeading.append(liMainHeading);
      liMainHeading.append(liMainSpan);
      liMainHeading.append(ulSubTopic);
      addForm.append(prevBtn);
      addForm.append(nextBtn);
      }
      this.render();
    },
    render : function(){
      var modelData = controller.dataModel();
      var sUl = document.getElementsByClassName("subUl");//code for open first child
      var subTopicLen = document.getElementsByClassName('liSubTopic');
      var mainTopicLen = document.getElementsByClassName('mainUl');
      sUl[0].classList.add("show");
      mainTopicLen[0].children[1].children[0].classList.add('add-color-active');
      contentHeading.innerHTML = modelData[0].subTopic[0].subTopicName;
      contentData.innerHTML = modelData[0].subTopic[0].subTopicCotent;
      controller.checkBtnVisibility(modelData);
      this.prevNextFunction();
      },
      prevNextFunction : function(){ // click event of prev and next button
        prevBtn.addEventListener('click',(function(){
          return function(){
            controller.prevBtnFunction();
          }
        })());
        nextBtn.addEventListener('click',(function(){
          return function(){
            controller.nextBtnFunction();
          }
        })());
      }
    }
  controller.init();
