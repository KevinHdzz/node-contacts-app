const getContacts = async function () {
   const res = await fetch('/api/contacts')
   return await res.json()
}

export const showContacts = async function () {
   const contactList = document.querySelector('#contact-list')

   const contacts = await getContacts()
   // const contacts = []

   if (contacts.length === 0)
      return document.querySelector('#no-contacts').classList.remove('hidden')

   const allContacts = contacts.map(contact => {
      const { id, name, phone, email } = contact
      return `<div class="bg-zinc-800 py-5 px-10 mb-5 md:mb-0 rounded-md">
				     <h2 class="text-2xl font-bold text-center mb-6">${name}</h2>
				     <p class="text-center mb-6">${phone}</p>
				     <p class="text-center mb-6">${email}</p>
				     <div class="flex justify-around md:justify-around md:gap-4">
				     	<button type="button" data-id="${id}" class="update-contact bg-orange-500 py-2 px-5 rounded font-semibold">
				     		Update
				     	</button>
				     	<button type="button" data-id="${id}" class="delete-contact bg-red-600 py-2 px-5 rounded font-semibold">
				     		Delete
				     	</button>
				     </div>
			     </div> <!--end contact-->
            `
   }).join('')

   contactList.innerHTML = allContacts
}
