@extends('layouts.index')
        @section('content')
    <div id="gameWrapper">
        <div id="gameCanvas"></div>
    </div>

    <script src="/lib/phaser.js"></script>
    <script src="/node_modules/jquery/dist/jquery.min.js"></script>
    <script src="/GameLogic/Common/globalConstants.js"></script>
    <script src="/GameLogic/Common/globalFunctions.js"></script>
    <script src="/GameLogic/Common/validator.js"></script>
    <script src="/GameLogic/WorldObject.js"></script>
    <script src="/UI/UserInterface.js"></script>
    <script src="/GameLogic/Units/Unit.js"></script>
    <script src="/GameLogic/Units/UnitsPoolFactory.js"></script>
    <script src="/GameLogic/Buildings/Building.js"></script>
    <script src="/GameLogic/Buildings/Tower.js"></script>
    <script src="/GameLogic/Buildings/Turret.js"></script>
    <script src="/GameLogic/Buildings/BuildingsFactory.js"></script>
    <script src="/GameLogic/Player.js"></script>
    <script src="/GameLogic/Bullets/Bullet.js"></script>
    <script src="/GameLogic/Bullets/BulletsPoolFactory.js"></script>
    <script src="/Phaser/Boot.js"></script>
    <script src="/Phaser/Preload.js"></script>
    <script src="/Phaser/Game.js"></script>
    <script src="/Phaser/main.js"></script>

    <script src="/main.js"></script>

@endsection