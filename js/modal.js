import '../../css/white/modal.css';
class Modal {
    constructor({_confirm = true, timeout = false, hideFn = '', _bottom = true, content, _confirmFn = '', contentEventCb = '', lang}) {
        this.contentEventCb = contentEventCb;
        this._confirmFn = _confirmFn;
        this.content = content;
        this._confirm = _confirm;
        this.timeout = timeout;
        this.lang = lang;
        this._bottom = _bottom;
        this.hideFn = hideFn;
        this.timer = null;
        this.init();
    }

    init() {
        let _this = this,
            tpl = `<div class="oas_froum_alert">
                        <div class="oas_froum_alert_header clearfix">
                            <h3>${this.lang.title}</h3>
                            <span class="oas_froum_alert_close"></span>
                        </div>
                        ${this.content}
                        <div class="oas_forum_alert_bottom clearfix">
                            <span class="oas_froum_alert_no fr">${this.lang.cancle}</span>
                        </div>
                    </div>
                    <div class="oas_froum_alert_mask"></div>`;

        $(tpl).appendTo($('body'));

        this._confirm && $(`<span class="oas_froum_alert_ok fr">${this.lang.confirm}</span>`).prependTo($('.oas_forum_alert_bottom'));

        !this._bottom && $('.oas_forum_alert_bottom').addClass('hide');

        this.bindEvent();

        if (this.timeout) {
            this.timer = setTimeout(function () {
                _this.close && _this.close();
            }, 3000);
        }

        this.contentEventCb && this.contentEventCb(this);
    }

    close() {
        $('.oas_froum_alert').remove();
        $('.oas_froum_alert_mask').remove();
        clearTimeout(this.timer);
        this.hideFn && this.hideFn();
    }

    bindEvent() {
        let _this = this;

        //关闭
        $('.oas_froum_alert_close').click(function () {
            _this.close();
        });

        $('.oas_froum_alert_no').click(function () {
            _this.close();
        });

        //提交
        $('.oas_froum_alert_ok').click(function () {
            $('.oas_froum_alert').remove();
            $('.oas_froum_alert_mask').remove();
            _this._confirmFn && _this._confirmFn();
        });
    }
}
const modal = (content)=>new Modal(content);
export {modal};
