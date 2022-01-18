
import InteractiveMap from './interactiveMap';

export default class GeoReview {
  constructor (){
    this.FormReview = document.querySelector('#addFormReview').innerHTML;
    this.map = new InteractiveMap('map', this.onClick.bind(this));
    this.map.init().then(this.onInit.bind(this));
  }

async onInit () {

  const coords = this.storage(localStorage);
  
  for (const item of coords) {
    for (let i = 0; i < item.total; i++) {
      this.map.createPlacemark(item.coords);
    }
  }
}

  async  storage () {
  const myName = document.querySelector('#myName');
  const place = document.querySelector('#place');
  const review = document.querySelector('#review');
  const load = document.querySelector('#load');
  const storage = localStorage;
   
  load.addEventListener('click', function() {
    storage.data = JSON.stringify({
        myName: myName.value,
        place: place.value,
        review: review.value
    });
}); 

  }


 createForm(coords, reviews) {
  const root = document.createElement('div');
  root.innerHTML = this.FormReview;
  const reviewForm = root.querySelector('[data-role=review-form]');
  reviewForm.dataset.coords = JSON.stringify(coords);

  const reviewList = root.querySelector('.review-list');

  /*for (const item of reviews) {
    const div = document.createElement('div');
    div.classList.add('review-item');
    div.innerHTML = `
  <div>
    <b>${item.name}</b> [${item.place}]
  </div>
  <div>${item.text}</div>
  `;
    reviewList.appendChild(div);
  }*/

  return root;
}

 onClick(coords) {
  const form = this.createForm(coords);
  this.map.openBalloonContent(coords, form.innerHTML);

  load.addEventListener('click', function() {
    const list = JSON.parse(storage.list || '{}');
    myName.value = list.myName || '';
    place.value = list.place || '';
    review.value = list.review || '';
});
}   

}