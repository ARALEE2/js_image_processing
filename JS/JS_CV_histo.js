//////////////////////////////////////////////////////
/// 히스토그램 함수
///
/// 히스토그램 스트래칭
function histoSt_image() {
    init_outImage();
    // outImage = (inImage - low) / (high - low) * 255;
    var low = inImage[0][0];
    var high = inImage[0][0];
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            if(inImage[i][j] < low) low = inImage[i][j];
            if(inImage[i][j] > high) high = inImage[i][j];
        }
    }
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            outImage[i][j] = parseInt((inImage[i][j] - low) / (high - low) * 255);
        }
    }
    displayImage();    
}

/// 경계선 추출
function endIn_image() {
    init_outImage();
    var low = inImage[0][0];
    var high = inImage[0][0];
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            if(inImage[i][j] < low) low = inImage[i][j];
            if(inImage[i][j] > high) high = inImage[i][j]; 
        }
    }
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            if(inImage[i][j] <= low) outImage[i][j] = 0;
            else if(inImage[i][j] >= high) outImage[i][j] = 255;
            else outImage[i][j] = parseInt((inImage[i][j] - low) / (high - low) * 255.0);
        }
    }
    displayImage();    
}

/// 평활화
function equalize_image() {
    init_outImage();
    // 0. 히스토그램 초기화
    var histo = new Array(256);
    var sumHisto = new Array(256);
    var normalHisto = new Array(256);
    for(var i = 0; i < 256; i++){
        histo[i] = 0;
        sumHisto[i] = 0;
        normalHisto[i] = 0.0;
    }
        
    // 1. 명암의 빈도수를 계산    
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++)
            histo[inImage[i][j]] += 1;
    }
    // 2. 누적 히스토그램 생성
    var sumValue = 0;
    for(var i = 0; i < 256; i++){
        sumValue += histo[i];
        sumHisto[i] = sumValue;
    }
    
    // 3. 정규화된 누적합 생성 
    for(var i = 0; i < 256; i++)
        normalHisto[i] = sumHisto[i] * (1.0 / (inH * inW)) * 255.0;
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            outImage[i][j] = parseInt(normalHisto[inImage[i][j]]);
        }
    }
    displayImage();
}