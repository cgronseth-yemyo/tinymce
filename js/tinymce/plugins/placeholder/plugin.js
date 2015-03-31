/**
 * plugin.js
 *
 * mohansandesh: https://github.com/mohansandesh/tinymce-placeholder
 */

/*global tinymce:true */
/*eslint no-nested-ternary:0 */

/**
 * Placeholder
 *
 * This plugin brings HTML5 placeholder attribute functionality for the TinyMCE editor.
 *
 */
tinymce.PluginManager.add('placeholder', function(editor) {

 editor.on('init', function() {
        var label = new Label();
        
        onBlur();

        tinymce.DOM.bind(label.el, 'click', onFocus);
        editor.on('focus', onFocus);
        editor.on('blur', onBlur);

        function onFocus(){
            label.hide();
            tinymce.execCommand('mceFocus', false, editor);
        }

        function onBlur(){
            if(editor.getContent() === '') {
                label.show();
            }else{
                label.hide();
            }
        }
    });

    function Label(){
        var attrs;
        // Create label el
        this.text = editor.getElement().getAttribute("placeholder");
        this.contentAreaContainer = editor.getContentAreaContainer();

        tinymce.DOM.setStyle(this.contentAreaContainer, 'position', 'relative');

        attrs = {style: {position: 'absolute', top:'5px', left:0, color: '#888', padding: '1%', width:'98%', overflow: 'hidden'} };
        this.el = tinymce.DOM.add( this.contentAreaContainer, "label", attrs, this.text );
    }

    Label.prototype.hide = function(){
        tinymce.DOM.setStyle( this.el, 'display', 'none' );
    };

    Label.prototype.show = function(){
        tinymce.DOM.setStyle( this.el, 'display', '' );   
    };
});