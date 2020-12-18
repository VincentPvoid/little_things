let plane = document.createElement('p');
plane.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="#fff">
<path d="M12 19L21 21L12 3L3 21L12 19ZM12 19V11" stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

document.body.append(plane);
plane.style.position = 'fixed';
plane.style.left = 0;
plane.style.top = 0;
plane.style.zIndex = 99;
plane.style.transition = 'rotate .3s';
plane.style.transform = 'rotate(90deg)';

document.addEventListener('mousemove', (e) => {

  setTimeout(() => {
    plane.style.left = e.clientX + 'px';
    plane.style.top = e.clientY + 'px';
  }, 200)

})

document.addEventListener('mousemove', (e) => {
  let mouseX = e.clientX;
  let mouseY = e.clientY;
  let planeX = plane.getBoundingClientRect().left;
  let planeY = plane.getBoundingClientRect().top;


  let x = mouseX - planeX;
  let y = mouseY - planeY;
  let angle = Math.round(Math.atan2(Math.abs(y), Math.abs(x)) * 180 / Math.PI)
  // console.log(x, y)
  if (x >= 0 && y >= 0) {
    plane.style.transform = `rotate(${90 + angle}deg)`;
  } else if (x >= 0 && y < 0) {
    // angle = 90+angle;
    plane.style.transform = `rotate(${(90 - angle)}deg)`;
  } else if (x < 0 && y < 0) {
    // angle =  90+angle;
    plane.style.transform = `rotate(${(angle - 90)}deg)`;
  } else if (x < 0 && y >= 0) {
    plane.style.transform = `rotate(${-90 - angle}deg)`;
  }
})
