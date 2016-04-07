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