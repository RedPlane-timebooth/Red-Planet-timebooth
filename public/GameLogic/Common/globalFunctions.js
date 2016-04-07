function buffer(object, time, game) {
    object.is = true;
    game.time.events.add(time, function() {
        object.is = false
    } , RedPlanetGame.Game);
}
function createInvisibleSpriteGroupFromMapObjects(type, map, layer, game, group) {
    var result = [];
    map.objects[layer].forEach(function(element){
        if(element.type === type) {

            var newSprite = game.add.sprite(element.x,element.y);
            newSprite.width = element.width;
            newSprite.height = element.height;

            group.add(newSprite);
        }
    });
    return result;
}
function createCheckPoints(type, map, layer) {
    var result = [];
    map.objects[layer].forEach(function(element){
        if(element.type === type) {
            result.push(element);
        }
    });
    result.sort(function(a, b) {
        return parseFloat(a.name) - parseFloat(b.name);
    });
    return result;
}
function animateMoveGlobal(destination) {
    var angleBetween = Math.round((this.game.physics.arcade.angleBetween(this, destination) * 90) / 21) + 8;
    var spriteRow;
    var reverseX;
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
    this.animations.add('move', [
        spriteRow + 4 * 17,
        spriteRow + 5 * 17,
        spriteRow + 6 * 17,
        spriteRow + 7 * 17,
        spriteRow + 8 * 17,
        spriteRow + 9 * 17,
        spriteRow + 10 * 17,
        spriteRow + 11 * 17,
        spriteRow + 12 * 17
    ], 15, true);
    this.animations.play('move');

    if (reverseX) {
        this.scale.x *= -1;
    }
}