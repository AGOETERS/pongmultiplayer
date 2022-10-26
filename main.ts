namespace SpriteKind {
    export const Ball = SpriteKind.create()
    export const player1 = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Ball, SpriteKind.Player, function (sprite, otherSprite) {
    otherSprite.setFlag(SpriteFlag.Ghost, true)
    currentBall.vx = currentBall.vx * -1
    currentBall.vy = currentBall.vy * -2
    info.player1.changeScoreBy(1)
    pause(200)
    otherSprite.setFlag(SpriteFlag.Ghost, false)
})
sprites.onOverlap(SpriteKind.Ball, SpriteKind.player1, function (sprite, otherSprite) {
    currentBall.setFlag(SpriteFlag.Ghost, true)
    currentBall.vx = currentBall.vx * -1
    currentBall.vy = currentBall.vy * -2
    info.player2.changeScoreBy(1)
    pause(200)
    currentBall.setFlag(SpriteFlag.Ghost, false)
})
let currentBall: Sprite = null
let Player1 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . 6 6 6 . . . . . . . . 
    . . . . . 6 6 6 . . . . . . . . 
    . . . . . 6 6 6 . . . . . . . . 
    . . . . . 6 6 6 . . . . . . . . 
    . . . . . 6 6 6 . . . . . . . . 
    . . . . . 6 6 6 . . . . . . . . 
    . . . . . 6 6 6 . . . . . . . . 
    . . . . . 6 6 6 . . . . . . . . 
    . . . . . 6 6 6 . . . . . . . . 
    . . . . . 6 6 6 . . . . . . . . 
    . . . . . 6 6 6 . . . . . . . . 
    . . . . . 6 6 6 . . . . . . . . 
    . . . . . 6 6 6 . . . . . . . . 
    . . . . . 6 6 6 . . . . . . . . 
    . . . . . 6 6 6 . . . . . . . . 
    `, SpriteKind.Player)
controller.player1.moveSprite(Player1, 0, 100)
Player1.x = 0
Player1.setStayInScreen(true)
info.setScore(0)
let Player2 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . 5 5 5 . . . . . . . 
    . . . . . . 5 5 5 . . . . . . . 
    . . . . . . 5 5 5 . . . . . . . 
    . . . . . . 5 5 5 . . . . . . . 
    . . . . . . 5 5 5 . . . . . . . 
    . . . . . . 5 5 5 . . . . . . . 
    . . . . . . 5 5 5 . . . . . . . 
    . . . . . . 5 5 5 . . . . . . . 
    . . . . . . 5 5 5 . . . . . . . 
    . . . . . . 5 5 5 . . . . . . . 
    . . . . . . 5 5 5 . . . . . . . 
    . . . . . . 5 5 5 . . . . . . . 
    . . . . . . 5 5 5 . . . . . . . 
    . . . . . . 5 5 5 . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.player1)
Player2.x = scene.screenWidth()
Player1.setStayInScreen(true)
info.player2.setScore(0)
controller.player2.moveSprite(Player2, 0, 100)
currentBall = sprites.create(img`
    ..............bbbbbbb...........
    ...........bb66663333baa........
    .........bb3367776333663aa......
    ........b33333888333389633aa....
    .......b3333333333333389633aa...
    ......b34443333333333338633bae..
    .....b3455433333333334443333ae..
    ....b33322333dddd3333455233daee.
    ...b3d333333dd3bbbb33322333dabe.
    ..b3d333333d3bb33bb33333333da4e.
    ..bd33333333b33aab3333333223a4ee
    .b3d3663333b33aab33366332442b4ee
    .bd3b983333a3aa3333387633ee3b4ee
    .bd6983333baaa333333387633bb4bee
    b3d6833333bba333333333863ba44ebe
    bdd3333333bb3333333333333a44bebe
    add666633333322333366333ba44bbbe
    ad67776333332442336983d3a444b4e.
    add888b333333ee3369833d3a44b44e.
    add333333333333336833d3a444b4e..
    a3dd3333344433333dddd3a444b44e..
    ab33ddd325543333dd33aa444b44e...
    .eabb3dd32233333baaa4444b44e....
    .ebabb3d333d33baa444443b44e.....
    ..ebaab3ddd3aaa4444433b44e......
    ..eebbaab33a44444333b444e.......
    ...eeebbaab444b333b4444e........
    ....ebeeebbbbbbbb4444ee.........
    .....eebbbb44444444ee...........
    .......eeebbb444eee.............
    ..........eeeeee................
    ................................
    `, SpriteKind.Ball)
if (Math.percentChance(50)) {
    currentBall.vx = -50
    currentBall.vy = randint(-50, 50)
} else {
    currentBall.vx = 75
    currentBall.vy = randint(-50, 50)
}
game.onUpdate(function () {
    if (currentBall.y <= 0) {
        currentBall.y = 0
        currentBall.vy = currentBall.vy * -1
    } else if (currentBall.y >= scene.screenHeight()) {
        currentBall.y = scene.screenHeight()
        currentBall.vy += currentBall.vy * -1
    }
    if (currentBall.x <= 0) {
        info.player2.changeScoreBy(1)
        currentBall.setFlag(SpriteFlag.DestroyOnWall, true)
        currentBall.destroy()
        currentBall.x = 0
        game.reset()
    } else if (currentBall.x >= scene.screenWidth()) {
        info.player1.changeScoreBy(1)
        currentBall.setFlag(SpriteFlag.DestroyOnWall, true)
        currentBall.destroy()
        game.reset()
    }
})
