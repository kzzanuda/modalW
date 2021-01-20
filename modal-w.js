// custom modal by k_zzanuda 1.0
//___________________________________
//  *********************************
//  *** Modal-W V1.0 by k_zzanuda ***
//  *********************************
//-----------------------------------
window.$ = window.jQuery = require('jquery');

'use strict';

let defaultConfig = {
  speed: 300,
  title: 'Модальное окно',
  body: false,
  buttonSubmit: 'OK',
  buttonCancel: 'Отмена',
  onSubmit: true,
  onCancel: false,
  width: 'normal',
  type: 'normal',
};

class modalW2 {
  constructor( conf ) {
    this.newWindow = $('#modal').clone().addClass('newModal');
    $('body').append(this.newWindow);
    conf.width ? this.width = conf.width : this.width = defaultConfig.width;
    conf.speed ? this.speed = conf.speed : this.speed = defaultConfig.speed;
    conf.title ? this.title = conf.title : this.title = defaultConfig.title;
    conf.body ? this.body = conf.body : this.body = defaultConfig.body;
    conf.type ? this.type = conf.type : this.type = defaultConfig.type;
    conf.buttonSubmit ? this.buttonSubmit = conf.buttonSubmit : this.buttonSubmit = defaultConfig.buttonSubmit;
    conf.buttonCancel ? this.buttonCancel = conf.buttonCancel : this.buttonCancel = defaultConfig.buttonCancel;
    conf.onSubmit ? this.onSubmit = conf.onSubmit : this.onSubmit = defaultConfig.onSubmit;
    conf.onCancel ? this.onCancel = conf.onCancel : this.onCancel = defaultConfig.onCancel;
    this.bodyModal = this.newWindow.find('.modal-body');
  }

  drawWindow() {
    this.newWindow.find('#modalLabel').text(this.title);
    this.body ? this.bodyModal.html(this.body) : this.bodyModal.hide();
    if (this.width == 'large') {
      this.newWindow.find('.modal-dialog').addClass('modal-lg');
    } else if (this.width == 'small') {
      this.newWindow.find('.modal-dialog').addClass('modal-sm');
    } else if (this.width == 'xl') {
      this.newWindow.find('.modal-dialog').addClass('modal-xl');
    } else if (typeof(this.width) == "number") {
      this.newWindow.find('.modal-dialog').css('width',this.width);
    }
    this.newWindow.find('.modal-dialog');
    this.newWindow.find('[data-confirm~="modal"]').text(this.buttonSubmit);
    this.newWindow.find('button.btn.btn-secondary[data-dismiss~="modal"]').text(this.buttonCancel);

    if (this.type == 'alert') {
      this.newWindow.find('[data-confirm~="modal"]').hide();
    }

    if (this.onSubmit !== true) {
      this.newWindow.find('[data-confirm~="modal"]').click(() => {
        this.onSubmit();
      });
    };

    if (this.onCancel !== false) {
      this.newWindow.find('[data-dismiss~="modal"]').click(() => {
        this.onCancel();
      });
    } else {
      this.newWindow.find('[data-dismiss~="modal"]').click(() => {
        this.close();
      });
    }
  }

  show() {
    this.drawWindow();
    this.newWindow.fadeIn(this.speed);
  }

  open() {
    this.newWindow.length ? 1 : $('body').append(this.newWindow);
    this.show();
  }

  hide() {
    this.newWindow.fadeOut(this.speed);
  }

  close() {
    this.newWindow.fadeOut(this.speed, () => this.remove());
  }

  remove() {
    this.newWindow.remove();
  }

  addButtonCrop() {
    this.newWindow.find('.modal-footer').prepend('<input class="btn btn-primary" style="font-size:1.4rem;" type="button" id="btnCrop" value="Обрезать фото" />');
  }
};

$('[data-modal~="confirm"]').click(function() {
  let confirmModal = new modalW2({
    title: 'Вы уверены?',
    body: false,
    buttonSubmit: 'Да',
  });
  confirmModal.show();
});

export default modalW2;
