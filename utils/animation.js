function showModal(scope, dropbackCallback, modalCallback) {
  var animation = wx.createAnimation( {
      duration: 100,
      timingFunction: "ease",
  })
  scope.animation = animation;

  setTimeout( function() {
    scope.animation.backgroundColor('rgba(0,0,0,0.5)').step();
    typeof dropbackCallback == "function" && dropbackCallback(animation);
  }.bind( this ), 400 );

  setTimeout( function() {
    scope.animation.bottom(0).backgroundColor('#fff').step();
    typeof modalCallback == "function" && modalCallback(animation);
  }.bind( this ), 500 );
}

function closeModal(scope, modalCallback, dropbackCallback) {
  var animation = wx.createAnimation( {
      duration: 100,
      timingFunction: "ease"
  });
  scope.animation = animation;

  setTimeout( function() {
      scope.animation.bottom( '-80%' ).step();
      typeof modalCallback == "function" && modalCallback(animation);
  }.bind( this ), 400 );

  setTimeout( function() {
      scope.animation.backgroundColor('transparent').step();
      typeof dropbackCallback == "function" && dropbackCallback(animation);
  }.bind( this ), 500 );
}

module.exports = {
  showModal: showModal,
  closeModal: closeModal
}