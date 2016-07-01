app.run(function($rootScope) {
    $rootScope.linhaDetalhes = {};
});

app.controller('mainCtrl', function($scope, $rootScope) {
    $scope.sentido = true;

    $scope.trocaSentido = function() {
        $scope.sentido = !$scope.sentido;
    }


    $scope.carregaLinhaDetalhe = function(linha) {
        linha.detalhes = addDetalhes(linha);
        $rootScope.linhaCompleta = linha;
        $scope.montaLinhaDetalhada(true, linha);
        console.log(linha);

    }

    $scope.montaLinhaDetalhada = function(sentido = true, tmpLinha = false) {
        var linha = tmpLinha;

        if (!linha) {
            linha = $rootScope.linhaCompleta;
        }
        var tmpCorrente = {};

        if (sentido) {
            tmpCorrente = {
                origem: linha.origem,
                destino: linha.destino,
                localizacao: {
                    origem: {
                        lat: parseFloat(linha.origem_lat),
                        lng: parseFloat(linha.origem_lng)
                    },
                    destino: {
                        lat: parseFloat(linha.destino_lat),
                        lng: parseFloat(linha.destino_lng)
                    }
                },
                horarios: {
                    semana: linha.detalhes.horario_ida_seg_sex,
                    sabado: linha.detalhes.horario_ida_sab,
                    domingo: linha.detalhes.horario_ida_dom
                },
                itinerario: linha.detalhes.itinerario_ida,
                sentido: true
            }

        } else {
            tmpCorrente = {
                origem: linha.destino,
                destino: linha.origem,
                localizacao: {
                    origem: {
                        lat: parseFloat(linha.destino_lat),
                        lng: parseFloat(linha.destino_lng)
                    },
                    destino: {
                        lat: parseFloat(linha.origem_lat),
                        lng: parseFloat(linha.origem_lng)
                    }
                },
                horarios: {
                    semana: linha.detalhes.horario_volta_seg_sex,
                    sabado: linha.detalhes.horario_volta_sab,
                    domingo: linha.detalhes.horario_volta_dom
                },
                itinerario: linha.detalhes.itinerario_volta,
                sentido: false
            }
        }

        tmpCorrente.codigo = linha.codigo;
        tmpCorrente.tarifa = linha.tarifa;
        tmpCorrente.operadora = linha.operadora;



        configMap(tmpCorrente);

        $rootScope.linhaDetalhes = tmpCorrente;

        return tmpCorrente;
    }

    function configMap(tmpCorrente) {


        window.mapConfig = tmpCorrente;
    }

    function addDetalhes(linha) {
        var tmpDetalhe = {};
        for (var i = 0; i < detalhes.length; i++) {
            if (linha.codigo == detalhes[i].codigo) {
                // console.log(linha);
                tmpDetalhe = detalhes[i];
                break;
            }
        }

        return tmpDetalhe;
    }
    $scope.title = "Main";
    $scope.linhas = linhas;
});