function buffer(object, time, game) {
    object.is = true;
    game.time.events.add(time, function () {
        object.is = false
    }, RedPlanetGame.Game);
}
function createInvisibleSpriteGroupFromMapObjects(type, map, layer, game, group) {
    var result = [];
    map.objects[layer].forEach(function (element) {
        if (element.type === type) {

            var newSprite = game.add.sprite(element.x, element.y);
            newSprite.width = element.width;
            newSprite.height = element.height;

            group.add(newSprite);
        }
    });
    return result;
}
function createCheckPoints(type, map, layer) {
    var result = [];
    map.objects[layer].forEach(function (element) {
        if (element.type === type) {
            result.push(element);
        }
    });
    result.sort(function (a, b) {
        return parseFloat(a.name) - parseFloat(b.name);
    });
    return result;
}
function animateMoveGlobal(destination, startRow, endRow) {
    //MAGIC DO NOT TOUCH!!!
    var angleBetween = Math.round((this.game.physics.arcade.angleBetween(this, destination) * 90) / 21) + 8,
        spriteRow,
        reverseX,
        animationsArray;

    //MAGIC DO NOT TOUCH!!!
    if (0 < angleBetween && angleBetween <= 15) {
        spriteRow = angleBetween;
        reverseX = false;
    }
    else {
        switch (angleBetween) {
            case -5:
                spriteRow = 7;
                reverseX = true;
                break;
            case -4:
                spriteRow = 6;
                reverseX = true;
                break;
            case -3:
                spriteRow = 5;
                reverseX = true;
                break;
            case -2:
                spriteRow = 4;
                reverseX = true;
                break;
            case -1:
                spriteRow = 3;
                reverseX = true;
                break;
            case 0:
                spriteRow = 2;
                reverseX = true;
                break;
            case 21:
                spriteRow = 8;
                reverseX = true;
                break;
            case 20:
                spriteRow = 9;
                reverseX = true;
                break;
            case 19:
                spriteRow = 10;
                reverseX = true;
                break;
            case 18:
                spriteRow = 11;
                reverseX = true;
                break;
            case 17:
                spriteRow = 12;
                reverseX = true;
                break;
            case 16:
                spriteRow = 13;
                reverseX = true;
                break;
        }
    }

    animationsArray = [];
    for (var i = startRow - 1; i < endRow; i++) {
        animationsArray.push(spriteRow + i * 17);
    }

    this.animations.add('move', animationsArray, 15, true);
    this.animations.play('move');

    if (reverseX) {
        this.scale.x *= -1;
    }
}
function animateDeathGlobal(deathSpriteArray) {
    var _this = this;
    this.animations.stop('move');
    this.animations.add('death', deathSpriteArray, 10, false);
    this.animations.play('death').onComplete.add(function(){
        _this.destroy();
    });
}