// Braspack — envia os formulários (Contato, Telescópica-RPE, Suporte)
// para a planilha Google Sheets via Google Apps Script Web App.
(function () {
  // Preencha com a URL do "App da Web" gerada no Apps Script (termina em /exec).
  var ENDPOINT_URL = '';

  document.addEventListener('DOMContentLoaded', function () {
    var forms = document.querySelectorAll('form[data-sheet]');

    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!ENDPOINT_URL) {
          showStatus(form, 'error', 'Envio ainda não configurado. Fale com a equipe pelo WhatsApp.');
          return;
        }

        var button = form.querySelector('button[type="submit"]');
        var originalText = button ? button.textContent : '';
        if (button) {
          button.disabled = true;
          button.textContent = 'Enviando...';
        }

        var params = new URLSearchParams();
        params.append('sheetName', form.getAttribute('data-sheet'));
        new FormData(form).forEach(function (value, key) {
          params.append(key, value);
        });

        fetch(ENDPOINT_URL, {
          method: 'POST',
          body: params
        })
          .then(function (res) { return res.json(); })
          .then(function (data) {
            if (data && data.ok) {
              showStatus(form, 'success', 'Recebemos sua solicitação! Nossa equipe entra em contato em breve.');
              form.reset();
            } else {
              showStatus(form, 'error', 'Não deu para enviar agora. Tente novamente ou fale pelo WhatsApp.');
            }
          })
          .catch(function () {
            showStatus(form, 'error', 'Não deu para enviar agora. Tente novamente ou fale pelo WhatsApp.');
          })
          .finally(function () {
            if (button) {
              button.disabled = false;
              button.textContent = originalText;
            }
          });
      });
    });
  });

  function showStatus(form, type, message) {
    var el = form.querySelector('.form-status');
    if (!el) {
      el = document.createElement('p');
      el.className = 'form-status';
      var note = form.querySelector('.form-note');
      if (note) {
        note.parentNode.insertBefore(el, note);
      } else {
        form.appendChild(el);
      }
    }
    el.textContent = message;
    el.classList.remove('success', 'error');
    el.classList.add(type);
  }
})();
