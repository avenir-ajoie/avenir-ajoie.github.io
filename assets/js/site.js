// Mobile menu.
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu-button');
  const nav = document.querySelector('.mobile-nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      menu.textContent = open ? '✕' : '☰';
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          menu.setAttribute('aria-expanded', 'false');
          menu.setAttribute('aria-label', 'Ouvrir le menu');
          menu.textContent = '☰';
        }
      });
    });
  }

  // Demande d'adhésion (Contact page).
  const btnOpen = document.getElementById('btn-open-adhesion');
  const adhesionForm = document.getElementById('adhesion-form');
  const adhesionActions = document.getElementById('adhesion-actions');
  const btnCancel = document.getElementById('btn-cancel-adhesion');
  const dialog = document.getElementById('adhesion-dialog');
  const btnDismiss = document.getElementById('modal-dismiss-btn');
  const nameInput = document.getElementById('adhesion-name');
  const emailInput = document.getElementById('adhesion-email');
  const phoneInput = document.getElementById('adhesion-phone');
  const phoneRequiredIndicator = document.getElementById('adhesion-phone-required');
  const whatsappCheckbox = document.getElementById('adhesion-whatsapp');

  if (btnOpen && adhesionForm) {
    const updatePhoneRequirement = () => {
      const isRequired = Boolean(whatsappCheckbox && whatsappCheckbox.checked);
      if (phoneInput) {
        phoneInput.required = isRequired;
        if (isRequired) {
          phoneInput.setAttribute('aria-required', 'true');
        } else {
          phoneInput.removeAttribute('aria-required');
          phoneInput.setCustomValidity('');
        }
      }
      if (phoneRequiredIndicator) {
        phoneRequiredIndicator.style.display = isRequired ? 'inline' : 'none';
      }
    };

    const showForm = (shouldFocus = true) => {
      adhesionForm.style.display = 'block';
      if (adhesionActions) adhesionActions.style.display = 'none';
      btnOpen.setAttribute('aria-expanded', 'true');
      if (shouldFocus && nameInput) {
        nameInput.focus();
      }
    };

    const hideForm = () => {
      adhesionForm.reset();
      updatePhoneRequirement();
      adhesionForm.style.display = 'none';
      if (adhesionActions) adhesionActions.style.display = '';
      btnOpen.setAttribute('aria-expanded', 'false');
    };

    if (whatsappCheckbox) {
      whatsappCheckbox.addEventListener('change', () => {
        updatePhoneRequirement();
        if (whatsappCheckbox.checked && phoneInput && !phoneInput.value.trim()) {
          phoneInput.focus();
        }
      });
    }

    if (phoneInput) {
      phoneInput.addEventListener('input', () => {
        if (phoneInput.value.trim()) {
          phoneInput.setCustomValidity('');
        }
      });
    }

    adhesionForm.addEventListener('reset', () => {
      setTimeout(updatePhoneRequirement, 0);
    });

    const checkHashAndOpen = (shouldFocus = false) => {
      if (window.location.hash === '#adhesion' || window.location.hash === '#adhesion-form') {
        showForm(shouldFocus);
        const targetElement = document.getElementById('adhesion');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // If loaded directly with #adhesion hash (e.g. following header link from another page).
    checkHashAndOpen(false);

    // If hash changes in the URL.
    window.addEventListener('hashchange', () => {
      checkHashAndOpen(true);
    });

    // If clicking any link targeting #adhesion (e.g. "Nous rejoindre" button in header).
    document.querySelectorAll('a[href*="#adhesion"]').forEach((link) => {
      link.addEventListener('click', () => {
        showForm(true);
        const targetElement = document.getElementById('adhesion');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    btnOpen.addEventListener('click', () => {
      showForm(true);
    });

    if (btnCancel) {
      btnCancel.addEventListener('click', () => {
        hideForm();
        btnOpen.focus();
      });
    }

    adhesionForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (whatsappCheckbox && whatsappCheckbox.checked && phoneInput && !phoneInput.value.trim()) {
        phoneInput.setCustomValidity('Veuillez renseigner votre numéro de téléphone.');
      } else if (phoneInput) {
        phoneInput.setCustomValidity('');
      }

      if (!adhesionForm.checkValidity()) {
        adhesionForm.reportValidity();
        return;
      }

      const name = (nameInput ? nameInput.value : '').trim();
      const email = (emailInput ? emailInput.value : '').trim();
      const phone = (phoneInput ? phoneInput.value : '').trim();
      const whatsapp = Boolean(whatsappCheckbox && whatsappCheckbox.checked);
      const recipient = adhesionForm.dataset.recipient || 'info@avenir-ajoie.ch';

      const subject = `Demande d'adhésion à Avenir Ajoie - ${name}`;
      const body = `Bonjour,

Je souhaite adhérer à l'association Avenir Ajoie.

Nom : ${name}
Adresse e-mail : ${email}
Numéro de téléphone : ${phone || 'Non renseigné'}
Groupe WhatsApp : ${whatsapp ? 'Oui' : 'Non'}

Message :
Je vous prie de bien vouloir prendre en compte ma demande d'adhésion.

Cordialement,
${name}`;

      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.replace(/\r?\n/g, '\r\n'))}`;

      const fallbackLink = document.getElementById('adhesion-mailto-fallback');
      if (fallbackLink) {
        fallbackLink.href = mailtoUrl;
      }

      // Trigger mail client.
      window.location.href = mailtoUrl;

      // Show popup dialog.
      if (dialog) {
        if (typeof dialog.showModal === 'function') {
          dialog.showModal();
        } else {
          dialog.setAttribute('open', '');
        }
      }
    });

    const closeDialog = () => {
      if (dialog) {
        if (typeof dialog.close === 'function') {
          dialog.close();
        } else {
          dialog.removeAttribute('open');
        }
      }
      hideForm();
    };

    if (btnDismiss) {
      btnDismiss.addEventListener('click', closeDialog);
    }

    if (dialog) {
      dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
          closeDialog();
        }
      });
      dialog.addEventListener('close', () => {
        hideForm();
      });
    }

    updatePhoneRequirement();
  }
});
