app.controller('mainCtrl', function($scope) {
    $scope.linhas = linhas;
    $scope.showTableDetail = false;
    $scope.currentDir = true;
    $scope.recentes;

    function addIndex(linha) {
        var objAdd = {
            linha: linha,
            data: Date.now()
        };
        db.tasks.add(objAdd);
    }


    $scope.changeDirection = function(dir) {
        $scope.currentDir = dir;
        if (dir) {
            $scope.linhaDetalhada = {
                codigo: $scope.linha_detalhe.codigo,
                origem: $scope.linha_detalhe.origem,
                destino: $scope.linha_detalhe.destino,
                tarifa: $scope.linha_detalhe.tarifa,
                itinerario: $scope.linha_detalhe.detalhes.itinerario_ida,
                semana: $scope.linha_detalhe.detalhes.horario_ida_seg_sex,
                sabado: $scope.linha_detalhe.detalhes.horario_ida_sab,
                domingo: $scope.linha_detalhe.detalhes.horario_ida_dom,
                origem_lat: $scope.linha_detalhe.origem_lat,
                origem_lng: $scope.linha_detalhe.origem_lng,
                destino_lat: $scope.linha_detalhe.destino_lat,
                destino_lng: $scope.linha_detalhe.destino_lng
            }
        } else {
            $scope.linhaDetalhada = {
                codigo: $scope.linha_detalhe.codigo,
                origem: $scope.linha_detalhe.destino,
                destino: $scope.linha_detalhe.origem,
                tarifa: $scope.linha_detalhe.tarifa,
                itinerario: $scope.linha_detalhe.detalhes.itinerario_volta,
                semana: $scope.linha_detalhe.detalhes.horario_volta_seg_sex,
                sabado: $scope.linha_detalhe.detalhes.horario_volta_sab,
                domingo: $scope.linha_detalhe.detalhes.horario_volta_dom,
                origem_lat: $scope.linha_detalhe.destino_lat,
                origem_lng: $scope.linha_detalhe.destino_lng,
                destino_lat: $scope.linha_detalhe.origem_lat,
                destino_lng: $scope.linha_detalhe.origem_lng
            }
        }

        carregaMapa($scope.linhaDetalhada);


    };

    function carregaMapa(data) {

        var objMap = {
            origem: {
                lat: parseFloat(data.origem_lat),
                lng: parseFloat(data.origem_lng)
            },
            destino: {
                lat: parseFloat(data.destino_lat),
                lng: parseFloat(data.destino_lng)
            }
        }
        initMap(objMap.origem, objMap.destino);
    }

    $scope.loadLinhaRecente = function(linha) {
        $scope.linha_detalhe = linha;
        $scope.showTableDetail = true;
        $scope.changeDirection(true);
        mySwiper.slideTo(0);
    }
    $scope.searchResult = function(linha) {

        $scope.linha_detalhe = linha.originalObject;
        $scope.showTableDetail = true;
        searchForDetails(linha.originalObject.codigo);
        $scope.changeDirection(true);
        addIndex(linha.originalObject);
        console.log($scope.linha_detalhe);

        $scope.carregaRecentes();
    };

    function searchForDetails(cod) {
        for (i = 0; i < detalhes.length; i++) {
            if (detalhes[i].codigo == cod) {
                $scope.linha_detalhe.detalhes = detalhes[i];
                break;
            }
        }
    }

    $scope.carregaRecentes = function() {
        findIndex().then(function(data) {
            $scope.recentes = data;
            $scope.$apply();
            console.log($scope.recentes);
        });
    }

    $scope.carregaRecentes();

});
app.controller('detailsCtrl', function($scope) {
    $scope.all = $stateParams;
    $scope.linha = $stateParams.linha;
});
app.controller('recentsCtrl', function($scope) {

});