
import InteractiveMap from './interactiveMap';

export default class GeoReview {
  constructor (){
    this.FormReview = document.querySelector('#addFormReview').innerHTML;
    this.map = new InteractiveMap('map', this.onClick.bind(this));
    this.map.init().then(this.onInit.bind(this));
  }

  async onInit() {
   
  }
/*
  async  onInit() {
   const cooards = localStorage;

 document.body.addEventListener('click', function() {
    cooards.data = JSON.stringify({
        name: name.value,
        place: place.value,
        review: review.value
    });
});
  }*/

 createForm(coords) {
  const root = document.createElement('div');
  root.innerHTML = this.FormReview;
  const reviewForm = root.querySelector('[data-role=review-form]');
  reviewForm.dataset.coords = JSON.stringify(coords);

  return root;
}

 onClick(coords) {
  const form = this.createForm(coords);
  this.map.openBalloonContent(coords, form.innerHTML);
}   

}