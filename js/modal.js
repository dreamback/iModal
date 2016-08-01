function iModal(opts) {

    function _iModal(opts) {
        opts = opts || {};
        this.init(opts);
    };

    _iModal.prototype = {
        init: function(opts) {
            this.extend({
                    title: false,
                    okText:'确定',
                    cancelText:'取消',
                    ok: false,
                    cancel: false,
                    content:'',
                    oninit: function() {},
                    onshow: function() {},
                    onclose: function() {},
                    btns: {},
                    remove: true,
                    auto: true
                },
                opts);

            if(typeof this.cancel == 'function')this.btns.cancel = {text:this.cancelText, callback:this.cancel};
            if(typeof this.ok == 'function')this.btns.ok = {text:this.okText, callback:this.ok};

            this.create();
            this.events();

            this.oninit.call(this);
        },

        extend: function(_default, opts) {
            for (var key in _default)
                this[key] = _default[key];
            for(var key in opts)
                this[key] = opts[key];
        },

        create: function() {
            var wrap = document.createElement('div'),
                html = '<div class="iModal">' +
                '     <div class="iModal-title">{title}</div>' +
                '     <div class="iModal-content">{content}</div>' +
                '     <div class="iModal-btns">{btns}</div>' +
                '</div>';

            this.className    =  ['iModal-wrapper iModal-hide'];
            !this.title      && this.className.push('no-title');
            !this.cancel     && this.className.push('no-cancel');
            !this.ok         && this.className.push('no-ok');

            !this.cancel && !this.ok && !this.btns.length && this.className.push('emptyBtns');

            Object.keys(this.btns).length>2 && this.className.push('horizontalBtns');

            this.wrap = wrap;
            var className = this.className.join(' ')
            wrap.setAttribute('class', className);

            var btnsHTML = '';
            for(var key in this.btns)
                btnsHTML += '<button class="'+key+'">'+this.btns[key].text+'</button>';

            wrap.innerHTML = this.parseTemplate(html, {
                title: this.title,
                content: this.content,
                btns: btnsHTML
            });
            document.body.appendChild(wrap);

            this.auto && this.show();
        },

        show: function(){
            var className = this.wrap.getAttribute('class'),
                that = this;
            setTimeout(function(){
                var _className = className.replace(/\biModal\-hide\b/, '');
                _className = _className.split(/\s+/).join(' ');
                that.wrap.setAttribute('class', _className);
                that.onshow.call(that);
            },0);
        },

        content: function(html){
            this.wrap.getElementsByClassName('iModal-content')[0].innerHTML = html;
        },

        close: function() {
            var className = this.wrap.getAttribute('class').split(' ');
            className.push('iModal-hide');
            this.wrap.setAttribute('class', className.join(' ') );
            this.onclose.call(this);
        },

        parseTemplate: function(tpl, data){
            for(var key in data){
                tpl = tpl.replace('{'+key+'}', data[key]);
            }
            return tpl;
        },

        events: function(){
                var target = '',
                    that = this;
            this.wrap.addEventListener('click', function(e){
                target = e.srcElement;
                if(target.tagName == 'BUTTON'){
                    that.btns[target.getAttribute('class')].callback()!==false && that.close.call(that);
                }
            }, false);
            this.wrap.addEventListener('webkitTransitionEnd', function(e){
                var _className = e.target.getAttribute('class');
                if(that.remove&&e.propertyName && _className.indexOf('iModal-wrapper')>-1 && _className.indexOf('iModal-hide')>-1){
                    that.wrap.parentNode.removeChild(e.target);
                }
            }, false)
        }
    };
    return new _iModal(opts);

}