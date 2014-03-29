var backMirror = backMirror || {};

backMirror.controlUi = function(){
    this.init();
};

backMirror.controlUi.prototype = {
    init : function(){
        this._setElement();
        this._setValue();
        this.changeValue();
    },

    _setElement : function(){
        this.elFileUpload = $('#controlBM #file_upload');
        this.elMirror = $('#BM');
        this.elWidth = $('#controlBM #width');
        this.elTop = $('#controlBM #top');
        this.elLeft = $('#controlBM #left');
        this.elOpacity = $('#controlBM #opacity');
        this.elBlockNone = $('#controlBM #block_none');
    },

    _setValue : function(){
        this.elWidth.val(480);
        this.elTop.val(47);
        this.elLeft.val(12);
        this.elOpacity.val(50);
        this.elBlockNone.attr('checked', true);

        this._setWidth(this.elWidth.val());
        this._setTop(this.elTop.val());
        this._setLeft(this.elLeft.val());
        this._setOpacity(this.elOpacity.val() / 100);
    },

    _setPreview : function(preview){
        var oThis = this;
        if(preview.files && preview.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e){
                oThis.elMirror.find('img').attr('src', e.target.result);
            }
            reader.readAsDataURL(preview.files[0]);
        }
    },

    _setWidth : function(widthValue){
        this.elMirror.find('img').attr('style', 'width:'+widthValue+'px');
    },

    _setTop : function(topValue){
        this.elMirror.css('top', topValue+'px');
    },

    _setLeft : function(leftValue){
        this.elMirror.css('left', leftValue+'px');
    },

    _setOpacity : function(opacityValue){
        this.elMirror.css('opacity', opacityValue);
    },

    _setDisplay : function(displayValue){
        if(displayValue == true){
            displayValue = 'block';
        }else{
            displayValue = 'none';
        }
        this.elMirror.css('display', displayValue);
    },

    changeValue : function(){
        oThis = this;
        this.elWidth.on('change', function(){
            oThis._setWidth(this.value);
        });
        this.elTop.on('change', function(){
            oThis._setTop(this.value);
        });
        this.elLeft.on('change', function(){
            oThis._setLeft(this.value);
        });
        this.elOpacity.on('change', function(){
            oThis._setOpacity(this.value / 100);
        });
        this.elBlockNone.on('change', function(){
            oThis._setDisplay(this.checked);
        });
        this.elFileUpload.on('change', function(){
            oThis._setPreview(this);
            var getPath = this.value;
            var spliteFileName = this.value.split('\\');
            var nFileName = spliteFileName.length - 1;
            var getFileName = spliteFileName[nFileName];
        });
    }
};

var elAdd = '';
var elControls = '';
var elCreateDiv = document.createElement('div');
var elCreateImg = document.createElement('img');
var elBackMirror = '<div id="BM"></div>';
var elControl = '<div id="controlBM"></div>';

// NOTE create <div id="backMirrorWrap">
document.body.appendChild(elCreateDiv).setAttribute('id', 'backMirrorWrap');

// NOTE <div id="backMirrorWrap"> innerHTML <div id="BM">, <div id="controlBM">
elAdd += elBackMirror + elControl;
document.getElementById('backMirrorWrap').innerHTML = elAdd;

// NOTE <div id="BM"> innerHTML <img src>
document.getElementById('BM').appendChild(elCreateImg).setAttribute('src', '');

// NOTE inner controls
elControls += '<input type="file" accept="image/jpeg, image/png, image/gif" id="file_upload" class="form-control">';
elControls += '<span class="title"><label for="width">width (pixel)</label></span><input type="number" id="width" class="form-control">';
elControls += '<span class="title"><label for="height">height (pixel)</label></span><input type="text" id="height" class="form-control" value="auto" disabled="disabled">';
elControls += '<span class="title"><label for="top">top (pixel)</label></span><input type="number" id="top" class="form-control">';
elControls += '<span class="title"><label for="left">left (pixel)</label></span><input type="number" id="left" class="form-control">';
elControls += '<span class="title"><label for="opacity">opacity</label></span><input type="range" id="opacity">';
elControls += '<span class="title"><label for="block_none">block/none</label> </span><input type="checkbox" id="block_none">';
document.getElementById('controlBM').innerHTML = elControls;

var oBackMirror = new backMirror.controlUi();
