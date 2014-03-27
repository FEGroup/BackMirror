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
        $('body').append('<div id="backMirrorWrap"><div id="backMirror"><img src=""></div><div id="backMirrorControl"></div></div>');
        $('#backMirrorControl').html(
            '<input type="file" accept="image/jpeg, image/png, image/gif" id="file_upload"><br>' +
            '<span class="title"><label for="width">width : </label></span><input type="number" id="width"> px <br>' +
            '<span class="title"><label for="height">height : </label></span><input type="text" id="height" value="auto" disabled="disabled"> px <br>' +
            '<span class="title"><label for="top">top : </label></span><input type="number" id="top"> px <br>' +
            '<span class="title"><label for="left">left : </label></span><input type="number" id="left"> px <br>' +
            '<span class="title"><label for="opacity">opacity : </label></span><input type="range" id="opacity"> <br>' +
            '<span class="title">display : </span> <br>' +
            '<input type="checkbox" id="block_none"><label for="block_none">block/none</label> <br>'
        );

        this.elFileUpload = $('#backMirrorControl #file_upload');
        this.elMirror = $('#backMirror');
        this.elWidth = $('#backMirrorControl #width');
        this.elTop = $('#backMirrorControl #top');
        this.elLeft = $('#backMirrorControl #left');
        this.elOpacity = $('#backMirrorControl #opacity');
        this.elBlockNone = $('#backMirrorControl #block_none');
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
        if(preview.files && preview.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e){
                $('#backMirror img').attr('src', e.target.result);
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
