import { showContacts } from './show-contacts.js';
import { isValidName, isValidPhone, isValidEmail, showForm, closeForm, getFormInputs, alert } from './functions.js';

document.addEventListener('DOMContentLoaded', async () => {
   const form = document.querySelector('#form')
   const newContactBtn = document.querySelector('#new-contact-btn') // show the form
   const closeFormBtn = document.querySelector('#close-form')
   const contactList = document.querySelector('#contact-list')
   const nameError = document.querySelector('#name-error')
   const phoneError = document.querySelector('#phone-error')
   const emailError = document.querySelector('#email-error')
   // Si no es 'null', al ocurrir el submit event se ejecutará updateContact(contact, contactUpdateId),
   // si es null se ejecutará createContact(contact)
   let contactUpdateId = null

   showContacts();

   newContactBtn.addEventListener('click', () => {
      contactUpdateId = null
      form.reset()
      form.elements['submit'].value = 'Save contact'
      showForm()
   })

   closeFormBtn.addEventListener('click', closeForm)

   form.addEventListener('submit', async (evt) => {
      evt.preventDefault()

      const { name, phone, email } = getFormInputs(form)

      let errors = false
      // Hide errors before validating
      nameError.classList.add('hidden')
      phoneError.classList.add('hidden')
      emailError.classList.add('hidden')

      if (!isValidName(name)) {
         nameError.classList.remove('hidden')
         errors = true
      }
      if (!isValidPhone(phone)) {
         phoneError.classList.remove('hidden')
         errors = true
      }
      if (!isValidEmail(email)) {
         emailError.classList.remove('hidden')
         errors = true
      }

      if (!errors) {
         (contactUpdateId === null ? createContact({ name, phone, email })
                                    : updateContact({ name, phone, email }, contactUpdateId))
      }
   })

   contactList.addEventListener('click', async (evt) => {
      if (evt.target.classList.contains('delete-contact')) {
         deleteContact(evt.target.dataset.id)
      }
      else if (evt.target.classList.contains('update-contact')) {
         form.reset()
         contactUpdateId = evt.target.dataset.id
         const contact = await getById(contactUpdateId)

         if (contact) {
            form.elements['name'].value = contact.name
            form.elements['email'].value = contact.email
            form.elements['phone'].value = contact.phone
            form.elements['submit'].value = 'Save Changes'

            showForm()
         }
      }
   })

   /**
    * 
    * @param {Object} contact Request body
    */
   function createContact(contact) {
      console.log('Create contact function');

      const options = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(contact)
      }

      fetch('/api/contacts', options)
         .then(async res => {
            if (res.ok) {
               showContacts()
               closeForm()
               alert('success', 'Contact created successfully')
            }
            else
               console.log((await res.json()).message);
         })
         .catch(err => console.error(err))
   }

   async function deleteContact(contactId) {
      try {
         const res = await fetch(`/api/contacts/${contactId}`, {
            method: 'DELETE'
         })
         console.log(res);
         if (res.ok)
            showContacts()
         else
            console.log((await res.json()).message);
      } catch (error) {
         console.log(error.message);
      }
   }

   /**
    * 
    * @param {Object} contact Request body
    * @param {number} contactId Contact id to update
    */
   async function updateContact(contact, contactId) {
      console.log('Contact update function');
      try {
         const res = await fetch(`/api/contacts/${contactId}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact)
         })

         if (res.ok) {
            showContacts()
            closeForm()
            alert('success', 'Contact updated successfully')
         }
      } catch (error) {
         console.log(error.message);
      }
   }

   async function getById(id) {
      try {
         const res = await fetch(`/api/contacts/${id}`)
         const data = await res.json()

         if (!res.ok) {
            console.log(data?.message);
            return null;
         }

         return data
      } catch (error) {
         console.log(error.message);
      }
   }

});
