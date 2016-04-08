const gameWidth = 800;
const gameHeight = 600;
const UNIT_TYPES = {
    MARINE : 'marine',
    ZEALOT : 'zealot',
    DRAGOON : 'dragoon'
};
const BUILDING_TYPES = {
    TURRET : 'turret',
    TANK : 'tank'
};
const BULLET_TYPES = {
    BULLET : 'bullet'
};
const CURSOR_TYPE = {
    NONE: 'none',
    NORMAL : 'default',
    POINTER : "pointer",
    TURRET : 'url(/assets/buildings/towers/turret/turretBuild.png), auto',
    TURRET_RED : 'url(/assets/buildings/towers/turret/turretBuildRed.png), auto'
};