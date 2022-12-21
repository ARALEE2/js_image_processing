/// 전역변수
const blank = 5;
var inCanvas, inCtx, inPaper, inFile;
var inImage, inH, inW;

var inColorImage, outColorImage;

var outCanvas, outCtx, outPaper;
var outImage, outH, outW;

var mX, mY, isColor;

// 초기화 함수
function init() {
    inCanvas = document.getElementById("inCanvas");
    inCtx = inCanvas.getContext("2d");
    outCanvas = document.getElementById("outCanvas");
    outCtx = outCanvas.getContext("2d");
    mX = mY = 0;
    isColor = false;
}

// 고정 크기 초기화: 반복 구문인 outImage 2차원 배열의 초기화
function init_outImage() {
    outH = inH;
    outW = inW;
    outCanvas.height = outH + (blank * 2);
    outCanvas.width = outW + (blank * 2);
    
    outImage = new Array(outH);
    for(var i = 0; i < outH; i++) {
        outImage[i] = new Array(outW);
        for(var j = 0; j < outW; j++) {
            outImage[i][j] = 0;
        }
    }
    mX = mY = 0;
}

// 파일 확장자 체크
function fileTypeCheck(obj) {
    var pathpoint = obj.value.lastIndexOf('.');
    var filepoint = obj.value.substring(pathpoint + 1, obj.lengh);
    var filetype = filepoint.toLowerCase();
    if(filetype == 'jpg' || filetype == 'png') {
        isColor = true;
        openColorImage();
    } 
    else if(filetype == 'raw') {
        isColor = false;
        openRawImage();
    }
    else {
        alert('이미지 파일만 선택할 수 있어요: *.jpg, *.png, *.raw');
        return false;
    }
}

// Raw 이미지 로딩
function openRawImage() {
    inFile = document.getElementById("inFile").files[0];
    inH = inW = Math.floor(Math.sqrt(inFile.size));
    inCanvas.height = inH + (blank * 2);
    inCanvas.width = inW + (blank * 2);
    inImage = new Array(inH);
    for(var i = 0; i < inH; i++) {
        inImage[i] = new Array(inW);
    }
    var reader = new FileReader();
    reader.readAsBinaryString(inFile);
    reader.onload = function() {
        var blob = reader.result;
        for(var i = 0; i < inH; i++) {
            for(var j = 0; j < inW; j++) {
                var sPixel = (i * inH + j);
                var ePixel = (i * inH + j) + 1;
                inImage[i][j] = blob.slice(sPixel, ePixel).charCodeAt(0);
            }
        }
        displayImage();
    }
}

// Color(jpg/png) 이미지 로딩
function openColorImage() {
    inFile = document.getElementById("inFile").files[0];
    inImage = new Image();
    inImage.src = inFile.name;

    inImage.onload = function () {
        inW = inImage.width;
        inH = inImage.height;
        inCanvas.width = inW + (blank * 2);
        inCanvas.height= inH + (blank * 2);
        inCtx.drawImage(inImage, blank, blank, inW, inH);

        // 3차원 컬러 이미지 배열 초기화
        inColorImage = new Array(3);
        for(var i = 0; i < 3; i++) {
            inColorImage[i] = new Array(inH);
            for(var j = 0; j < inH; j++) {
                inColorImage[i][j] = new Array(inW);
            }
        }
        var imageData = inCtx.getImageData(0, 0, inW, inH);
        var R, G, B, ALPHA;
        for(var i = 0; i < inH; i++) {
            for(var j = 0; j < inW; j++) {
                px = (i * inW + j) * 4;     // 1pixel = 4byte
                R = imageData.data[px + 0];
                G = imageData.data[px + 1];
                B = imageData.data[px + 2];
                // ALPHA = imageData.data[px + 4];
                inColorImage[0][i][j] = String.fromCharCode(R);
                inColorImage[1][i][j] = String.fromCharCode(G);
                inColorImage[2][i][j] = String.fromCharCode(B);
            }
        }
        displayImage();
    }
}

function equal_Color_Image() {
    outW = inW;
    outH = inH;

    // 컬러 출력 영상 배열 초기화
    outColorImage = new Array(3);
    for(var i = 0; i < 3; i++) {
        outColorImage[i] = new Array(outH);
        for(var j = 0; j < outH; j++) {
            outColorImage[i][j] = new Array(outW);
        }
    }
    
    for (var rgb = 0; rgb < 3; rgb++) {
        for(var i = 0; i < inH; i++) {
            for(var j = 0; j < inW; j++) {
                outColorImage[rgb][i][j] = inColorImage[rgb][i][j];
            }
        }
    }
}

// 입력 영상과 출력 영상을 캔버스에 출력
function displayImage() {
    if(isColor == true) {
        inPaper = inCtx.createImageData(inH, inW);
        var R, G, B; 
        console.log(inColorImage);
        for(var i = 0; i < inH; i++) {
            for(var j = 0; j < inW; j++) {
                R = inColorImage[0][i][j].charCodeAt(0);    // Byte문자 -> 숫자
                G = inColorImage[1][i][j].charCodeAt(0);
                B = inColorImage[2][i][j].charCodeAt(0);
                inPaper.data[(i * inW + j) * 4 + 0] = R;
                inPaper.data[(i * inW + j) * 4 + 1] = G;
                inPaper.data[(i * inW + j) * 4 + 2] = B;
                inPaper.data[(i * inW + j) * 4 + 3] = 255;
            }
        }
        inCtx.putImageData(inPaper, blank, blank);

        outPaper = outCtx.createImageData(outH, outW);
        for(var i = 0; i < outH; i++) {
            for(var j = 0; j < outW; j++) {
                R = outColorImage[0][i][j];    // Byte문자 -> 숫자
                G = outColorImage[1][i][j];
                B = outColorImage[2][i][j];
                outPaper.data[(i * outW + j) * 4 + 0] = R;
                outPaper.data[(i * outW + j) * 4 + 1] = G;
                outPaper.data[(i * outW + j) * 4 + 2] = B;
                outPaper.data[(i * outW + j) * 4 + 3] = 255;
            }
        }
        outCtx.putImageData(outPaper, blank + mX, blank + mY);
    }
    else {
        inPaper = inCtx.createImageData(inH, inW);
        // 원본 영상
        for(var i = 0; i < inH; i++){
            for(var j = 0; j < inW; j++){
                var px = inImage[i][j];   // binary -> char
                inPaper.data[ (i * inH + j) * 4 + 0 ] = px;     // Red         
                inPaper.data[ (i * inH + j) * 4 + 1 ] = px;     // Green
                inPaper.data[ (i * inH + j) * 4 + 2 ] = px;     // Blue        
                inPaper.data[ (i * inH + j) * 4 + 3 ] = 255;    // Alpha
            }
        }
        inCtx.putImageData(inPaper, blank, blank);
        outPaper = outCtx.createImageData(outH, outW);
        // 출력 영상
        for(var i = 0; i < outH; i++){
            for(var j = 0; j < outW; j++){
                var px = outImage[i][j];
                var alpha = 255;
                if(px < 0) alpha = 0;
                outPaper.data[ (i * outH + j) * 4 + 0 ] = px;                  
                outPaper.data[ (i * outH + j) * 4 + 1 ] = px; 
                outPaper.data[ (i * outH + j) * 4 + 2 ] = px;                  
                outPaper.data[ (i * outH + j) * 4 + 3 ] = alpha;
            }
        }
        outCtx.putImageData(outPaper, blank + mX, blank + mY);
    }
    
    
    
}