const ramenMenu = document.getElementById('ramen-menu')
const baseUrl = 'http://localhost:3000/ramens'
const ramenDetail = document.getElementById('ramen-detail')
const ramenName = document.getElementsByClassName('name')[0]
const ramenRestaurant = document.getElementsByClassName('restaurant')[0]
const ramenRating = document.getElementById('rating-display')
const ramenComment = document.getElementById('comment-display')
const ramenDetailImg = document.getElementsByClassName('detail-image')[0]
const ramenForm = document.getElementById('new-ramen')
const editForm = document.getElementById('edit-ramen')

const addRamenToMenu = (ramen) => {
  const ramenImg = document.createElement('img')
  ramenImg.src = ramen.image
  
  ramenImg.addEventListener('click', () => {
      ramenName.textContent = ramen.name
      ramenRestaurant.textContent = ramen.restaurant
      ramenComment.textContent = ramen.comment
      ramenRating.textContent = ramen.rating
      ramenDetailImg.src = ramen.image
      
      
    })
  ramenMenu.append(ramenImg)

}


const getRamen = () => {
  fetch(baseUrl).then((response)=> {
    return response.json()
  }) .then(ramens => {
    ramens.forEach((ramen) => {
      addRamenToMenu(ramen)
      

    })
  })
}
getRamen()


const postRamen = (newRamenObj) => {
  fetch(baseUrl, {
    method: 'POST',
    headers: {
        'content-type' : 'application/json',
        'accept' : 'application/json'
    },
    body: JSON.stringify(newRamenObj)
  })
}

ramenForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const newRamenObj = {
    name : e.target.name.value,
    restaurant: e.target.restaurant.value,
    image: e.target.image.value,
    rating: e.target.rating.value,
    comment: e.target['new-comment'].value
  }
  postRamen(newRamenObj);
  addRamenToMenu(newRamenObj)
  e.target.reset()
})
