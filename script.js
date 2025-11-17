// Robust verification script
document.addEventListener('DOMContentLoaded', () => {
   // Elements (fall back safely if missing)
   const captchaEl = document.querySelector('#captchacode');
      const inputEl = document.querySelector('#verification');
      const submitBtn = document.querySelector('#submitBtn') || document.querySelector('input[type="button"][value="Submit"]');

   // Create verify message area if not present
   let msgEl = document.querySelector('.verify-msg');
   if (!msgEl) {
      msgEl = document.createElement('div');
      msgEl.className = 'verify-msg';
      // place after captcha input (if exists) or at end of card
      const card = document.querySelector('.card');
      if (card) card.appendChild(msgEl);
      else document.body.appendChild(msgEl);
   }

   // If there's no captcha text, generate one
   if (!captchaEl) {
      const newCaptcha = document.createElement('div');
      newCaptcha.id = 'captchacode';
      newCaptcha.textContent = generateCaptcha();
      const card = document.querySelector('.card');
      if (card) card.insertBefore(newCaptcha, card.firstChild);
   }

   const getCaptchaText = () => (document.querySelector('#captchacode').textContent || '').trim();
   const getUserText = () => (inputEl && inputEl.value) ? inputEl.value.trim() : '';

   function showResult(text, success) {
      msgEl.textContent = text;
      msgEl.classList.remove('success', 'fail');
      msgEl.classList.add(success ? 'success' : 'fail');
   }

   if (submitBtn) {
      submitBtn.addEventListener('click', () => {
         const captcha = getCaptchaText();
         const user = getUserText();

         if (!user) {
            showResult('Please enter the verification code.', false);
            return;
         }

         if (captcha.toLowerCase() === user.toLowerCase()) {
            showResult('Verify Success', true);
            // optional: disable inputs
            if (inputEl) inputEl.disabled = true;
            submitBtn.disabled = true;
            // only redirect/open new tab on successful verification
            setTimeout(() => {
              window.open("https://www.google.com/", "_blank");
            }, 1200);
         } else {
            showResult('Verify Failed', false);
         }
      });
   }

   // small helper to generate simple captcha (5 chars alphanumeric)
   function generateCaptcha() {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      
      let s = '';
      for (let i = 0; i < 5; i++) s += chars.charAt(Math.floor(Math.random() * chars.length));
      return s;
   }
});

