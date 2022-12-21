////////////////////////////
/// 화소 영역 처리 함수
//
// 엠보싱
function embos_image() {
    init_outImage();
    var mask = [  [ -1.0, 0.0, 0.0 ],
                  [  0.0, 0.0, 0.0 ],
                  [  0.0, 0.0, 1.0 ]  ];
    var tmpInput = new Array(outH + 2);
    for(var i = 0; i < outH + 2; i++){
        tmpInput[i] = new Array(inW + 2);
        for(var j = 0; j < inW + 2; j++){
            tmpInput[i][j] = 127.0;
        }
    }
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            tmpInput[i+1][j+1] = parseFloat(inImage[i][j]);
        }
    }
    var tmpOutput = new Array(outH);
    for(var i = 0; i < outH; i++){
        tmpOutput[i] = new Array(inW);
    }
    //////////////////////////////////////////////////
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            // 한 픽셀에 대해 처리
            var S = 0.0;
            for(var m = 0; m < 3; m++) {
                for(var n = 0; n < 3; n++){
                    S += tmpInput[i+m][j+n] * mask[m][n]
                }
            }
            tmpOutput[i][j] = S;
        }
    }
    
    for(var i = 0; i < outH; i++) {
        for(var j = 0; j < outW; j++) {
            // 후처리: 마스크의 합계가 0이라면 수를 더함(밝게)
            tmpOutput[i][j] += 127.0;
            // 처리된 값이 0 이하일 경우 0으로 변경
            // -> 출력 함수에서 픽셀값이 음수일 경우 불투명도 0을 주기 때문에
            // 0 이상으로 바꾸어야 함
            if(tmpOutput[i][j] < 0) tmpOutput[i][j] = 0;
            outImage[i][j] = parseInt(tmpOutput[i][j]);
        }
    }
    displayImage();    
}
// 블러링 약하게
function blur_image_1() {
    init_outImage();
    var mask = [  [ 1/9., 1/9., 1/9. ],
                  [ 1/9., 1/9., 1/9. ],
                  [ 1/9., 1/9., 1/9. ]  ];
    var tmpInput = new Array(outH + 2);
    for(var i = 0; i < outH + 2; i++){
        tmpInput[i] = new Array(inW + 2);
        for(var j = 0; j < inW + 2; j++){
            tmpInput[i][j] = 127.0;
        }
    }
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            tmpInput[i+1][j+1] = parseFloat(inImage[i][j]);
        }
    }
    var tmpOutput = new Array(outH);
    for(var i = 0; i < outH; i++){
        tmpOutput[i] = new Array(inW);
    }
    //////////////////////////////////////////////////
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            // 한 픽셀에 대해 처리
            var S = 0.0;
            for(var m = 0; m < 3; m++) {
                for(var n = 0; n < 3; n++){
                    S += tmpInput[i+m][j+n] * mask[m][n]
                }
            }
            tmpOutput[i][j] = S;
        }
    }
    for(var i = 0; i < outH; i++) {
        for(var j = 0; j < outW; j++) {
            outImage[i][j] = parseInt(tmpOutput[i][j]);
        }
    }
    displayImage();    
}
// 블러링 강하게
function blur_image_2() {
    init_outImage();
    var mask = [  [ 1/25., 1/25., 1/25., 1/25., 1/25. ],
                  [ 1/25., 1/25., 1/25., 1/25., 1/25. ],
                  [ 1/25., 1/25., 1/25., 1/25., 1/25. ],
                  [ 1/25., 1/25., 1/25., 1/25., 1/25. ],
                  [ 1/25., 1/25., 1/25., 1/25., 1/25. ]  ];
    var tmpInput = new Array(outH + 4);
    for(var i = 0; i < outH + 4; i++){
        tmpInput[i] = new Array(inW + 4);
        for(var j = 0; j < inW + 4; j++){
            tmpInput[i][j] = 127.0;
        }
    }
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            tmpInput[i+1][j+1] = parseFloat(inImage[i][j]);
        }
    }
    var tmpOutput = new Array(outH);
    for(var i = 0; i < outH; i++){
        tmpOutput[i] = new Array(inW);
    }
    //////////////////////////////////////////////////
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            // 한 픽셀에 대해 처리
            var S = 0.0;
            for(var m = 0; m < 5; m++) {
                for(var n = 0; n < 5; n++){
                    S += tmpInput[i+m][j+n] * mask[m][n]
                }
            }
            tmpOutput[i][j] = S;
        }
    }
    for(var i = 0; i < outH; i++) {
        for(var j = 0; j < outW; j++) {
            outImage[i][j] = parseInt(tmpOutput[i][j]);
        }
    }
    displayImage();    
}
// 경계선 추출
function edge_image() {
    init_outImage();
    var mask = [  [ -1/9., -1/9., -1/9. ],
                  [ -1/9.,  8/9., -1/9. ],
                  [ -1/9., -1/9., -1/9. ]  ];
    var tmpInput = new Array(outH + 2);
    for(var i = 0; i < outH + 2; i++){
        tmpInput[i] = new Array(inW + 2);
        for(var j = 0; j < inW + 2; j++){
            tmpInput[i][j] = 127.0;
        }
    }
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            tmpInput[i+1][j+1] = parseFloat(inImage[i][j]);
        }
    }
    var tmpOutput = new Array(outH);
    for(var i = 0; i < outH; i++){
        tmpOutput[i] = new Array(inW);
    }
    //////////////////////////////////////////////////
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            // 한 픽셀에 대해 처리
            var S = 0.0;
            for(var m = 0; m < 3; m++) {
                for(var n = 0; n < 3; n++){
                    S += tmpInput[i+m][j+n] * mask[m][n]
                }
            }
            tmpOutput[i][j] = S;
        }
    }

    for(var i = 0; i < outH; i++) {
        for(var j = 0; j < outW; j++) {
            // 어두운 영상을 밝게
            tmpOutput[i][j] += 127.0;
            outImage[i][j] = parseInt(tmpOutput[i][j]);
        }
    }
    displayImage();    
}
// 라플라시안 연하게
function lapla_image_1() {
    init_outImage();
    var mask = [  [  0.0, -1.0,  0.0 ],
                  [ -1.0,  4.0, -1.0 ],
                  [  0.0, -1.0,  0.0 ]  ];
    var tmpInput = new Array(outH + 2);
    for(var i = 0; i < outH + 2; i++){
        tmpInput[i] = new Array(inW + 2);
        for(var j = 0; j < inW + 2; j++){
            tmpInput[i][j] = 127.0;
        }
    }
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            tmpInput[i+1][j+1] = parseFloat(inImage[i][j]);
        }
    }
    var tmpOutput = new Array(outH);
    for(var i = 0; i < outH; i++){
        tmpOutput[i] = new Array(inW);
    }
    //////////////////////////////////////////////////
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            // 한 픽셀에 대해 처리
            var S = 0.0;
            for(var m = 0; m < 3; m++) {
                for(var n = 0; n < 3; n++){
                    S += tmpInput[i+m][j+n] * mask[m][n]
                }
            }
            tmpOutput[i][j] = S;
        }
    }

    for(var i = 0; i < outH; i++) {
        for(var j = 0; j < outW; j++) {
            tmpOutput[i][j] += 127.0;
            if(tmpOutput[i][j] < 0) tmpOutput[i][j] = 0;

            outImage[i][j] = parseInt(tmpOutput[i][j]);
        }
    }
    displayImage();    
}
// 라플라시안 강하게
function lapla_image_2() {
    init_outImage();
    var mask = [  [ -1.0, -1.0, -1.0 ],
                  [ -1.0,  8.0, -1.0 ],
                  [ -1.0, -1.0, -1.0 ]  ];
    var tmpInput = new Array(outH + 2);
    for(var i = 0; i < outH + 2; i++){
        tmpInput[i] = new Array(inW + 2);
        for(var j = 0; j < inW + 2; j++){
            tmpInput[i][j] = 127.0;
        }
    }
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            tmpInput[i+1][j+1] = parseFloat(inImage[i][j]);
        }
    }
    var tmpOutput = new Array(outH);
    for(var i = 0; i < outH; i++){
        tmpOutput[i] = new Array(inW);
    }
    //////////////////////////////////////////////////
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            // 한 픽셀에 대해 처리
            var S = 0.0;
            for(var m = 0; m < 3; m++) {
                for(var n = 0; n < 3; n++){
                    S += tmpInput[i+m][j+n] * mask[m][n]
                }
            }
            tmpOutput[i][j] = S;
        }
    }

    for(var i = 0; i < outH; i++) {
        for(var j = 0; j < outW; j++) {

            tmpOutput[i][j] += 127.0;
            if(tmpOutput[i][j] < 0) tmpOutput[i][j] = 0;

            outImage[i][j] = parseInt(tmpOutput[i][j]);
        }
    }
    displayImage();    
}