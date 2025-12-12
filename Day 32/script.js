//  // Translations
//         const translations = {
//             en: {
//                 formTitle: "Let's Connect",
//                 formSubtitle: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
//                 nameLabel: "Full Name",
//                 emailLabel: "Email Address",
//                 companyLabel: "Company",
//                 subjectLabel: "Subject",
//                 messageLabel: "Message",
//                 submitText: "Send Message",
//                 selectOption: "-- Please select --",
//                 generalOption: "General Inquiry",
//                 supportOption: "Support",
//                 partnershipOption: "Partnership",
//                 feedbackOption: "Feedback",
//                 privacyLabel: 'I agree to the <a href="#" target="_blank">Privacy Policy</a> and <a href="#" target="_blank">Terms of Service</a>',
//                 messagePlaceholder: "Tell us more about your inquiry...",
//                 successMessage: "✅ Thank you! Your message has been sent successfully. We'll get back to you soon.",
//                 errorMessage: "❌ Sorry, there was an error sending your message. Please try again.",
//                 namePlaceholder: "Enter your full name",
//                 emailPlaceholder: "your.email@example.com",
//                 companyPlaceholder: "Your company name"
//             },
//             es: {
//                 formTitle: "Conectemos",
//                 formSubtitle: "Nos encantaría saber de ti. Envíanos un mensaje y te responderemos lo antes posible.",
//                 nameLabel: "Nombre Completo",
//                 emailLabel: "Dirección de Correo",
//                 companyLabel: "Empresa",
//                 subjectLabel: "Asunto",
//                 messageLabel: "Mensaje",
//                 submitText: "Enviar Mensaje",
//                 selectOption: "-- Por favor selecciona --",
//                 generalOption: "Consulta General",
//                 supportOption: "Soporte",
//                 partnershipOption: "Colaboración",
//                 feedbackOption: "Comentarios",
//                 privacyLabel: 'Acepto la <a href="#" target="_blank">Política de Privacidad</a> y los <a href="#" target="_blank">Términos de Servicio</a>',
//                 messagePlaceholder: "Cuéntanos más sobre tu consulta...",
//                 successMessage: "✅ ¡Gracias! Tu mensaje ha sido enviado con éxito. Te responderemos pronto.",
//                 errorMessage: "❌ Lo siento, hubo un error al enviar tu mensaje. Por favor intenta de nuevo.",
//                 namePlaceholder: "Ingresa tu nombre completo",
//                 emailPlaceholder: "tu.email@ejemplo.com",
//                 companyPlaceholder: "Nombre de tu empresa"
//             },
//             de: {
//                 formTitle: "Lass uns verbinden",
//                 formSubtitle: "Wir würden gerne von Ihnen hören. Senden Sie uns eine Nachricht und wir antworten so schnell wie möglich.",
//                 nameLabel: "Vollständiger Name",
//                 emailLabel: "E-Mail-Adresse",
//                 companyLabel: "Unternehmen",
//                 subjectLabel: "Betreff",
//                 messageLabel: "Nachricht",
//                 submitText: "Nachricht Senden",
//                 selectOption: "-- Bitte auswählen --",
//                 generalOption: "Allgemeine Anfrage",
//                 supportOption: "Support",
//                 partnershipOption: "Partnerschaft",
//                 feedbackOption: "Feedback",
//                 privacyLabel: 'Ich stimme der <a href="#" target="_blank">Datenschutzrichtlinie</a> und den <a href="#" target="_blank">Nutzungsbedingungen</a> zu',
//                 messagePlaceholder: "Erzählen Sie uns mehr über Ihre Anfrage...",
//                 successMessage: "✅ Danke! Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns bald bei Ihnen.",
//                 errorMessage: "❌ Entschuldigung, beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
//                 namePlaceholder: "Geben Sie Ihren vollständigen Namen ein",
//                 emailPlaceholder: "ihre.email@beispiel.com",
//                 companyPlaceholder: "Name Ihres Unternehmens"
//             }
//         };

//         // Language switching functionality
//         const languageSelect = document.getElementById('languageSelect');
//         const elements = {
//             formTitle: document.getElementById('formTitle'),
//             formSubtitle: document.getElementById('formSubtitle'),
//             nameLabel: document.getElementById('nameLabel'),
//             emailLabel: document.getElementById('emailLabel'),
//             companyLabel: document.getElementById('companyLabel'),
//             subjectLabel: document.getElementById('subjectLabel'),
//             messageLabel: document.getElementById('messageLabel'),
//             submitText: document.getElementById('submitText'),
//             selectOption: document.getElementById('selectOption'),
//             generalOption: document.getElementById('generalOption'),
//             supportOption: document.getElementById('supportOption'),
//             partnershipOption: document.getElementById('partnershipOption'),
//             feedbackOption: document.getElementById('feedbackOption'),
//             privacyLabel: document.getElementById('privacyLabel'),
//             message: document.getElementById('message'),
//             namePlaceholder: document.getElementById('namePlaceholder'),
//             emailPlaceholder: document.getElementById('emailPlaceholder'),
//             companyPlaceholder: document.getElementById('companyPlaceholder')
//         };

//         function updateLanguage(lang) {
//             const trans = translations[lang];
            
//             // Update text content
//             Object.keys(trans).forEach(key => {
//                 if (elements[key]) {
//                     if (key === 'privacyLabel') {
//                         elements[key].innerHTML = trans[key] + '<span class="required">*</span>';
//                     } else if (key === 'message') {
//                         elements[key].placeholder = trans.messagePlaceholder;
//                     } else if (key.includes('Placeholder')) {
//                         elements[key].textContent = trans[key];
//                     } else {
//                         elements[key].textContent = trans[key];
//                     }
//                 }
//             });

//             // Update required asterisks for labels
//             ['nameLabel', 'emailLabel', 'subjectLabel', 'messageLabel'].forEach(labelKey => {
//                 if (elements[labelKey]) {
//                     elements[labelKey].innerHTML = trans[labelKey] + '<span class="required">*</span>';
//                 }
//             });
//         }

//         languageSelect.addEventListener('change', (e) => {
//             updateLanguage(e.target.value);
//         });

//         // Character count for textarea
//         const messageTextarea = document.getElementById('message');
//         const charCount = document.getElementById('charCount');
//         const maxChars = 500;

//         messageTextarea.addEventListener('input', function() {
//             const currentLength = this.value.length;
//             charCount.textContent = `${currentLength}/${maxChars}`;
            
//             // Update styling based on character count
//             charCount.classList.remove('warning', 'error');
//             if (currentLength > maxChars * 0.8) {
//                 charCount.classList.add('warning');
//             }
//             if (currentLength >= maxChars) {
//                 charCount.classList.add('error');
//             }
//         });

//         // Dynamic placeholder rotation
//         const placeholderRotations = {
//             en: {
//                 namePlaceholder: [
//                     'Enter your full name',
//                     'First and last name',
//                     'What should we call you?'
//                 ],
//                 emailPlaceholder: [
//                     'your.email@example.com',
//                     'name@company.com',
//                     'hello@yoursite.com'
//                 ],
//                 companyPlaceholder: [
//                     'Your company name',
//                     'Organization or business',
//                     'Where do you work?'
//                 ]
//             },
//             es: {
//                 namePlaceholder: [
//                     'Ingresa tu nombre completo',
//                     'Nombre y apellido',
//                     'Como te llamamos?'
//                 ],
//                 emailPlaceholder: [
//                     'tu.email@ejemplo.com',
//                     'nombre@empresa.com',
//                     'hola@tusite.com'
//                 ],
//                 companyPlaceholder: [
//                     'Nombre de tu empresa',
//                     'Organizacion o negocio',
//                     'Donde trabajas?'
//                 ]
//             },
//             de: {
//                 namePlaceholder: [
//                     'Geben Sie Ihren vollstandigen Namen ein',
//                     'Vor- und Nachname',
//                     'Wie sollen wir Sie nennen?'
//                 ],
//                 emailPlaceholder: [
//                     'ihre.email@beispiel.com',
//                     'name@firma.com',
//                     'hallo@ihreseite.com'
//                 ],
//                 companyPlaceholder: [
//                     'Name Ihres Unternehmens',
//                     'Organisation oder Geschaft',
//                     'Wo arbeiten Sie?'
//                 ]
//             }
//         };

//         function rotatePlaceholders() {
//             const currentLang = languageSelect.value;
//             const rotations = placeholderRotations[currentLang];
            
//             Object.keys(rotations).forEach(key => {
//                 const element = document.getElementById(key);
//                 const input = element.parentElement.querySelector('input');
                
//                 if (!input.matches(':focus') && input.value === '') {
//                     const options = rotations[key];
//                     const currentIndex = options.indexOf(element.textContent);
//                     const nextIndex = (currentIndex + 1) % options.length;
                    
//                     element.style.opacity = '0';
//                     setTimeout(() => {
//                         element.textContent = options[nextIndex];
//                         element.style.opacity = '1';
//                     }, 300);
//                 }
//             });
//         }

//         // Rotate placeholders every 4 seconds
//         setInterval(rotatePlaceholders, 4000);uillez sélectionner --",
//                 generalOption: "Demande Générale",
//                 supportOption: "Support",
//                 partnershipOption: "Partenariat",
//                 feedbackOption: "Commentaires",
//                 privacyLabel: 'J\'accepte la <a href="#" target="_blank">Politique de Confidentialité</a> et les <a href="#" target="_blank">Conditions de Service</a>',
//                 messagePlaceholder: "Parlez-nous de votre demande...",
//                 successMessage: "✅ Merci ! Votre message a été envoyé avec succès. Nous vous répondrons bientôt.",
//                 errorMessage: "❌ Désolé, il y a eu une erreur lors de l'envoi de votre message. Veuillez réessayer."
//             },
//             de: {
//                 formTitle: "Lass uns verbinden",
//                 formSubtitle: "Wir würden gerne von Ihnen hören. Senden Sie uns eine Nachricht und wir antworten so schnell wie möglich.",
//                 nameLabel: "Vollständiger Name",
//                 emailLabel: "E-Mail-Adresse",
//                 companyLabel: "Unternehmen",
//                 subjectLabel: "Betreff",
//                 messageLabel: "Nachricht",
//                 submitText: "Nachricht Senden",
//                 selectOption: "-- Bitte auswählen --",
//                 generalOption: "Allgemeine Anfrage",
//                 supportOption: "Support",
//                 partnershipOption: "Partnerschaft",
//                 feedbackOption: "Feedback",
//                 privacyLabel: 'Ich stimme der <a href="#" target="_blank">Datenschutzrichtlinie</a> und den <a href="#" target="_blank">Nutzungsbedingungen</a> zu',
//                 messagePlaceholder: "Erzählen Sie uns mehr über Ihre Anfrage...",
//                 successMessage: "✅ Danke! Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns bald bei Ihnen.",
//                 errorMessage: "❌ Entschuldigung, beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut."
//             },
//             pt: {
//                 formTitle: "Vamos nos Conectar",
//                 formSubtitle: "Adoraríamos ouvir de você. Envie-nos uma mensagem e responderemos o mais rápido possível.",
//                 nameLabel: "Nome Completo",
//                 emailLabel: "Endereço de E-mail",
//                 companyLabel: "Empresa",
//                 subjectLabel: "Assunto",
//                 messageLabel: "Mensagem",
//                 submitText: "Enviar Mensagem",
//                 selectOption: "-- Por favor selecione --",
//                 generalOption: "Consulta Geral",
//                 supportOption: "Suporte",
//                 partnershipOption: "Parceria",
//                 feedbackOption: "Feedback",
//                 privacyLabel: 'Concordo com a <a href="#" target="_blank">Política de Privacidade</a> e os <a href="#" target="_blank">Termos de Serviço</a>',
//                 messagePlaceholder: "Conte-nos mais sobre sua consulta...",
//                 successMessage: "✅ Obrigado! Sua mensagem foi enviada com sucesso. Responderemos em breve.",
//                 errorMessage: "❌ Desculpe, houve um erro ao enviar sua mensagem. Tente novamente."
//             }
//         };

//         // Language switching functionality
//         const languageSelect = document.getElementById('languageSelect');
//         const elements = {
//             formTitle: document.getElementById('formTitle'),
//             formSubtitle: document.getElementById('formSubtitle'),
//             nameLabel: document.getElementById('nameLabel'),
//             emailLabel: document.getElementById('emailLabel'),
//             companyLabel: document.getElementById('companyLabel'),
//             subjectLabel: document.getElementById('subjectLabel'),
//             messageLabel: document.getElementById('messageLabel'),
//             submitText: document.getElementById('submitText'),
//             selectOption: document.getElementById('selectOption'),
//             generalOption: document.getElementById('generalOption'),
//             supportOption: document.getElementById('supportOption'),
//             partnershipOption: document.getElementById('partnershipOption'),
//             feedbackOption: document.getElementById('feedbackOption'),
//             privacyLabel: document.getElementById('privacyLabel'),
//             message: document.getElementById('message')
//         };

//         function updateLanguage(lang) {
//             const trans = translations[lang];
            
//             // Update text content
//             Object.keys(trans).forEach(key => {
//                 if (elements[key]) {
//                     if (key === 'privacyLabel') {
//                         elements[key].innerHTML = trans[key] + '<span class="required">*</span>';
//                     } else if (key === 'message') {
//                         elements[key].placeholder = trans.messagePlaceholder;
//                     } else {
//                         elements[key].textContent = trans[key];
//                     }
//                 }
//             });

//             // Update required asterisks for labels
//             ['nameLabel', 'emailLabel', 'subjectLabel', 'messageLabel'].forEach(labelKey => {
//                 if (elements[labelKey]) {
//                     elements[labelKey].innerHTML = trans[labelKey] + '<span class="required">*</span>';
//                 }
//             });
//         }

//         languageSelect.addEventListener('change', (e) => {
//             updateLanguage(e.target.value);
//         });

//         // Form submission
//         const form = document.getElementById('contactForm');
//         const submitBtn = form.querySelector('.submit-btn');
//         const successMessage = document.getElementById('successMessage');
//         const errorMessage = document.getElementById('errorMessage');

//         form.addEventListener('submit', async (e) => {
//             e.preventDefault();
            
//             // Clear previous messages
//             successMessage.classList.remove('show');
//             errorMessage.classList.remove('show');
            
//             // Add loading state
//             submitBtn.classList.add('loading');
            
//             // Simulate form submission
//             try {
//                 await new Promise(resolve => setTimeout(resolve, 2000));
                
//                 // Get current language for success message
//                 const currentLang = languageSelect.value;
//                 successMessage.textContent = translations[currentLang].successMessage;
//                 successMessage.classList.add('show');
                
//                 // Reset form
//                 form.reset();
//                 charCount.textContent = '0/500'; // Reset character count
//             } catch (error) {
//                 const currentLang = languageSelect.value;
//                 errorMessage.textContent = translations[currentLang].errorMessage;
//                 errorMessage.classList.add('show');
//             } finally {
//                 submitBtn.classList.remove('loading');
//             }
//         });

//         // Form validation enhancements
//         const inputs = form.querySelectorAll('input, textarea, select');
//         inputs.forEach(input => {
//             input.addEventListener('blur', validateField);
//             input.addEventListener('input', clearFieldError);
//         });

//         function validateField(e) {
//             const field = e.target;
//             const value = field.value.trim();
            
//             // Remove existing error styling
//             field.style.borderColor = '';
            
//             if (field.hasAttribute('required') && !value) {
//                 field.style.borderColor = 'var(--error)';
//                 return false;
//             }
            
//             if (field.type === 'email' && value) {
//                 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//                 if (!emailRegex.test(value)) {
//                     field.style.borderColor = 'var(--error)';
//                     return false;
//                 }
//             }
            
//             return true;
//         }

//         function clearFieldError(e) {
//             const field = e.target;
//             if (field.style.borderColor === 'var(--error)') {
//                 field.style.borderColor = '';
//             }
//         }

//         // Initialize with default language
//         updateLanguage('en');