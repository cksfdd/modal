class Modal {
    constructor({_confirm=true, timeout=false, _confirmFn, lang}) {
        this._confirmFn = _confirmFn;
        this._confirm = _confirm;
        this.timeout = timeout;
        this.lang = lang;
        this.init();
    }

    init() {
        let tpl = `<div class="oas_froum_alert">
                        <div class="oas_froum_alert_header">
                            <h3>${this.lang.title}</h3>
                            <span class="oas_froum_alert_close">x</span>
                        </div>
                        <p class="oas_froum_alert_content">${this.lang.content}</p>
                        <div class="oas_forum_alert_confirm">
                            <span class="oas_froum_alert_no">${this.lang.cancle}</span>
                        </div>
                    </div>
                    <div class="oas_froum_alert_mask"></div>`;
        $(tpl).appendTo($('body'));

        if (this._confirm) {
            $(`<span class="oas_froum_alert_ok">${this.lang.confirm}</span>`).prependTo($('.oas_forum_alert_confirm'));
        }

        let _this = this;
        $('.oas_froum_alert_close').click(function () {
            _this.close();
        });

        $('.oas_froum_alert_ok').click(function () {
            _this._confirmFn();
        });

        $('.oas_froum_alert_no').click(function () {
            _this.close();
        });

        if (this.timeout) {
            setTimeout(function () {
                _this.close();
            }, 3000);
        }

    }

    close() {
        $('.oas_froum_alert').remove();
        $('.oas_froum_alert_mask').remove();
    }
}
/*const alert=(content)=>new Modal(content);
 export default alert;*/
