
document.body.onload = function() {
    var keyMap = {
        37 : 'LEFT',
        38 : 'UP',
        39 : 'RIGHT',
        40 : 'DOWN'
    };
    
    var currentStage    = document.getElementById('current-stage'),
        stageSelect     = document.getElementById('stage-select'),
        gotoStage       = document.getElementById('go-to-state');
    
    for (var i=0; i<maps.length; i++) {
        var option = document.createElement('option');
        option.textContent = 'Stage ' + (i + 1);        
        stageSelect.appendChild(option);
    }
    
    var emptyImage          = document.getElementById('empty-img'),
        wallImage           = document.getElementById('wall-img'),
        floorImage          = document.getElementById('floor-img'),
        targetImage         = document.getElementById('target-img'),
        cargoImage          = document.getElementById('cargo-img'),
        cargoOnTargetImage  = document.getElementById('cargo-target-img'),
        keeperImage         = document.getElementById('keeper-img'),
        keeperOnTargetImage = document.getElementById('keeper-target-img');

    document.body.removeChild(emptyImage);
    document.body.removeChild(wallImage);
    document.body.removeChild(floorImage);
    document.body.removeChild(targetImage);
    document.body.removeChild(cargoImage);
    document.body.removeChild(cargoOnTargetImage);
    document.body.removeChild(keeperImage);
    document.body.removeChild(keeperOnTargetImage);
    
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    
    var patterns = {
            0 : context.createPattern(emptyImage, 'repeat'),
            1 : context.createPattern(wallImage, 'repeat'),
            2 : context.createPattern(floorImage, 'repeat'),
            3 : context.createPattern(targetImage, 'repeat'),
            4 : context.createPattern(cargoImage, 'repeat'),
            5 : context.createPattern(cargoOnTargetImage, 'repeat'),
            6 : context.createPattern(keeperImage, 'repeat'),
            7 : context.createPattern(keeperOnTargetImage, 'repeat')
        };
    
    var sokoban = new Sokoban(patterns);  
    
    document.addEventListener('keydown', function (event) {
        switch (keyMap[event.keyCode]) {
            case 'UP' :
                sokoban.moveUp();
                break;
            case 'LEFT' :
                sokoban.moveLeft();
                break;
            case 'RIGHT' :
                sokoban.moveRight();
                break;
            case 'DOWN' :
                sokoban.moveDown();
                break;
            default :
                break;
        }
    });
    
    sokoban.on('stageStarted', function() {
        currentStage.textContent = this.mapIndex + 1;
        stageSelect.children[this.mapIndex].selected = true;
    });
    
    gotoStage.addEventListener('click', function (event) {
        var i;
  
        for (i=0; i<stageSelect.children.length; i++) {
            if (stageSelect.children[i].selected) {
                sokoban.playMap(i);     
            }

        }
    });
 
    
    sokoban.play();
}