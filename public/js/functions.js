const formModal = document.querySelector('#form-modal')

export const getFormInputs = form => {
   const fData = new FormData(form)
   const { name, phone, email } = Object.fromEntries(fData.entries())

   return {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
   }
}

export const isValidName = name => {
   return name.length > 0
}

export const isValidPhone = phone => {
   return phone.length >= 8 && phone.length <= 11
}

export const isValidEmail = email => {
   return new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      .test(email)
}

export const showForm = () => {
   formModal.classList.remove('hidden')
}

export const closeForm = () => {
   formModal.classList.add('hidden')
}

/**
 * 
 * @param {String} type Alert type ('success' or 'danger')
 * @param {String} message Alert message
 */
export const alert = (type, message) => {
   const div = document.createElement('div')
   const bg = type === 'danger' ? 'bg-red-600' : type === 'success' ? 'bg-green-600' : '';
   div.classList.add(bg, 'w-10/12', 'max-w-lg', 'mx-auto', 'mt-10', 'font-semibold', 'text-xl', 'py-3', 'text-center', 'rounded')
   div.textContent = message
   document.body.insertBefore(div, document.querySelector('#no-contacts'))
   
   setTimeout(() => div.remove(), 3000)
}
