//////////////////////////////////////////////////////
/// 화소점 처리 함수
///
// 동일영상
function equal_image() {
    if(isColor == true) {
        equal_Color_Image();
    }
    else {
        init_outImage();
        for(var i = 0; i < inH; i++) {
            for(var j = 0; j < inW; j++) {
                outImage[i][j] = inImage[i][j];
            }
        }
    }

    displayImage();    
}

// 밝게
function add_image() {
    init_outImage();
    var value = parseInt(prompt("밝게, 정수값 -->"));
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            if(inImage[i][j] + value > 255) outImage[i][j] = 255;
            else outImage[i][j] = inImage[i][j] + value;
        }
    }
    displayImage();  
}

// 어둡게
function dark_image() {
    init_outImage();
    
    var value = parseInt(prompt("어둡게하기, 정수값 -->"));
    for (var i = 0; i < inH; i++) {
        for (var j = 0; j< inW; j++) {
            if(inImage[i][j] - value < 0) outImage[i][j] = 0;
            else outImage[i][j] = inImage[i][j] - value;
        }
    }
    displayImage();
}

// 반전
function reverse_image() {
    init_outImage();
    for (var i = 0; i < inH; i++) {
        for (var j = 0; j < inW; j++) {
            outImage[i][j] = 255 - inImage[i][j];
        }
    }
    displayImage();
}

// 흑백 128
function bw_image_1() {
    init_outImage();
    for (var i = 0; i < inH; i++) {
        for (var j = 0; j < inW; j++) {
            if(inImage[i][j] < 128) outImage[i][j] = 0;
            else outImage[i][j] = 255;
        }
    }
    displayImage();
}

// 흑백 평균값
function bw_image_2() {
    init_outImage();
    var sum_val = 0;
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            sum_val += inImage[i][j];
        }
    }
    var avg_val = sum_val / (inH * inW);
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            if(inImage[i][j] > avg_val) outImage[i][j] = 255;
            else outImage[i][j] = 0;
        }
    }
    displayImage();    
}

// 흑백 중앙값
function bw_image_3() {
    init_outImage();
    var tmpArray = new Array(inH*inW);
    var index = 0;
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            tmpArray[index++] = inImage[i][j];
        }
    }
    tmpArray.sort();
    var avg_val = tmpArray[ parseInt((inH * inW) / 2) ];
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            if(inImage[i][j] > avg_val) outImage[i][j] = 255;
            else outImage[i][j] = 0;
        }
    }
    displayImage();    
}

// 감마 조정
function gamma_cor_image() {
    init_outImage();
    var value = parseFloat(prompt("감마 조정 수치 -->"));
    var tmp = 0;
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            tmp = Math.floor(Math.pow(inImage[i][j], 1/value));
            if(tmp < 0) outImage[i][j] = 0;
            else if(tmp > 255) outImage[i][j] = 255;
            else outImage[i][j] = tmp;
        }
    }
    displayImage();
}

// 범위 강조
function stress_trans_image() {
    init_outImage();
    var [sValue, eValue] = prompt("강조 범위 입력(ex: 50-150) -->").split("-");
    // 입력값 조정
    if(sValue < 0) sValue = 0;
    else if(sValue > 255) sValue = 255;
    else sValue = parseInt(sValue);
    if(eValue < 0) eValue = 0;
    else if(eValue > 255) eValue = 255;
    else eValue = parseInt(eValue);
    if(eValue < sValue) {
        var temp = eValue;
        eValue = sValue;
        sValue = temp;
    }
    console.log("조정된 수치: " + sValue + ", " + eValue);
    //////////////////////////////////////////////
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            if(sValue <= inImage[i][j] && inImage[i][j] <= eValue)
                outImage[i][j] = 255;
            else
                outImage[i][j] = inImage[i][j];
        }
    }
    displayImage();    
}