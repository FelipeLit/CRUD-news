//================================================ CATEGORIAS =======================================

//============= OBTENER ID DEL MODAL PARA AGREGAR NUEVA CATEGORIA ==================
let nameCategory = document.getElementById('nameCategory');
let descriptionCategory = document.getElementById('descriptionCategory');
let saveChanges = document.getElementById('saveChanges');
let categoriasTbody = document.getElementById('categoriasNews');

//============ CREAR UNA NUEVA CATEGORIA ==========

saveChanges.addEventListener('click', ()=> {

    let data = {    
        name: nameCategory.value,
        description: descriptionCategory.value
    }

    fetch('http://localhost:3000/categories', {
        method : "POST",
        body: JSON.stringify(data),
        headers : {'Content-type': 'application/json'}
    })
    .then ((response)=> response.json())
    .then ((data)=>{window.location.reload()})
    
})

//========== MOSTRAR LA LISTA DE CATEGORIAS ================

fetch('http://localhost:3000/categories')
    .then((r)=>r.json())
    .then((data)=>{
        data.forEach(element => {
            let row = document.createElement('tr')

            let idCategory = document.createElement('td');
            idCategory.innerHTML = element.id
            row.appendChild(idCategory)

            let nameCategory = document.createElement('td')
            nameCategory.innerHTML=element.name
            row.appendChild(nameCategory)

            let description = document.createElement('td')
            description.innerHTML = element.description
            row.appendChild(description)

            let btnEdit = document.createElement('button');
            btnEdit.innerText = 'Edit'
            btnEdit.classList.add('btn')
            btnEdit.classList.add('me-3', 'mt-2', 'mb-2')
            btnEdit.classList.add('btn-primary')
            btnEdit.setAttribute('id','btnEdit')
            btnEdit.setAttribute('data-bs-toggle','modal')
            btnEdit.setAttribute('data-bs-target','#modalEditCategory')
            btnEdit.setAttribute('onclick', `loadDataUser('${element.id}')`)
            row.appendChild(btnEdit)

            let btnDelete = document.createElement('button');
            btnDelete.innerText = 'Delete'
            btnDelete.classList.add('btn')
            btnDelete.classList.add('me-3', 'mt-2','mb-2')          
            btnDelete.classList.add('btn-danger')
            btnDelete.setAttribute('data-bs-toggle','modal')
            btnDelete.setAttribute('data-bs-target','#modalDeleteCategory')
            btnDelete.setAttribute('onclick', `openModalDeleteCategory('${element.id}')`)
            row.appendChild(btnDelete)

            categoriasTbody.appendChild(row) 
        });
    })//IFN THEN DE LISTAR CATEGOARIAS

//================= EDITAR CATEGORIAS =============
let btnEdit = document.getElementById('btnEdit');
let categoryId = document.getElementById('categoryId')
let editNameCategory = document.getElementById('editCategory')
let editDescription = document.getElementById('editDescription')

//CARGAR DATA A LOS INPUTS QUE SE VAN A ACTUALIZAR
function loadDataUser (iduser){
    console.log(iduser);
    fetch(`http://localhost:3000/categories/${iduser}`)

    .then((r)=>r.json())
    .then((data)=>{
        categoryId.value = data.id
        editNameCategory.value = data.name
        editDescription.value = data.description
    })
}

//==========EDIT DATA OF CATEGORIES============
let editChanges = document.getElementById('editChanges');

editChanges.addEventListener('click', function editCategories (){
    let id = categoryId.value

    let updateData = {
        name : editNameCategory.value,
        description: editDescription.value
    }

    fetch(`http://localhost:3000/categories/${id}`,{
        method : "PUT",
        body : JSON.stringify(updateData),
        headers : {'Content-type': 'application/json'}
    })
    .then((r)=>r.json())
    .then((data)=>{window.location.reload()})
})

//===================== DELETE CATEGORIES =====================

let btnDelete = document.getElementById('btnDelete') 
let bodyDeleteCategory = document.getElementById('bodyDeleteCategory')


function openModalDeleteCategory (idCategory){
    fetch(`http://localhost:3000/categories/${idCategory}`)
    .then ((r)=>r.json())
    .then ((data)=>{
        bodyDeleteCategory.innerHTML =`<p>Are you sure Delete the category with id: ${data.id}`;
        localStorage.setItem('idCategory', data.id)
    })
}

btnDelete.addEventListener('click', ()=>{

    fetch(`http://localhost:3000/categories/${localStorage.getItem('idCategory')}`,{
        method: "DELETE",
        headers : {'Content-type': 'application/json'}
        })
    .then((r)=>r.json())
    .then ((data)=>{ window.location.reload()

    })
}) 

//============================= ADD NEW NEWS ========================================
let nameNotice = document.getElementById('nameNotice')
let urlImage = document.getElementById('urlImage')
let selectCategory = document.getElementById('selectCategory') 
let contentNotice = document.getElementById('contentNotice')

let addNews = document.getElementById('addNews')

//obtener fecha
const fechaHoy = Date.now();
const hoy = new Date(fechaHoy);
hoy.toDateString();


//=============TRAER DATA DE CATEGORIAS PARA EL SELECT =============
fetch('http://localhost:3000/categories')
    .then ((r)=>r.json())
    .then((data)=>{
        data.forEach((category)=>{
            option = document.createElement('option')
            option.value = category.name
            option.innerText = category.name
            selectCategory.appendChild(option)
        })
    })

//================AGREGAR NOTICIA ALA BASE DE DATOS==================0
addNews.addEventListener('click', ()=>{

    let addNewNews = {
        name: nameNotice.value,
        url : urlImage.value,
        date: hoy.toDateString(),
        author: 'Administrador',
        category: selectCategory.value,
        content : contentNotice.value
    }
    fetch('http://localhost:3000/news',{
        method:"POST",
        body: JSON.stringify(addNewNews),
        headers:{'Content-type': 'application/json'}
    })
    .then((r)=>r.json())
    .then(d=>{console.log(addNewNews)})
})
//================MOSTRAR LA NOTICIA===============
let tableNews = document.getElementById('tableNews')
fetch('http://localhost:3000/news')
    .then (r=>r.json())
    .then((data)=>{
        data.forEach((element)=>{
            let row =document.createElement('tr')

            let imgCell = document.createElement('td')
            let img = document.createElement('img')
            img.classList.add('rounded-circle')
            img.setAttribute('src', element.url)
            img.setAttribute('height', '50')
            img.setAttribute('width', '50')
            imgCell.appendChild(img)
            row.appendChild(imgCell)

            let titleCell = document.createElement('td')
            titleCell.innerHTML = element.name
            row.appendChild(titleCell)

            let contentCell = document.createElement('td')
            contentCell.innerHTML = element.content
            row.appendChild(contentCell)

            let dateCell = document.createElement('td')
            dateCell.innerHTML= element.date
            row.appendChild(dateCell)

            let authorCell = document.createElement('td')
            authorCell.innerHTML=element.author
            row.appendChild(authorCell)

            let categoryCell = document.createElement('td')
            categoryCell.innerHTML = element.category
            row.appendChild(categoryCell)

            let btnEdit = document.createElement('button');
            btnEdit.innerText = 'Edit'
            btnEdit.classList.add('btn')
            btnEdit.classList.add('me-3', 'mt-2', 'mb-2')
            btnEdit.classList.add('btn-primary')
            row.appendChild(btnEdit)

            let btnDelete = document.createElement('button');
            btnDelete.innerText = 'Delete'
            btnDelete.classList.add('btn')
            btnDelete.classList.add('me-3', 'mt-2','mb-2')          
            btnDelete.classList.add('btn-danger')
            row.appendChild(btnDelete)


            tableNews.appendChild(row)
        })
    })

   


        