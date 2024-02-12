let mainNews = document.getElementById('mainNews')
fetch('http://localhost:3000/news')
    .then ((r)=>r.json())
    .then ((noticias)=>{
        noticias.forEach(noticia => {
            let card = document.createElement('div')
            card.classList.add('card', 'mb-3', 'me-3')
            card.setAttribute('style', 'max-width: 540px')

            let row = document.createElement('div')
            row.classList.add('row', 'g-0')
            card.appendChild(row)

            let columna = document.createElement('div')
            columna.classList.add('col-md-4')

            let img = document.createElement('img')
            img.setAttribute('src', noticia.url)
            img.classList.add('img-fluid', 'rounded-start')
            img.setAttribute('style', 'max-height: 100%')
            img.setAttribute('style', 'max-width: 100%')
            columna.appendChild(img)
            
            row.appendChild(columna)

            let columna2 = document.createElement('div')
            columna2.classList.add('col-md-8')
            
            let cardBody = document.createElement('div')
            cardBody.classList.add('card-body')
            columna2.appendChild(cardBody)

            let title = document.createElement('h5')
            title.classList.add('card-title')
            title.innerText = noticia.name
            cardBody.appendChild(title)
            
            let content = document.createElement('p')
            content.classList.add('card-text')
            content.innerText = noticia.content
            cardBody.appendChild(content)
            
            let date = document.createElement('p')
            date.classList.add('card-text')

            let fecha = document.createElement('small')
            fecha.innerText = noticia.date
            date.appendChild(fecha)
            cardBody.appendChild(date)
        

            row.appendChild(columna2)
            card.appendChild(row)

            mainNews.appendChild(card)
        });
    })

