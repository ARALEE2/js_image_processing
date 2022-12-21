//////////////////////////////////////////////////////
/// 기하학 함수
///
// 좌우 반전
function mirror_hor_image() {
    init_outImage();
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            outImage[i][inW-1-j] = inImage[i][j];
        }
    }
    displayImage(); 
}

/// 상하 반전
function mirror_ver_image() {
    init_outImage();
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            outImage[inH-1-i][j] = inImage[i][j];
        }
    }
    displayImage(); 
}

/// 축소
function zoomOut_image() {
    var scale = parseInt(prompt("축소배율", 2));
    outH = parseInt(inH / scale);
    outW = parseInt(inW / scale);
    outCanvas.height = outH + (blank * 2);
    outCanvas.width = outW + (blank * 2);
    
    outImage = new Array(outH);
    for(var i = 0; i < outH; i++) {
        outImage[i] = new Array(outW);
    } 
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            outImage[parseInt(i/scale)][parseInt(j/scale)] = inImage[i][j];
        }
    }
    
    displayImage(); 
}

/// 확대
function zoomIn_foward_image() {
    var scale = parseInt(prompt("확대배율", 2));
    outH = parseInt(inH * scale);
    outW = parseInt(inW * scale);
    outCanvas.height = outH + (blank * 2);
    outCanvas.width = outW + (blank * 2);
    
    outImage = new Array(outH);
    for(var i = 0; i < outH; i++) {
        outImage[i] = new Array(outW);
    } 
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            outImage[parseInt(i*scale)][parseInt(j*scale)] = inImage[i][j];
        }
    }
    displayImage(); 
}

/// 보간 적용한 확대
function zoomIn_back_image() {
    var scale = parseInt(prompt("확대배율", 2));
    outH = parseInt(inH * scale);
    outW = parseInt(inW * scale);
    outCanvas.height = outH + (blank * 2);
    outCanvas.width = outW + (blank * 2);
    
    outImage = new Array(outH);
    for(var i = 0; i < outH; i++) {
        outImage[i] = new Array(outW);
    } 
    for(var i = 0; i < outH; i++) {
        for(var j = 0; j < outW; j++) {
            outImage[i][j] = inImage[parseInt(i/scale)][parseInt(j/scale)];
        }
    }
    displayImage(); 
}

// 이동
function move_image() {
    init_outImage();
    
    var [transX, transY] = prompt("이동 거리(ex: 10,-5) -->").split(",");
    mX = parseInt(transX);
    mY = parseInt(transY);
    for(var i = 0; i < inH; i++) {
        for(var j = 0; j < inW; j++) {
            outImage[i][j] = inImage[i][j];
        }
    }
    displayImage();    
}

// 회전
function rotate_image() {
    init_outImage();
    var sPos = [ 0, 0 ];
    var degree = parseInt(prompt("회전 각도 -->"));
    var radian = parseFloat(degree * Math.PI) / 180.0 * -1;
    var sinR = parseFloat(Math.sin(radian));
    var cosR = parseFloat(Math.cos(radian));          
    for(var y = 0; y < inH; y++) {
        for(var x = 0; x < inW; x++) {
            sPos = calc_position(sPos[0], sPos[1], x, y, sinR, cosR);
        
            if(    (0 <= sPos[0] && sPos[0] < inW) 
                && (0 <= sPos[1] && sPos[1] < inH) ){
                outImage[y][x] = inImage[sPos[1]][sPos[0]];
            }
            else outImage[y][x] = 0;
        }
    }
    displayImage();
}

/// 회전 계산 함수
function calc_position(sourceX, sourceY, outputX, outputY, sinR, cosR) {
    outputX -= (inW / 2);
    outputY -= (inH / 2);
    getX = cosR * outputX + sinR * outputY;
    getY = -1 * sinR * outputX + cosR * outputY;
    return [parseInt(getX + (inW / 2)), parseInt(getY + (inH / 2))];
}

/// 회전
function rotate_image_2() {
    var degree = parseInt(prompt("회전 각도 -->"));
    var radian = parseFloat(degree * Math.PI) / 180.0;
    outH = parseInt(Math.cos(radian)*inH + Math.cos(Math.PI/2 - radian)*inW);
    outW = parseInt(Math.cos(radian)*inW + Math.cos(Math.PI/2 - radian)*inH);
    outCanvas.height = outH + (blank * 2);
    outCanvas.width = outW + (blank * 2);
    var centerY = parseInt(outH / 2);
    var centerX = parseInt(outW / 2);
    mX = mY = 0;
    // 크기를 조정하여 outImage배열을 만들고 null로 초기화 함
        outImage = new Array(outH);
    for(var i = 0; i < outH; i++) {
        outImage[i] = new Array(outW);
        for(var j = 0; j < outW; j++)
            outImage[i][j] = null;
    }
    
    /////////////////////// 회전
    var xd, yd;
    for(var i = 0; i < outH; i++){
        for(var j = 0; j < outW; j++){
            xd = parseInt(Math.cos(radian)*(i - centerX) - Math.sin(radian)*(j - centerY) + centerX / outH * inH);
            yd = parseInt(Math.sin(radian)*(i - centerX) + Math.cos(radian)*(j - centerY) + centerY / outW * inW);
            if((0 <= xd && xd < inW) && (0 <= yd && yd < inH)){
                outImage[i][j] = inImage[xd][yd];
            }
            else{
                outImage[i][j] = -1;
            }
        }
    }
    displayImage();
}