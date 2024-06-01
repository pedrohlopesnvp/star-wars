var teclas = {
    W:87,
    A:65,
    S:83,
    D:68,
    UP:38,
    DW:40,
    LF:37,
    RG:39,
    SH:32
}

var jogo = {}
jogo.pressionou = []

stop_game = 0

var width_tela = $(window).width()
var height_tela = $(window).height()

var count_green_laser = 1
var count_red_laser = 1
var wait_red_shoot_tie_fighter = 1
var wait_red_shoot_tie_bomber = 1
var wait_red_shoot_tie_intercepter = 1
var wait_collision_player = 1

var count_tie_fighter= 1
var count_tie_bomber = 1
var count_tie_intercepter = 1
var player_vivo = 1

var dobra_inimigo_tie_fighter = 1
var dobra_inimigo_tie_bomber = 1
var dobra_inimigo_tie_intercepter= 1

var f_tie_fighter = 5
var f_tie_intercepter = 10
var f_tie_bomber = 15
var pontos = 0
var pontosAnterior = 0
var vel = 15 // colocar um peso e multiplicar todas as velocidades
var fase = 1000

// //Objeto
// var game_metodo = {
//     f_tie_fighter: 100,
//     f_tanque: 150,
//     pontos: 0
// }

// game_metodo.pontos += game_metodo.f_tie_fighter

var vida = 100

//Sons
var somjogo = document.getElementById("intro");	
//var explode = document.getElementById("explode");	

var up_tie_fighter = 0
var down_tie_fighter = 0


$(document).keydown(function(e) {
    jogo.pressionou[e.which] = true
}) //Enquanto estiver pressionada

$(document).keyup(function(e) {
    jogo.pressionou[e.which] = false
}) //Quando soltar a tecla

function movimenta_cenario() {
    var posicao = parseInt($('#area_jogo').css("background-position"))
    $('#area_jogo').css("background-position", posicao - vel - 5)
}

function cria_inimigo_tie_fighter() {
    if (stop_game == 0) {
        var height_tela = $(window).height()
        let top =Math.floor(Math.random() * ((height_tela - 190) - 140) + 140);
        $('#inimigos').append('<div id="tie_fighter'+count_tie_fighter+'" class="tie_fighter"></div>')
        $('#tie_fighter'+count_tie_fighter).css("top", top)
        count_tie_fighter++
    }
}

function cria_inimigo_tie_bomber() {
    if (stop_game == 0) {
        var height_tela = $(window).height()
        let top = Math.floor(Math.random() * ((height_tela - 150) - 10) + 10);
        $('#inimigos').append('<div id="tie_bomber'+count_tie_bomber+'" class="tie_bomber"></div>')
        $('#tie_bomber'+count_tie_bomber).css("top", top)
        count_tie_bomber++   
    }
}

function cria_inimigo_tie_intercepter() {
    if (stop_game == 0) {
        var height_tela = $(window).height()
        let top = Math.floor(Math.random() * ((height_tela - 150) - 10) + 10);
        $('#inimigos').append('<div id="tie_intercepter'+count_tie_intercepter+'" class="tie_intercepter"></div>')
        $('#tie_intercepter'+count_tie_intercepter).css("top", top)
        count_tie_intercepter++
    }
}

function movimenta_inimigos_tie_fighter() {

    const tie_fighters = document.querySelectorAll('.tie_fighter');

    tie_fighters.forEach((tie_fighter) => {
        var left_tie_fighter = parseInt($("#"+tie_fighter.id).css("left"))
        var top_tie_fighter = parseInt($("#"+tie_fighter.id).css("top"))
        var width_tie_fighter = parseInt($("#"+tie_fighter.id).css("width"))
        var dist_tie_fighter = 115
        var speed_tie_fighter = 10
        var enemy_tie_fighter = "tie_fighter"

        shoot_red_lazer(left_tie_fighter, width_tie_fighter, top_tie_fighter, dist_tie_fighter, speed_tie_fighter, enemy_tie_fighter)

        if (left_tie_fighter >= 10) {
            $("#"+tie_fighter.id).css("left", left_tie_fighter - vel + 5)

            if (up_tie_fighter < 40) {
                $("#"+tie_fighter.id).css("top", top_tie_fighter + 4)
                up_tie_fighter++
                down_tie_fighter = 0
            } else{
                $("#"+tie_fighter.id).css("top", top_tie_fighter - 4)
                down_tie_fighter++
                if (down_tie_fighter == 40) {
                    up_tie_fighter = 0
                }
            }

        } 
        else{
            $("#"+tie_fighter.id).remove()
            cria_inimigo_tie_fighter()
        }
    })

}

function movimenta_inimigos_tie_bomber() {

    const tie_bombers = document.querySelectorAll('.tie_bomber');

    tie_bombers.forEach((tie_bomber) => {
        var left_tie_bomber = parseInt($("#"+tie_bomber.id).css("left"))
        var top_tie_bomber = parseInt($("#"+tie_bomber.id).css("top"))
        var width_tie_bomber = parseInt($("#"+tie_bomber.id).css("width"))
        var dist_tie_bomber = 135
        var speed_tie_bomber = 10
        var enemy_tie_bomber = "tie_bomber"

        shoot_red_lazer(left_tie_bomber, width_tie_bomber, top_tie_bomber, dist_tie_bomber, speed_tie_bomber, enemy_tie_bomber)

        if (left_tie_bomber >= (width_tela * 75/100)) {
            $("#"+tie_bomber.id).css("left", left_tie_bomber - vel + 10)
        } 
    })

}

function movimenta_inimigos_tie_intercepter() {

    const tie_intercepters = document.querySelectorAll('.tie_intercepter');

    tie_intercepters.forEach((tie_intercepter) => {
        var left_tie_intercepter = parseInt($("#"+tie_intercepter.id).css("left"))
        var top_tie_intercepter = parseInt($("#"+tie_intercepter.id).css("top"))
        var width_tie_intercepter = parseInt($("#"+tie_intercepter.id).css("width"))
        var dist_tie_intercepter = 135
        var speed_tie_intercepter = 2
        var enemy_tie_intercepter = "tie_intercepter"

        shoot_red_lazer(left_tie_intercepter, width_tie_intercepter, top_tie_intercepter, dist_tie_intercepter, speed_tie_intercepter, enemy_tie_intercepter)

        if (left_tie_intercepter >= 10) {
            $("#"+tie_intercepter.id).css("left", left_tie_intercepter - vel - 5)
        } 
        else{
            $("#"+tie_intercepter.id).remove()
            cria_inimigo_tie_intercepter()
        }
    })

}

function shoot_red_lazer(left, width, top, dist, speed, enemy) {

    if (enemy == 'tie_fighter') {

        if (wait_red_shoot_tie_fighter == 2) {
    
            $('#tiros').append('<div id="red_laser'+count_red_laser+enemy+'" class="red_laser"></div>')
            $("#red_laser"+count_red_laser+enemy).css("left", left+width-dist) //85
            $("#red_laser"+count_red_laser+enemy).css("top", top+42)
        
            count_red_laser++ 
            
        }
        if (wait_red_shoot_tie_fighter == speed) { //10
            wait_red_shoot_tie_fighter = 1
        }
    
        wait_red_shoot_tie_fighter++
        
    }

    if (enemy == 'tie_bomber') {

        if (wait_red_shoot_tie_bomber == 2) {
    
            $('#tiros').append('<div id="red_laser'+count_red_laser+enemy+'" class="red_laser"></div>')
            $("#red_laser"+count_red_laser+enemy).css("left", left+width-dist) //85
            $("#red_laser"+count_red_laser+enemy).css("top", top+42)
        
            count_red_laser++ 
            
        }
        if (wait_red_shoot_tie_bomber == speed) { //10
            wait_red_shoot_tie_bomber = 1
        }
    
        wait_red_shoot_tie_bomber++
        
    }

    if (enemy == 'tie_intercepter') {

        if (wait_red_shoot_tie_intercepter == 2) {
    
            $('#tiros').append('<div id="red_laser'+count_red_laser+enemy+'" class="red_laser"></div>')
            $("#red_laser"+count_red_laser+enemy).css("left", left+width-dist) //85
            $("#red_laser"+count_red_laser+enemy).css("top", top+42)
        
            count_red_laser++ 
            
        }
        if (wait_red_shoot_tie_intercepter == speed) { //10
            wait_red_shoot_tie_intercepter = 1
        }
    
        wait_red_shoot_tie_intercepter++
        
    }

}

function movimenta_player() {

    var width_player = parseInt($("#player").css("width"))
    var height_player = parseInt($("#player").css("height"))
    
    if (jogo.pressionou[teclas.W] || jogo.pressionou[teclas.UP]) {
        var pos_top = $("#player").css("top")
        pos_top = parseInt(pos_top)
        if (pos_top > 0) $("#player").css("top", pos_top - vel)
    }

    if (jogo.pressionou[teclas.A] || jogo.pressionou[teclas.LF]) {
        var pos_right = $("#player").css("right")
        pos_right = parseInt(pos_right)
        if (pos_right < width_tela - width_player - 80) $("#player").css("right", pos_right + vel)
    }

    if (jogo.pressionou[teclas.S] || jogo.pressionou[teclas.DW]) {
        var pos_top = $("#player").css("top")
        pos_top = parseInt(pos_top)
        if (pos_top < height_tela - height_player - 50) $("#player").css("top", pos_top + vel)
    }

    if (jogo.pressionou[teclas.D] || jogo.pressionou[teclas.RG]) {
        var pos_right = $("#player").css("right")
        pos_right = parseInt(pos_right)
        if (pos_right > 0) $("#player").css("right", pos_right - vel)
    }

    if (jogo.pressionou[teclas.SH]) {
        
        if (player_vivo == 1) {

            $('#sons_repetidos').append('<audio src="sons/shoot.mp3" preload="auto" id="shoot'+count_green_laser+'"></audio>')
            var shoot = document.getElementById("shoot"+count_green_laser);
            // shoot.play()
    
            // window.clearTimeout(ref);
            // window.setTimeout(create_shoot, 1000);
            
            var top_player = parseInt($("#player").css("top"))
            var left_player = parseInt($("#player").css("left"))
    
            $('#tiros').append('<div id="green_laser'+count_green_laser+'" class="green_laser"></div>')
            $("#green_laser"+count_green_laser).css("left", left_player+width_player-30)
            $("#green_laser"+count_green_laser).css("top", top_player+42)
    
            count_green_laser++ 
            
        }

    }
}

function movimenta_shoot() {

    const shoots = document.querySelectorAll('.green_laser');

    shoots.forEach((shoot) => {
        var left_shoot = parseInt($("#"+shoot.id).css("left"))
        var right_shoot = parseInt($("#"+shoot.id).css("right"))
        if (right_shoot > 10) {
            $("#"+shoot.id).css("left", left_shoot + vel + 5)
        } 
        else{
            $("#"+shoot.id).remove()
        }
    })

}

function movimenta_red_laser() {

    const redshoots = document.querySelectorAll('.red_laser');

    redshoots.forEach((redshoot) => {
        var left_redshoot = parseInt($("#"+redshoot.id).css("left"))
        var right_redshoot = parseInt($("#"+redshoot.id).css("right"))

        if (left_redshoot > 15) {
            $("#"+redshoot.id).css("left", left_redshoot - (vel + 10))
        } 
        else{
            $("#"+redshoot.id).remove()
        }
    })

}

function analisa_colisoes() {
    const shoots = document.querySelectorAll('.green_laser');
    const tie_fighters = document.querySelectorAll('.tie_fighter');
    const tie_bombers = document.querySelectorAll('.tie_bomber');
    const tie_intercepters = document.querySelectorAll('.tie_intercepter');
    const redshoots = document.querySelectorAll('.red_laser');

    shoots.forEach((shoot) => {
        tie_fighters.forEach((tie_fighter) => {
            
            var p_tiro_tie_fighter = $('#'+shoot.id).collision('#'+tie_fighter.id)

            if (p_tiro_tie_fighter.length > 0) {
                $('#'+shoot.id).remove()
        
                var tie_fighter1_left = parseInt($('#'+tie_fighter.id).css('left'))
                var tie_fighter1_top = parseInt($('#'+tie_fighter.id).css('top'))

                $('#sons_repetidos').append('<audio src="sons/explosao_inimigos.mp3" preload="auto" id="explode'+tie_fighter.id+'"></audio>')
                var explode = document.getElementById("explode"+tie_fighter.id);
                // explode.play()

                $('#'+tie_fighter.id).remove()
        
                $('#area_jogo').append('<div id="explosao"></div>')
                $('#explosao').css('left', tie_fighter1_left)
                $('#explosao').css('top', tie_fighter1_top)

                pontos += f_tie_fighter
        
                setTimeout(function() {
                    $('#explosao').remove()
                    cria_inimigo_tie_fighter()
                }, 500)
            }

        })

        tie_bombers.forEach((tie_bomber) => {
            
            var p_tiro_tie_bomber = $('#'+shoot.id).collision('#'+tie_bomber.id)

            if (p_tiro_tie_bomber.length > 0) {
                $('#'+shoot.id).remove()
        
                var tie_bomber1_left = parseInt($('#'+tie_bomber.id).css('left'))
                var tie_bomber1_top = parseInt($('#'+tie_bomber.id).css('top'))

                $('#sons_repetidos').append('<audio src="sons/explosao_inimigos.mp3" preload="auto" id="explode'+tie_bomber.id+'"></audio>')
                var explode = document.getElementById("explode"+tie_bomber.id);
                // explode.play()

                $('#'+tie_bomber.id).remove()
        
                $('#area_jogo').append('<div id="explosao"></div>')
                $('#explosao').css('left', tie_bomber1_left)
                $('#explosao').css('top', tie_bomber1_top)

                pontos += f_tie_bomber
        
                setTimeout(function() {
                    $('#explosao').remove()
                    cria_inimigo_tie_bomber()
                }, 500)
            }

        })

        tie_intercepters.forEach((tie_intercepter) => {
            
            var p_tiro_tie_intercepter = $('#'+shoot.id).collision('#'+tie_intercepter.id)

            if (p_tiro_tie_intercepter.length > 0) {
                $('#'+shoot.id).remove()
        
                var tie_intercepter1_left = parseInt($('#'+tie_intercepter.id).css('left'))
                var tie_intercepter1_top = parseInt($('#'+tie_intercepter.id).css('top'))

                $('#sons_repetidos').append('<audio src="sons/explosao_inimigos.mp3" preload="auto" id="explode'+tie_intercepter.id+'"></audio>')
                var explode = document.getElementById("explode"+tie_intercepter.id);
                // explode.play()

                $('#'+tie_intercepter.id).remove()
        
                $('#area_jogo').append('<div id="explosao"></div>')
                $('#explosao').css('left', tie_intercepter1_left)
                $('#explosao').css('top', tie_intercepter1_top)

                pontos += f_tie_intercepter
        
                setTimeout(function() {
                    $('#explosao').remove()
                    cria_inimigo_tie_intercepter()
                }, 500)
            }

        })
    })

    redshoots.forEach((redshoot) => {

        var p_red_player = $('#'+redshoot.id).collision('#player')

        if (p_red_player.length > 0) {
                if (wait_collision_player == 1) {
                    
                    var player_left = parseInt($('#player').css('left'))
                    var player_top = parseInt($('#player').css('top'))

                    // $('#area_jogo').append('<div id="impacto_player'+player_left+'"></div>')
                    // $('#impacto_player'+player_left).css('left', player_left)
                    // $('#impacto_player'+player_left).css('top', player_top)

                    // setTimeout(function() {
                    //     $('#impacto_player'+player_left).remove()
                    // }, 300)

                    diminuiVida()
                    wait_collision_player = 0
                }
        }
    })

}

function diminuiVida() {
    vida--

    $('#life').css("width", vida*2)
    $('#qtd_vidas').html(vida)

    if (vida == 0) {

        $('#life').remove()

        player_vivo = 0

        var player_left = parseInt($('#player').css('left'))
        var player_top = parseInt($('#player').css('top'))

        $('#area_jogo').append('<div id="explosao"></div>')
        $('#explosao').css('left', player_left)
        $('#explosao').css('top', player_top)

        setTimeout(function() {
            $('#explosao').remove()
            cria_inimigo_tie_intercepter()
        }, 250)

        $('#player').remove()

        end()
        
    }

}

function valida_pontuacao() {
    if (pontos > 0) {

        if ((pontos >= 100 && pontos <= 200) && dobra_inimigo_tie_fighter == 1) {
            cria_inimigo_tie_fighter()
            dobra_inimigo_tie_fighter = 0;
            vel += 1
        }

        if ((pontos >= 200 && pontos <= 300) && dobra_inimigo_tie_intercepter == 1) {
            cria_inimigo_tie_intercepter()
            dobra_inimigo_tie_intercepter = 0;
            vel += 1
        }

        if ((pontos >= 300 && pontos <= 400) && dobra_inimigo_tie_bomber == 1) {
            cria_inimigo_tie_bomber()
            dobra_inimigo_tie_bomber = 0;
            vel += 1
        }

        if ((pontos >= 400 && pontos <= 600) && dobra_inimigo_tie_fighter == 0) {
            cria_inimigo_tie_fighter()
            dobra_inimigo_tie_fighter = 1;
            vel += 1.5
        }

        if ((pontos >= 600 && pontos <= 800) && dobra_inimigo_tie_intercepter == 0) {
            cria_inimigo_tie_intercepter()
            dobra_inimigo_tie_intercepter = 1;
            vel += 1.5
        }

        if ((pontos >= 800 && pontos < 1000) && dobra_inimigo_tie_bomber == 0) {
            cria_inimigo_tie_bomber()
            dobra_inimigo_tie_bomber = 1;
            vel += 1.5
        }

        // if (pontos >= 1000) {
        //     stop_game = 1
        //     you_win()
        // }

        $('#pontos').html(pontos)
    }
}

function loop() {
    somjogo.addEventListener("ended", function(){
        somjogo.curentTime = 0
        // somjogo.play()
    }, false) //Verifica se o som acabou

    // somjogo.play()

    if (wait_collision_player == 0) {
        setTimeout(function() {
            wait_collision_player = 1
        }, 2000)
    }

    movimenta_cenario()
    movimenta_player()
    movimenta_shoot()
    movimenta_red_laser()
    movimenta_inimigos_tie_fighter()
    movimenta_inimigos_tie_bomber()
    movimenta_inimigos_tie_intercepter()
    analisa_colisoes()
    valida_pontuacao()
}

setInterval(
    loop,
    30
)

function start() {
    $('#alerta').css('display', 'none')
    $('#game_over').css('display', 'none')
    $('#you_win').css('display', 'none')
    $('#area_jogo').append('<div id="vida"></div>')
    $('#area_jogo').append('<div id="inimigos"></div>')
    setTimeout(function() {
        cria_inimigo_tie_fighter()
    }, 5000)
    setTimeout(function() {
        cria_inimigo_tie_intercepter()
    }, 15000)
    setTimeout(function() {
        cria_inimigo_tie_bomber()
    }, 30000)
    $('#area_jogo').append('<div id="tiros"></div>')
    $('#area_jogo').append('<div id="player"></div>')
    $('#area_jogo').append('<div id="pontos">0</div>')
    $('#area_jogo').append('<div id="qtd_vidas">100</div>')
    $('#area_jogo').append('<div id="lifebg"></div>')
    $('#area_jogo').append('<div id="life"></div>')
    $('#area_jogo').append('<div id="imperio"></div>')
}

function end(){

    $('#inimigos').remove()

    $('#game_over').css('display', 'block')
}

function you_win(){

    $('#inimigos').remove()

    $('#you_win').css('display', 'block')

}

function restart(){
    location.reload();
}