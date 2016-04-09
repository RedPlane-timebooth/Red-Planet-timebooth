const gameWidth = 800;
const gameHeight = 600;
const centralTextPossX = gameWidth / 2 - 100;
const centralTextPossY = gameHeight / 2 - 50;
const UNIT_TYPES = {
    MARINE : 'marine',
    ZEALOT : 'zealot',
    DRAGOON : 'dragoon',
    ULTRALISK : 'ultralisk'
};
const BUILDING_TYPES = {
    TURRET : 'turret',
    TANK : 'tank',
    SNIPER : 'sniper'
};
const BULLET_TYPES = {
    MISSILE : 'missile',
    SPLASH : 'splash',
    SNIPER : 'sniper'
};
const CURSOR_TYPE = {
    NONE: 'none',
    NORMAL : 'default',
    POINTER : "pointer",
    TURRET : 'url(/assets/buildings/towers/turret/turretBuild.png), auto',
    TURRET_RED : 'url(/assets/buildings/towers/turret/turretBuildRed.png), auto'
};